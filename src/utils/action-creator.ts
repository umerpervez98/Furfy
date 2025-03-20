import { APP_CONTEXT_ACTIONS } from "@/contexts/AppContextReducer";

const actionCreator = (type: APP_CONTEXT_ACTIONS, payload: unknown) => {
  if (payload) {
    return { type, payload };
  }
  return { type };
};

export { actionCreator };