"use client";

import { useState, useEffect, useCallback, memo } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import styles from "./google-map-container.module.scss";

const containerStyle = {
  width: "100%",
  height: "300px",
};

const mapOptions = {
  fullscreenControl: false,
  mapTypeControl: false,
  streetViewControl: false,
  gestureHandling: "none",
};

type GoogleMapContainerProps = {
  address: string;
};

const GoogleMapContainer = ({ address }: GoogleMapContainerProps) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY!,
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [center, setCenter] = useState<{ lat: number; lng: number } | null>(
    null
  );

  const convertAddressToCoord = () => {
    // Check if the Google Maps API is available
    if (address && isLoaded) {
      // Use the Geocoding service to convert the address into coordinates
      const geocoder = new window.google.maps.Geocoder();

      geocoder.geocode({ address }, (results, status) => {
        if (
          status === "OK" &&
          results !== null &&
          results[0].geometry.location
        ) {
          const { lat, lng } = results[0].geometry.location;
          setCenter({ lat: lat(), lng: lng() });
        }
      });
    }
  };

  useEffect(() => {
    convertAddressToCoord();
  }, [isLoaded]);

  const onLoad = useCallback(function callback(map: google.maps.Map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    // const bounds = new window.google.maps.LatLngBounds(center);
    // map.fitBounds(bounds);
    map.setZoom(16);
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map: google.maps.Map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <div className={styles.div}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center || { lat: 0, lng: 0 }}
        zoom={16}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={mapOptions}
      >
        {/* Child components, such as markers, info windows, etc. */}
        {center && <Marker position={center} />}
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
};

export default memo(GoogleMapContainer);
