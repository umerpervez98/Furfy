import { validateTokenAndRefresh } from '../services/auth-functions';
import { getErrorMessage } from './get-error-message';
import defaultImage from '../../public/images/checkout/default-cart-item.webp';
import { CurrentCart, type PaymentMethod } from '@/types/index.types';
import { CartState } from '@/contexts/CartContext';

const ORIGIN = process.env.NEXT_PUBLIC_BASE_URL;


const addProductToCart = async (
  product: { [key: string]: unknown },
  callback: (data: CartState) => void,
  userId = 'unknown',
  prevState?: object
) => {
  const URL = `${ORIGIN}/api/cart/add`;

  const response = await fetch(URL, {
    method: 'POST',
    credentials: 'include',
    headers: userId
      ? {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userId}`,
      }
      : {
        'Content-Type': 'application/json',
      },
    body: JSON.stringify(product),
  });

  if (response.status === 500) {
    throw new Error(`Failed to add items to cart.`);
  }

  const data = await response.json();
  validateTokenAndRefresh(data);
  await fetchCart(callback, prevState);

  return data;
};

const getPricesByQty = async (product: { [key: string]: unknown }) => {
  const URL = `${ORIGIN}/api/admin/product/${product.accessToken}/qty-pricing-rules`;
  let data: unknown;

  try {
    const response = await fetch(URL, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${authToken}`,
      },
    });

    if (response.ok) {
      data = await response.json();
      return data;
    } else {
      throw new Error('There was an error');
    }
  } catch {
    // console.log("fail", getErrorMessage(error));
  }
};

const resetCart = async (callback: (data: CartState) => void, prevState?: object) => {
  const URL = `${ORIGIN}/api/cart`;

  try {
    const response = await fetch(URL, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      await response.json();
      fetchCart(callback, prevState);
    } else {
      throw new Error('There was an error');
    }
  } catch (error) {
    console.log('fail', getErrorMessage(error));
  }
};

const removeProduct = async (
  product: string | undefined,
  callback: (data: CartState) => void,
  prevState: object
) => {
  const URL = `${ORIGIN}/api/cart/remove/${product}`;
  let data: unknown;

  try {
    const response = await fetch(URL, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      // handleCustomerIoData(userId, "track", {
      //   event: "Product Removed",
      //   type: "track",
      //   properties: {
      //     product_id: product,
      //     brand: "PPAU",
      //     ...properties,
      //   },
      // });
      data = await response.json();
      fetchCart(callback, prevState);
    } else {
      throw new Error('There was an error');
    }
  } catch (error) {
    console.log('fail', getErrorMessage(error));
  }
};

const updateQuantity = async (
  product: string,
  callback: (data: CartState) => void,
  prevState: object,
  newQuantity: number
) => {
  const URL = `${ORIGIN}/api/cart/update/quantity/${product}`;
  let data = {};

  try {
    const response = await fetch(URL, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ quantity: newQuantity }),
    });

    if (response.ok) {
      data = await response.json();
      fetchCart(callback, prevState);
    } else {
      throw new Error('There was an error');
    }
  } catch (error) {
    console.log('fail', getErrorMessage(error));
  }
};

const incrementQuantity = async (
  product: string,
  callback: Function,
  prevState: object
) => {
  const URL = `${ORIGIN}/api/cart/increment/${product}`;
  let data = {};

  try {
    const response = await fetch(URL, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      data = await response.json();
      fetchCart(callback, prevState);
    } else {
      throw new Error('There was an error');
    }
  } catch (error) {
    console.log('fail', getErrorMessage(error));
  }
};

const decrementQuantity = async (
  product: {},
  callback: (cart: { cartItems: [] }) => void,
  prevState: {}
) => {
  const URL = `${ORIGIN}/api/cart/decrement/${product}`;
  let data = {};

  try {
    const response = await fetch(URL, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      data = await response.json();
      fetchCart(callback, prevState);
    } else {
      throw new Error('There was an error');
    }
  } catch (error) {
    console.log('fail', error);
  }
};

const getProductImageURL = (product: {
  productThumbnailID?: string;
  productThumbnail?: { accessToken: string; extension: string };
  variantThumbnailID?: string;
  variantThumbnail?: { accessToken: string; extension: string };
  [key: string]: unknown;
}) => {
  if (product && product.productThumbnailID && product.productThumbnail) {
    // return `${ORIGIN}/api/product/image/file/${product.productThumbnail.accessToken}`;
    return `${process.env.NEXT_PUBLIC_S3}/image/${product.productThumbnail.accessToken}${product.productThumbnail.extension}`;
  } else if (product.variantThumbnailID && product.variantThumbnail) {
    // return `${ORIGIN}/api/product/image/file/${product.variantThumbnail.accessToken}`;
    return `${process.env.NEXT_PUBLIC_S3}/image/${product.variantThumbnail.accessToken}${product.variantThumbnail.extension}`;
  }
  return defaultImage;
};

const fetchImageToken = async (product: {}, variant: string) => {
  const URLwithoutVariant = `${ORIGIN}/api/product/image/${product}/all/paginated`;
  const URLwithVariant = `${ORIGIN}/api/product/image/withVariants/${product}/all/paginated`;
  let data = {};

  try {
    const response = await fetch(variant ? URLwithVariant : URLwithoutVariant, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      data = await response.json();
    } else {
      throw new Error('There was an error');
    }
  } catch (error) {
    console.log('fail', error);
    return null;
  }

  return data;
};

const fetchImage = async (product: {}, imageToken: string, variant: string) => {
  const URLwithoutVariant = `${ORIGIN}/api/product/image/file/${product}/${imageToken}`;
  const URLwithVariant = `${ORIGIN}/api/product/image/file/${product}/${variant}/${imageToken}`;
  let data = {};

  try {
    const response = await fetch(variant ? URLwithVariant : URLwithoutVariant, {
      method: 'GET',
      credentials: 'include',
    });

    if (response.ok) {
      data = await response.blob();
    } else {
      throw new Error('There was an error');
    }
  } catch (error) {
    console.log('fail', error);
    return null;
  }

  return data;
};

const fetchCategories = async (isServerComponent: boolean) => {
  const URL = `${isServerComponent ? process.env.NEXT_PUBLIC_HOST_SERVER_URL : ORIGIN
    }/api/category/all/paginated`;
  try {
    const response = await fetch(URL, {
      method: 'POST',
    });

    if (!response.ok) {
      throw new Error();
    }

    return await response.json();
  } catch (error) {
    throw new Error();
  }
};

export type Products = {
  data: {
    rows: any[];
  };
};

const fetchProducts = async (isServerComponent: boolean): Promise<Products> => {
  const URL = `${isServerComponent ? process.env.NEXT_PUBLIC_HOST_SERVER_URL : ORIGIN
    }/api/product/all?limit=100`;
  try {
    const response = await fetch(URL, {
      method: 'POST',
    });

    if (!response.ok) {
      throw new Error();
    }

    return await response.json();
  } catch (error) {
    throw new Error();
  }
};



const getPaymentMethods = async (
  userID: string
): Promise<{
  data: PaymentMethod[];
  message: string;
  [key: string]: unknown;
}> => {
  const URL = `${ORIGIN}api/customers/payment-method`;

  const res = await fetch(URL, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${userID}`,
    },
  });

  if (res.status === 500) {
    throw new Error('Failed to fetch payment methods');
  }

  const data = await res.json();
  validateTokenAndRefresh(data);

  return data;
};

const submitCartWithPayment = async (
  paymentData: object,
  userId: string | null
) => {
  const URL = `${ORIGIN}api/cart/submit`;

  const response = await fetch(URL, {
    method: 'POST',
    credentials: 'include',
    headers: userId
      ? {
        'content-type': 'application/json',
        Authorization: `Bearer ${userId}`,
      }
      : {
        'content-type': 'application/json',
      },
    body: JSON.stringify(paymentData),
  });

  if (response.status === 200) {
    if (localStorage.getItem('scCode')) {
      localStorage.removeItem('scCode');
    }
    if (localStorage.getItem('scEmail')) {
      localStorage.removeItem('scEmail');
    }
  } else if (response.status === 500) {
    throw new Error('Failed to submit your order');
  }

  return await response.json();
};

const validateQuantity = (qty: number): number => {
  let validatedQty: number;
  if (isNaN(qty)) {
    validatedQty = 1;
  } else if (qty > 99) {
    validatedQty = 99;
  } else if (qty <= 0) {
    validatedQty = 1;
  } else {
    validatedQty = qty;
  }
  return validatedQty;
};

const checkIfItemExists = (
  currentCart: CurrentCart,
  accessTokenToAdd: string
) => {
  return currentCart?.cartItems?.find(
    (item) =>
      (item.subscriptionPlan?.accessToken && accessTokenToAdd) ||
      (!item.subscriptionPlan && !accessTokenToAdd)
  );
};

export {
  checkIfItemExists,
  getPricesByQty,
  addProductToCart,
  resetCart,
  removeProduct,
  updateQuantity,
  incrementQuantity,
  decrementQuantity,
  fetchImage,
  fetchImageToken,
  fetchCategories,
  fetchProducts,
  getPaymentMethods,
  submitCartWithPayment,
  getProductImageURL,
  validateQuantity,
};
