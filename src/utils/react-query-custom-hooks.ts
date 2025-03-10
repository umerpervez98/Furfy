import { useQuery } from '@tanstack/react-query';
import { getAllOrders } from '../services/checkout-functions';
import { Order } from '@/types/index.types';



const useGetOrdersQuery = (userId: string, options = {}) => {
  const {
    data: orders,
    isPending,
    error,
  } = useQuery<{
    data: { rows: Order[] };
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
  useGetOrdersQuery,
};
