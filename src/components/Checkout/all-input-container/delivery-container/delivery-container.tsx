"use client";

import { useEffect, useState, type ChangeEvent } from "react";
import { useCart } from "@/contexts/CartContext";
import {
  ValidatedAddressContainer,
  FormRow,
  Label,
  Input,
  AddressFinderCustomised,
} from "../../index.checkout";
import { HeadingSecondary } from "@/components/shared/index.shared";
import {
  addUserAddress,
  updateDefaultAddress,
} from "@/services/checkout-functions";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import type { DeliveryNote, AddressObject } from "@/types/index.types";
import { Country } from "react-addressfinder";
import styles from "./delivery-container.module.scss";

type DeliveryContainerProps = {
  email: string;
  deliveryNote: DeliveryNote;
  updateDeliveryNote: (deliveryNote: DeliveryNote) => void;
  isAddressValidated: boolean;
  address: string;
  fullAddress: Partial<AddressObject>;
  resetAddress: (userLoggedIn?: boolean) => void;
  addressChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  setAddress: (address: string, fullAddress: Partial<AddressObject>) => void;
};

const DeliveryContainer = ({
  resetAddress,
  addressChangeHandler,
  setAddress,
  updateDeliveryNote,
  isAddressValidated,
  address,
  email,
}: DeliveryContainerProps) => {
  const [newAddress, setNewAddress] = useState(false);
  const [addressUpdated, setAddressUpdated] = useState(false);
  const [addressToAdd, setAddressToAdd] = useState("");
  const {
    currentCart,
    userId,
    user,
    setUserProfile,
    updateUser,
    phoneChecked,
  } = useCart();

  useEffect(() => {
    if (user) {
      const { addressLine1, addressLine2, city, state, postcode, country } =
        user?.defaultAddress || {};

      const address = `${addressLine1} ${addressLine2} ${city} ${state} ${postcode} ${country}`;

      setAddress(address, {
        ...user.defaultAddress,
        postcode: +user.defaultAddress?.postcode,
      });
    }
  }, [user]);

  return (
    <div className={styles.div}>
      <HeadingSecondary style={{ fontWeight: 700 }}>your delivery details</HeadingSecondary>
      {isAddressValidated ? (
        <ValidatedAddressContainer
          resetInput={
            user
              ? () => {
                resetAddress(true);
                updateDeliveryNote({
                  value:
                    (currentCart && currentCart?.deliveryNote.value) ||
                    "Deliver to the front of my property",
                  request: null,
                  show: false,
                });
                setAddressUpdated(false);
              }
              : resetAddress
          }
          input={addressUpdated ? addressToAdd : address}
          label="your address"
          buttonLabel="change address"
        />
      ) : userId && !newAddress ? (
        <>
          <Label
            htmlFor="user-address"
            extraStyles={{
              paddingLeft: "1rem",
              marginBottom: "0.24rem",
              fontSize: "1.3rem",
              position: "static",
              color: "inherit",
            }}
          >
            your address
          </Label>
          <FormRow
            style={{
              marginTop: "0",
            }}
          >
            <Input
              id="user-address"
              name="userAddress"
              type="select"
              value={
                user?.addresses?.find(
                  (address: {
                    addressLine1: string;
                    [key: string]: unknown;
                  }) => {
                    if (
                      currentCart &&
                      typeof currentCart?.address === "object"
                    ) {
                      return (
                        address.addressLine1 ===
                        currentCart?.address?.addressLine1
                      );
                    }
                  }
                )?.accessToken
              }
              required={true}
              onChange={async (e) => {
                if ("value" in e.target && e.target.value === "new") {
                  resetAddress();
                  setNewAddress(true);
                } else if (
                  "value" in e.target &&
                  typeof e.target.value === "string"
                ) {
                  const res = (await updateDefaultAddress(
                    userId,
                    e.target.value
                  )) as {
                    data: {
                      defaultAddress: { accessToken: string };
                      [key: string]: unknown;
                    };
                  };

                  await updateUser(res.data);

                  let fullAddress: Partial<AddressObject> = {};

                  if (user) {
                    fullAddress = user.addresses.find(
                      (address: {
                        accessToken: string;
                        [key: string]: unknown;
                      }) =>
                        address.accessToken ===
                        res.data.defaultAddress.accessToken
                    )!;
                  }

                  const {
                    addressLine1,
                    addressLine2,
                    city,
                    state,
                    postcode,
                    country,
                  } = fullAddress;
                  const address = `${addressLine1} ${addressLine2} ${city} ${state} ${postcode} ${country}`;
                  setAddress(address, fullAddress);

                  if (user) {
                    return user.addresses?.find(
                      (address: {
                        addressLine1: string;
                        [key: string]: unknown;
                      }) => {
                        return address.addressLine1 === addressLine1;
                      }
                    )?.deliveryNote as string;
                  }
                }
              }}
              style={{ width: "100%" }}
            >
              {user?.addresses?.map(
                (address: Partial<AddressObject> & { accessToken: string }) => {
                  const {
                    accessToken,
                    id,
                    addressLine1,
                    addressLine2,
                    city,
                    state,
                    postcode,
                    country,
                  } = address;

                  const text = `${addressLine1} ${addressLine2} ${city} ${state} ${postcode} ${country}`;

                  return (
                    <option key={id} value={accessToken}>
                      {text}
                    </option>
                  );
                }
              )}
              <option value="new">Add a new address</option>
            </Input>
            <MdOutlineKeyboardArrowDown />
          </FormRow>
        </>
      ) : (
        <FormRow style={{ flexWrap: "wrap" }}>
          <AddressFinderCustomised
            disabled={
              (!email && !userId) || (!userId && !phoneChecked) ? true : false
            }
            address={address}
            validated={isAddressValidated}
            resetAddress={resetAddress}
            onSelectedHandler={async (address, fullAddress) => {
              if (newAddress && userId) {
                const addressObject: Partial<AddressObject> = {
                  ...fullAddress,
                  city: fullAddress.suburb,
                  addressLine1:
                    ("line1" in fullAddress && fullAddress.line1) || undefined,
                  addressLine2:
                    ("line2" in fullAddress && fullAddress.line2) || undefined,
                  postcode: parseInt(fullAddress.postcode),
                };

                delete addressObject.line1;
                delete addressObject.line2;
                delete addressObject.suburb;
                await addUserAddress(userId, {
                  ...addressObject,
                  setDefault: true,
                });
                await setUserProfile(userId, fullAddress);
                setAddressUpdated(true);
                setAddressToAdd(address);
                setNewAddress(false);
              }

              setAddress(address, {
                ...fullAddress,
                postcode: +fullAddress.postcode,
              });
            }}
            onChangeHandler={addressChangeHandler}
            country={"AU" as Country}
          />
          <Label htmlFor="address" value={address}>
            search your address
          </Label>
        </FormRow>
      )}
    </div>
  );
};

export default DeliveryContainer;
