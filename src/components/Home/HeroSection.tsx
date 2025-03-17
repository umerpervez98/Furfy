"use client";

import React, { useEffect } from "react";
import { Container } from "react-bootstrap";

const HeroSection = () => {
  useEffect(() => {
    const fixBannerHeight = () => {
      const container = document.getElementById("furfy-banner-container");
      if (container) {
        const properties = container.getBoundingClientRect();
        container.style.height = `${properties.width * 0.5625}px`;
      }
    };

    window.addEventListener("resize", fixBannerHeight);
    fixBannerHeight();

    // Dynamically load the banner script
    const script = document.createElement("script");
    script.src = "/furfybanner.js";
    script.type = "text/javascript";
    script.async = true;
    document.body.appendChild(script);
    // Fetch IP Info

    return () => {
      const scripts = document.getElementsByTagName("script");
      const furfyBannerScript = Array.from(scripts).find((script) =>
        script.src.includes("HYPE-754.full.min.js")
      );
      window.removeEventListener("resize", fixBannerHeight);
      document.body.removeChild(script);
      if (furfyBannerScript) {
        document.head.removeChild(furfyBannerScript as Node);
      }
    };
  }, []);

  return (
    <>
      <Container className="py-1 page-width">
        <h2 className="text-center font-bold hero-title">
          THE WORLD&apos;S BEST PET HAIR REMOVER
        </h2>
        <div
          id="furfy-banner-container"
          className="furfybanner"
          style={{ zIndex: 1, height: "690.75px" }}
        >
          <div id="furfybanner6_hype_container" className="HYPE_document" />

          {/* Hidden SEO Content */}
          <div style={{ display: "none" }} aria-hidden="true">
            <div>ORIGINAL PATENTED JAPANESE DESIGN</div>
            <div>Free Delivery in the US and Australia</div>
            <div>ATLANTA WAREHOUSE and SYDNEY WAREHOUSE</div>
            <div>NO HAIR ANYWHERE</div>
            <div>BE FUR-FREE WITH FURFY</div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default HeroSection;
