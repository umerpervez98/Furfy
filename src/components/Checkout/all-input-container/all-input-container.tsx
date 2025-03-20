'use client';

import { useEffect } from 'react';
import { useApp } from '@/contexts/AppContext';
import { DetailsContainer, DeliveryContainer } from '../index.checkout';
import type {
  AddressObject,
  DeliveryNote,
  LocalAddress,
} from '@/types/index.types';

type AllInputContainerProps = {
  onChangeHandler: <
    T extends HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >(
    e: React.ChangeEvent<T>
  ) => void;
  updateDeliveryNote: (deliveryNote: DeliveryNote) => void;
  setPhone: (newPhone: string | undefined) => void;
  setLocalAddress: (newLocalAddress: LocalAddress) => void;
  setIsAddressValidated: (newIsAddressValidated: boolean) => void;
  localAddress: string | LocalAddress;
  isAddressValidated: boolean;
  emailHasChanged: boolean;
  currentEmail: string;
};

const AllInputContainer = ({
  onChangeHandler,
  updateDeliveryNote,
  setPhone,
  setLocalAddress,
  setIsAddressValidated,
  localAddress,
  isAddressValidated,
  emailHasChanged,
  currentEmail,
}: AllInputContainerProps) => {
  const { updateLocalAddress, updateAddress, currentCart, user, userId } =
    useApp();

  let deliveryNote: DeliveryNote = {
    value: '',
    request: null,
    show: false,
  };

  if (currentCart) {
    deliveryNote = currentCart.deliveryNote;
  }

  useEffect(() => {
    if (localAddress && typeof localAddress === 'object') {
      updateAddress(localAddress.fullAddress);
    }
  }, [localAddress]);

  useEffect(() => {
    if (user && !currentCart) {
      initializeCurrentCart();
    }
  }, [user, currentCart]);

  const initializeCurrentCart = () => {
    if (user) {
      const { defaultAddress } = user;

      const { addressLine1, addressLine2, city, state, postcode, country } =
        defaultAddress;
      const address = `${addressLine1} ${addressLine2} ${city} ${state} ${postcode} ${country}`;

      if (!currentCart) {
        updateDeliveryNote({
          ...deliveryNote,
          value:
            (typeof defaultAddress?.deliveryNote === 'string' &&
              defaultAddress?.deliveryNote) ||
            'Deliver to the front of my property',
        });
      }

      setAddress(address, {
        addressLine1,
        addressLine2,
        city,
        state,
        postcode: +postcode,
        country,
      });
    }
  };

  const resetAddress = (userLoggedIn = false) => {
    setIsAddressValidated(false);

    if (!(userLoggedIn && userId)) {
      updateAddress('');
      updateLocalAddress({ localAddress: '', isAddressValidated: false });
      updateDeliveryNote({
        value: 'Deliver to the front of my property',
        request: null,
        show: false,
      });
    }
  };

  const addressChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalAddress({ address: e.target.value, fullAddress: {} as Partial<AddressObject> });
  };

  const setAddress = (address: string, fullAddress: Partial<AddressObject>) => {
    setIsAddressValidated(true);
    updateLocalAddress({
      localAddress: {
        address,
        fullAddress: fullAddress as string,
      },
      isAddressValidated: true,
    });
  };

  return (
    <>
      <DetailsContainer
        setPhone={setPhone}
        onChangeHandler={onChangeHandler}
        firstName={(currentCart && currentCart.firstName) || ''}
        lastName={(currentCart && currentCart.lastName) || ''}
        email={currentEmail}
        phone={(currentCart && currentCart.phone) || ''}
        emailHasChanged={emailHasChanged}
      />
      <DeliveryContainer
        email={(currentCart && currentCart.email) || ''}
        deliveryNote={deliveryNote}
        updateDeliveryNote={updateDeliveryNote}
        isAddressValidated={isAddressValidated}
        address={
          (typeof localAddress === 'object' && localAddress?.address) || ''
        }
        fullAddress={
          (typeof localAddress === 'object' &&
            (localAddress?.fullAddress as Partial<AddressObject>)) ||
          ({ id: '' } as Partial<AddressObject>)
        }
        resetAddress={resetAddress}
        addressChangeHandler={addressChangeHandler}
        setAddress={setAddress}
      />
    </>
  );
};

export default AllInputContainer;
