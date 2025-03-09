import { useQuery } from '@tanstack/react-query';
import { fetchCategories, fetchProducts } from './cart-functions';
import { getAllSubscriptions, getAllOrders } from './checkout-functions';
import type { Product, TManualDiscount } from '@/types/index.types';

export type Products = {
  data: {
    rows: any[];
  };
};

const useGetCategoriesQuery = () => {
  const {
    data: categories,
    isPending,
    error,
  } = useQuery<Products>({
    queryKey: ['categories'],
    queryFn: async () => await fetchCategories(true),
  });

  return { categories: categories!.data.rows, isPending, error };
};

const useGetProductsQuery = () => {
  const {
    data: products,
    isPending,
    error,
  } = useQuery<Products>({
    queryKey: ['products'],
    queryFn: () => fetchProducts(true),
  });

  if (!products) return { products: null, isPending, error };

  return {
    products: products.data.rows as Product[],
    isPending,
    error,
  };
};

const useGetSubscriptionsQuery = (userId: string, options?: object) => {
  const {
    data: subscriptions,
    isPending,
    error,
  } = useQuery<Products>(
    options
      ? {
          queryKey: ['subscriptions'],
          queryFn: () => getAllSubscriptions(userId),
          ...options,
        }
      : {
          queryKey: ['subscriptions'],
          queryFn: () => getAllSubscriptions(userId),
        }
  );

  if (!subscriptions) {
    return { subscriptions: null, isPending, error };
  }

  return {
    subscriptions: subscriptions.data?.rows as {
      id: string;
      accessToken: string;
      qty: number;
      price: number;
      priceBeforeCoupon: number;
      couponCode: string;
      product: { name: string };
      nextPaymentDate: string;
      subscriptionPlan: { name: string };
      subscriptionStatus: { name: string };
      paymentMethod: { cardNumber: string; paypalEmail: string };
      address: {
        addressLine1: string;
        addressLine2: string;
        city: string;
        state: string;
        postcode: number;
      };
      untilNextDispatchDays: number;
      shippingFee: number;
      manualDiscounts: TManualDiscount[];
      total: number;
      discountAmount: number;
    }[],
    isPending,
    error,
  };
};

const useGetOrdersQuery = (userId: string, options = {}) => {
  const {
    data: orders,
    isPending,
    error,
  } = useQuery<{
    data: { rows: any[] };
    success: boolean;
    tokenExpired?: boolean;
  }>(
    options
      ? {
          queryKey: ['Orders'],
          queryFn: () => getAllOrders(userId),
          ...options,
        }
      : {
          queryKey: ['Orders'],
          queryFn: () => getAllOrders(userId),
        }
  );

  if (!orders) {
    return { orders: null, isPending, error };
  }

  return {
    orders: orders?.data?.rows,
    isPending,
    error,
  };
};

export {
  useGetCategoriesQuery,
  useGetProductsQuery,
  useGetSubscriptionsQuery,
  useGetOrdersQuery,
};
