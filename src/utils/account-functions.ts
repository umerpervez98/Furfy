import type {
  User,
  AddressObject,
  TLocalPaymentMethodData,
} from '@/types/index.types';
import { validateTokenAndRefresh } from '../services/auth-functions';
import { getOrigin } from './getOrigin';

const ORIGIN = getOrigin();

const editSubscriptionStatus = async (
  userId: string,
  subscriptionToken: string,
  status: number,
  weekToken: string
): Promise<unknown> => {
  const URL = `${ORIGIN}/api/customers/subscription/update/status/${subscriptionToken}`;

  const response = await fetch(URL, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${userId}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(
      weekToken
        ? {
          status,
          weekToken,
        }
        : { status }
    ),
  });

  if (response.status === 500) {
    throw new Error(`Failed to edit the status.`);
  }

  const data = await response.json();
  validateTokenAndRefresh(data);

  return data;
};

const editSubscriptionQuantity = async (
  userId: string,
  subscriptionToken: string,
  qty: number
): Promise<unknown> => {
  const URL = `${ORIGIN}/api/customers/subscription/update/qty/${subscriptionToken}`;

  const response = await fetch(URL, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${userId}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      qty,
    }),
  });

  if (response.status === 500) {
    throw new Error(`Failed to update the qty.`);
  }

  const data = await response.json();
  validateTokenAndRefresh(data);

  return data;
};

const editSubscriptionAddress = async (
  userId: string,
  subscriptionToken: string,
  customerAddressToken: string | Partial<AddressObject>
): Promise<{
  subscriptionChangedAddress: object;
  success: boolean;
  message?: string;
}> => {
  const URL = `${ORIGIN}/api/customers/subscription/address/change/${subscriptionToken}`;

  const response = await fetch(URL, {
    method: 'POST',
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${userId}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(
      typeof customerAddressToken === 'string'
        ? { customerAddressToken, updateProfile: true }
        : {
          newAddress: true,
          address: {
            addressLine1: customerAddressToken.line1,
            addressLine2: customerAddressToken.line2,
            city: customerAddressToken.suburb,
            postcode: +customerAddressToken.postcode!,
            state: customerAddressToken.state,
            country: 'AU',
            deliveryNote: 'Deliver to the front of my property',
          },
          updateProfile: true,
        }
    ),
  });

  if (response.status === 500) {
    throw new Error(`Failed to edit the address.`);
  }

  const data = await response.json();
  validateTokenAndRefresh(data);

  return data;
};

const updateUserProfile = async (
  userId: string,
  newDetails: object
): Promise<User> => {
  const URL = `${ORIGIN}/api/customers/profile`;

  const response = await fetch(URL, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      Authorization: 'Bearer ' + userId,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newDetails),
  });

  if (response.status === 500) {
    throw new Error('Failed to update user profile.');
  }

  if (response.status === 400) {
    throw new Error('400 ERROR:');
  }

  const data = await response.json();
  validateTokenAndRefresh(data);

  return data.data;
};

const sendAuthCodeToUser = async (
  userId: string,
  methodObject: object
): Promise<boolean> => {
  const URL = `${ORIGIN}/api/customers/auth`;

  const response = await fetch(URL, {
    method: 'POST',
    credentials: 'include',
    headers: {
      Authorization: 'Bearer ' + userId,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(methodObject),
  });

  if (response.status === 500) {
    throw new Error('Failed to send a verification code.');
  }

  const data = await response.json();
  validateTokenAndRefresh(data);

  return data;
};

const setPaymentMethodDefaultForProfile = async (
  userId: string,
  paymentMethodToken: string
): Promise<unknown> => {
  const URL = `${ORIGIN}/api/customers/payment-method/set-default/${paymentMethodToken}`;

  const response = await fetch(URL, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${userId}`,
      'Content-Type': 'application/json',
    },
  });

  if (response.status === 500) {
    throw new Error(`Failed to set default payment method.`);
  }

  const data = await response.json();
  validateTokenAndRefresh(data);

  return data;
};

const setPaymentMethodDefaultForSubscription = async (
  userId: string,
  subscriptionToken: string,
  paymentMethodToken: string
): Promise<unknown> => {
  const URL = `${ORIGIN}/api/customers/subscription/update/payment-method/${subscriptionToken}`;

  const response = await fetch(URL, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${userId}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: paymentMethodToken,
      updateProfile: true,
    }),
  });

  if (response.status === 500) {
    throw new Error(`Failed to set default payment method for a subscription.`);
  }

  const data = await response.json();
  validateTokenAndRefresh(data);

  return data;
};

const deletePaymentMethod = async (
  userId: string,
  paymentMethodToken: string
): Promise<{ success: boolean; message: string }> => {
  const URL = `${ORIGIN}/api/customers/payment-method/${paymentMethodToken}`;

  const response = await fetch(URL, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${userId}`,
      'Content-Type': 'application/json',
    },
  });

  if (response.status === 500) {
    throw new Error(`Failed to delete the payment method.`);
  }

  const data = await response.json();
  validateTokenAndRefresh(data);

  return data;
};

const addPaymentMethod = async (
  userId: string,
  paymentMethodObject: object,
  subscriptionToken: string
): Promise<unknown> => {
  const URL = `${ORIGIN}/api/customers/subscription/payment-method/create/${subscriptionToken}`;

  const response = await fetch(URL, {
    method: 'POST',
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${userId}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...paymentMethodObject, updateProfile: true }),
  });

  if (response.status === 500) {
    throw new Error(`Failed to add the payment method.`);
  }

  const data = await response.json();
  validateTokenAndRefresh(data);

  return data;
};

export type ReactivationDates = {
  startDay: string;
  weekToken: string;
}[];

const getReactivationDates = async (
  userId: string
): Promise<{ foundStartDates: ReactivationDates }> => {
  const URL = `${ORIGIN}/api/customers/subscription/start-dates`;

  const response = await fetch(URL, {
    method: 'POST',
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${userId}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to get reactivation dates.`);
  }

  const data = await response.json();
  return data;
};

const validateName = (name: string): string => {
  let validatedName: string;
  const limit = 50;

  if (name?.length <= 0) {
    validatedName = '';
  } else if (name.length > limit) {
    const trimmedName = name.substring(0, limit);
    validatedName =
      trimmedName[0].toUpperCase() + trimmedName.slice(1).toLowerCase();
  } else {
    validatedName = name[0].toUpperCase() + name.slice(1).toLowerCase();
  }

  return validatedName;
};

// ----- my detail, when users do the one-off purchase, they should be able to update details ----
const createDefaultAddress = async (
  userToken: string,
  newAddress: Partial<AddressObject>
): Promise<{ success: boolean; message?: string; data?: any }> => {
  const URL = `${process.env.NEXT_PUBLIC_HOST_SERVER_URL}/api/customers/address`;

  const response = await fetch(URL, {
    method: 'POST',
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${userToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newAddress),
  });

  if (!response.ok) {
    throw new Error(`Failed to add address.`);
  }

  const data = await response.json();

  return {
    success: true,
    data,
  };
};

const changeDefaultAddress = async (
  userToken: string,
  addressToken: string
): Promise<{ success: boolean; message?: string; data?: any }> => {
  const URL = `${process.env.NEXT_PUBLIC_HOST_SERVER_URL}/api/customers/address/default/${addressToken}`;

  const response = await fetch(URL, {
    method: 'POST',
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${userToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to set address`);
  }

  const data = await response.json();

  return {
    success: true,
    data,
  };
};

const addUserPaymentMethod = async (
  userToken: string,
  paymentObject: TLocalPaymentMethodData
): Promise<{ success: boolean; message?: string; data?: any }> => {
  const URL = `${process.env.NEXT_PUBLIC_HOST_SERVER_URL}/api/customers/payment-method`;

  const response = await fetch(URL, {
    method: 'POST',
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${userToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(paymentObject),
  });

  if (!response.ok) {
    throw new Error(`Failed to add payment method`);
  }

  const data = await response.json();

  return {
    success: true,
    data,
  };
};

export {
  getReactivationDates,
  editSubscriptionQuantity,
  editSubscriptionStatus,
  editSubscriptionAddress,
  updateUserProfile,
  sendAuthCodeToUser,
  setPaymentMethodDefaultForProfile,
  setPaymentMethodDefaultForSubscription,
  deletePaymentMethod,
  addPaymentMethod,
  validateName,
  createDefaultAddress,
  changeDefaultAddress,
  addUserPaymentMethod,
};
