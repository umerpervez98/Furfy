import { PaymentMethod, Product } from "@/types/index.types";
import { validateTokenAndRefresh } from "./auth-functions";

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
export const PRODUCT_ID = process.env.NEXT_PUBLIC_PRODUCT_ID
export const PRODUCT_NAME = process.env.NEXT_PUBLIC_PRODUCT_NAME

export const getProduct = async ({ limit = 4, page = 1, sort = "id", order = "asc" } = {}) => {
  try {
    const response = await fetch(`${BASE_URL}api/product/all`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ limit, page, sort, order }),
    });

    const data = await response.json();

    // Check if API response indicates failure
    if (!data.success) {
      throw new Error(data.message || "Failed to fetch products");
    }

    // Filter only Furfy products based on product name or product ID
    const filteredProduct = data.data.rows.find(
      (product: Product) => product.name === PRODUCT_NAME || product.accessToken === PRODUCT_ID
    );

    return { success: true, product: filteredProduct };
  } catch (error) {
    console.error("Error fetching Furfy products:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unexpected error occurred",
      products: []
    };
  }
};

export const addToCart = async (quantity: number, productId: string) => {
  try {
    // Step 1: Call getCartDetails to ensure the session is valid
    const cartResponse = await getCartDetails();

    // Check if getCartDetails was successful
    if (!cartResponse.success) {
      throw new Error(cartResponse.error || "Failed to fetch cart details");
    }

    // If Cart Exist then update it 
    if (cartResponse.data.cartItems.length > 0) {
      const updateCart = await updateCartQuantity(quantity, cartResponse.data.cartItems[0].accessToken)
      if (!updateCart.success) {
        throw new Error(updateCart.message || "Failed to add product to cart");
      }
      return { success: true, data: updateCart };
    } else {
      // Create new cart if it does not exist
      const addToCartResponse = await fetch(`${BASE_URL}api/cart/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productToken: productId, quantity }),
        credentials: "include",
      });

      const addToCartData = await addToCartResponse.json();

      // Check if addToCart was successful
      if (!addToCartData.success) {
        throw new Error(addToCartData.message || "Failed to add product to cart");
      }

      return { success: true, data: addToCartData };
    }
  } catch (error) {
    console.error("Error in addToCart process:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unexpected error occurred"
    };
  }
};

export const resetCart = async () => {
  const URL = `${BASE_URL}api/cart`;

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
    } else {
      throw new Error('There was an error');
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unexpected error occurred"
    };
  }
};

export const updateCartQuantity = async (quantity: number, productId: string) => {
  const res = await fetch(`${BASE_URL}api/cart/update/quantity/${productId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ quantity }),
    credentials: "include",
  });
  return res.json();
};

export const getCartDetails = async () => {
  const res = await fetch(`${BASE_URL}api/cart`, {
    credentials: "include",
  });
  return res.json();
};

export const applyCoupon = async (coupon: string) => {
  const res = await fetch(`${BASE_URL}api/cart/apply-coupon`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ coupon }),
  });
  return res.json();
};

export const submitOrder = async (orderData: object) => {
  const res = await fetch(`${BASE_URL}api/cart/submit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderData),
  });
  return res.json();
};

export const getPaymentToken = async (): Promise<{ data: string }> => {
  const URL = `${BASE_URL}api/payment-gateway/generate-token`;

  try {
    const res = await fetch(URL, {
      credentials: 'include',
      headers: {
        'content-type': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error();
    }

    return await res.json();
  } catch {
    throw new Error();
  }
};

export const getPaymentMethods = async (
  userID: string
): Promise<{
  data: PaymentMethod[];
  message: string;
  [key: string]: unknown;
}> => {
  const URL = `${BASE_URL}api/customers/payment-method`;

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

export const submitCartWithPayment = async (
  paymentData: object,
  userId: string | null
) => {
  const URL = `${BASE_URL}api/cart/submit`;

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


