import { CART_CONTEXT_ACTIONS } from "@/contexts/CartContextReducer";

const actionCreator = (type: CART_CONTEXT_ACTIONS, payload: unknown) => {
  if (payload) {
    return { type, payload };
  }
  return { type };
};

export { actionCreator };