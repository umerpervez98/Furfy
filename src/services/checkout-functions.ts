import type { AddressObject, Order } from '@/types/index.types';
import { validateTokenAndRefresh } from './auth-functions';

const ORIGIN = process.env.NEXT_PUBLIC_BASE_URL;

const getUserProfile = async (
  authToken: string
): Promise<{
  data: { message?: string;[key: string]: unknown };
  success: boolean;
}> => {
  const URL = `${ORIGIN}api/customers/profile`;

  const response = await fetch(URL, {
    method: 'GET',
    credentials: 'include',
    headers: {
      Authorization: 'Bearer ' + authToken,
    },
  });

  if (response.status === 500) {
    throw new Error('Failed to fetch user profile.');
  }

  const data = await response.json();
  validateTokenAndRefresh(data);

  return data;
};

const updateDefaultAddress = async (
  authToken: string,
  addressToken: string
) => {
  const URL = `${ORIGIN}api/customers/address/default/${addressToken}`;

  const response = await fetch(URL, {
    method: 'POST',
    credentials: 'include',
    headers: {
      Authorization: 'Bearer ' + authToken,
    },
  });

  if (response.status === 500) {
    throw new Error();
  }
  const data = await response.json();
  validateTokenAndRefresh(data);

  return data;
};

const addUserAddress = async (
  authToken: string,
  address: Partial<AddressObject>
) => {
  const URL = `${ORIGIN}api/customers/address`;

  const response = await fetch(URL, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify(address),
  });

  if (response.status === 500) {
    throw new Error();
  }
  const data = await response.json();
  validateTokenAndRefresh(data);

  return data;
};

const updateUserAddress = async (
  authToken: string,
  addressToken: string,
  propsToUpdate: object
) => {
  const URL = `${ORIGIN}api/customers/address/update/${addressToken}`;

  const response = await fetch(URL, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify(propsToUpdate),
  });

  if (response.status === 500) {
    throw new Error();
  }
  const data = await response.json();
  validateTokenAndRefresh(data);

  return data;
};

const getAllOrders = async (
  userId: string
): Promise<{
  data: { rows: Order[] };
  success: boolean;
  tokenExpired?: boolean;
}> => {
  const URL = `${ORIGIN}api/customers/order/all/paginated?limit=1000&sort=id&order=desc`;

  const res = await fetch(URL, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userId}`,
    },
    body: JSON.stringify({ criteria: [] }),
  });

  if (res.status === 500) {
    throw new Error('Failed to fetch orders.');
  }

  const data = await res.json();
  validateTokenAndRefresh(data);

  return data;
};


export {
  updateDefaultAddress,
  getUserProfile,
  addUserAddress,
  updateUserAddress,
  getAllOrders,
};
