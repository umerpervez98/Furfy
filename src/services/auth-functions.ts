import { jwtDecode } from 'jwt-decode';
import { type UpdateCustomerProps, type Method } from '@/types/index.types';


const ORIGIN = process.env.NEXT_PUBLIC_BASE_URL;

type AuthWithMethodResponse = {
  exists?: boolean;
  data?: UpdateCustomerProps;
  success: boolean;
  message: string;
};

const authWithMethod = async (
  method: Method,
  value: string
): Promise<AuthWithMethodResponse> => {
  // https://dev.api.scatbags.com.au/
  const URL = `${ORIGIN}api/cart/auth-${method}`;

  const response = await fetch(URL, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      [method === 'phone' ? 'phoneNumber' : method]: value,
    }),
  });

  if (response.status === 500) {
    throw new Error(`Failed to authenticate with ${method}.`);
  }

  return await response.json();
};

const sendAuthCodeByCustomerToken = async (authObj: {
  method: Method;
  token: string;
}) => {
  const URL = `${ORIGIN}api/customers/auth/send-auth-code`;

  const response = await fetch(URL, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(authObj),
  });

  if (!response.ok) {
    throw new Error(`Failed to authenticate with ${authObj.method}.`);
  }

  const data = await response.json();
  validateTokenAndRefresh(data);

  return data;
};

const verifyAuthCodeWithCustomerToken = async (authObj: {
  loginMethod: Method | null;
  userAccessToken: string;
  code: string;
}): Promise<{
  verificationStatus: string;
  accessToken: string;
}> => {
  const URL = `${ORIGIN}api/customers/auth/verify-access-token`;

  const response = await fetch(URL, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(authObj),
  });

  if (response.status === 500) {
    throw new Error();
  }
  const data = await response.json();
  validateTokenAndRefresh(data);

  return data;
};

const verifyPhone = async (authObj: { phoneNumber: string; code: string }) => {
  const URL = `${ORIGIN}api/cart/verify-phone`;
  let data: unknown;

  try {
    const response = await fetch(URL, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify(authObj),
    });

    data = await response.json();

    if (!response.ok) {
      throw new Error();
    }
  } catch {
    // console.log(getErrorMessage(error));
  }

  return data;
};

const verifyAddress = async (
  addressObj: object
): Promise<{
  success: boolean;
  premium: boolean;
  standardDeliveryDay: string;
  premiumDeliveryDay: string;
  [key: string]: unknown;
}> => {
  const URL = `${ORIGIN}api/runs/address/get-invalid-products-for-area`;

  let data;

  try {
    const response = await fetch(URL, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(addressObj),
    });

    data = await response.json();

    if (!response.ok) {
      throw new Error();
    }
  } catch {
    // throw new Error();
    // console.log(getErrorMessage(error));
  }

  return data;
};

const isTokenExpired = (token: string) => {
  const decoded = jwtDecode(token);
  const currentTime = Date.now() / 1000; // convert to seconds
  return decoded.exp! < currentTime;
};

type StorageEventDetail = {
  key: string;
  value: string;
};

const validateTokenAndRefresh = async (data: {
  success: boolean;
  tokenExpired: boolean;
}) => {
  if (!data.success && data.tokenExpired) {
    localStorage.setItem('scUserId', '');
    window.dispatchEvent(
      new CustomEvent<StorageEventDetail>('local-storage', {
        detail: { key: 'scUserId', value: '' },
      })
    );
  }
};

export {
  authWithMethod,
  sendAuthCodeByCustomerToken,
  verifyAuthCodeWithCustomerToken,
  verifyPhone,
  verifyAddress,
  isTokenExpired,
  validateTokenAndRefresh,
};
