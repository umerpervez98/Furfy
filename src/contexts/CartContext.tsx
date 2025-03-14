"use client";

import React, { createContext, useContext, useReducer, useEffect } from "react";
import {
  getCartDetails,
  addToCart as apiAddToCart,
  updateCartQuantity,
  getProduct,
  resetCart as apiResetCart,
} from "@/services/cart-functions";
import { usePathname } from "next/navigation";
import { cartContextReducer, CART_CONTEXT_ACTIONS } from "./CartContextReducer";
import { Dropin } from "braintree-web-drop-in";
import type {
  CurrentCart,
  User,
  UpdateOrderProps,
  PromoApplied,
  UpdateCustomerProps,
  Method,
  CurrentTab,
  LocalAddressProps,
} from "@/types/index.types";
import { actionCreator } from "@/utils/action-creator";
import { v4 as uuidv4 } from "uuid";
import { StaticImageData } from "next/image";
import { getUserProfile } from "@/services/checkout-functions";

export interface CartItem extends Product {
  qty: number;
  productId: string;
  setOverlay: (overlay: boolean) => void;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  accessToken: string;
  imgUrl: string | StaticImageData;
}

export interface CartState {
  cartItems: CartItem[];
  subtotal: number;
  shippingFee: number;
  total: number;
  price: number;
  accessToken: string;
  product: Product | null;
  userId: null | string;
  anonymousId: string | null;
  order: UpdateOrderProps;
  promoApplied: PromoApplied;
  orderPlaced: boolean;
  currentCart: null | CurrentCart;
  localAddressObj: {
    localAddress: string | { address: string; fullAddress: string };
    isAddressValidated: boolean;
  };
  showPhoneError: string;
  method: Method | null;
  sendingCodeToNewUser: boolean;
  customer: null | UpdateCustomerProps;
  showPhoneLogin: boolean;
  showVerification: boolean;
  isScrollActivated: boolean;
  user: null | User;
  currentExtra: number;
  currentPage: string;
  currentTab: CurrentTab;
  showScatulator: boolean;
  paymentToken: string | null;
  braintreeInstance: Dropin | undefined;
  globalError: string | null;
  globalMessage: { show: boolean; message: string };
  showCart: boolean;
  showPayNow: boolean;
  showPopOver: boolean;
  myAccountQty: number;
  emailChecked: boolean;
  phoneChecked: boolean;
}

const initialState: CartState = {
  cartItems: [],
  subtotal: 0,
  shippingFee: 0,
  total: 0,
  price: 0,
  accessToken: "",
  product: null,
  user: null,
  userId: null,
  anonymousId: null,
  order: { orderConfirmation: null, submitState: null, error: null },
  currentCart: null,
  promoApplied: null,
  orderPlaced: false,
  localAddressObj: { localAddress: "", isAddressValidated: false },
  showPhoneError: "",
  method: null,
  sendingCodeToNewUser: false,
  customer: null,
  showPhoneLogin: false,
  showVerification: false,
  isScrollActivated: false,
  currentExtra: 1,
  currentPage: "1",
  currentTab: "dashboard",
  showScatulator: false,
  paymentToken: null,
  braintreeInstance: undefined,
  globalError: null,
  globalMessage: { show: false, message: "" },
  showCart: false,
  showPayNow: false,
  showPopOver: false,
  myAccountQty: 0,
  emailChecked: false,
  phoneChecked: false,
};

type CartContextValue = CartState & {
  fetchCart: () => Promise<void>;
  fetchProduct: () => Promise<void>;
  addToCart: (quantity: number) => Promise<void>;
  updateItem: (productId: string, qty: number) => Promise<void>;
  updateQuantity: (quantity: number) => void;
  updateSendingCodeToNewUser: (bool: boolean) => void;
  updateCustomer: (customer: UpdateCustomerProps | null) => void;
  updateShowPhoneLogin: (bool: boolean) => void;
  updateMethod: (method: "phone" | "email" | null) => void;
  updateShowVerification: (bool: boolean) => void;
  updateShowPhoneError: (message: string) => void;
  updateOrderPlaced: (bool: boolean) => void;
  updateLocalAddress: (newAddress: LocalAddressProps) => void;
  updateOrder: (orderToUpdate: UpdateOrderProps) => void;
  createCart: (cart: {
    cartItems: { id: string }[];
    [key: string]: unknown;
  }) => void;
  updateCustomerDetails: (name: string, value?: string | object) => void;
  updateUserAuthToken: (id: null | string) => void;
  togglePromoCode: (promoObj: null | { code: string; rate?: number }) => void;
  updateCustomerDetailsAtOnce: (
    customerDetails: object,
    localCurrentCart?: object
  ) => void;
  updateAddress: (fullAddress: object | string) => void;
  setUserProfile: (id: string, newAddress?: object | boolean) => void;
  updateUser: (user: object | null) => void;
  setIsScrollActivated: (bool: boolean) => void;
  updateCurrentPage: (page: string) => void;
  updateCurrentExtra: (extra: number) => void;
  resetCart: () => void;
  addItemToCart: (newProduct: object) => void;
  addOrderItems: (newProps: object) => void;
  setShowScatulator: (bool: boolean) => void;
  logoutUser: () => void;
  setCurrentTab: (newTab: string) => void;
  setPaymentToken: (token: string) => void;
  setBraintreeInstance: (instance: Dropin | undefined) => void;
  setGlobalError: (error: string | null) => void;
  setGlobalMessage: (messageObj: { show: boolean; message: string }) => void;
  setShowCart: (bool: boolean) => void;
  setShowPayNow: (bool: boolean) => void;
  updateMyAccountQty: (qty: number) => void;
  setShowPopOver: (bool: boolean) => void;
  setEmailChecked: (bool: boolean) => void;
  setPhoneChecked: (bool: boolean) => void;
};

interface StorageEventDetail {
  key: string;
  value: string;
}

// Create a type for your custom event
type LocalStorageEvent = CustomEvent<StorageEventDetail>;

const CartContext = createContext<CartContextValue>({} as CartContextValue);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartState, dispatch] = useReducer(cartContextReducer, initialState);

  const {
    user,
    userId,
    currentCart,
    globalError,
    globalMessage,
    currentTab,
    showPopOver,
  } = cartState;
  const path = usePathname();
  useEffect(() => {
    if (globalMessage.show) {
      const timerId = setTimeout(() => {
        setGlobalMessage({ ...globalMessage, show: false });
      }, 3000);

      return () => {
        clearTimeout(timerId);
      };
    }
  }, [globalMessage]);

  useEffect(() => {
    const anonymousIdFromLocal = localStorage.getItem("scAnonymousId");

    if (anonymousIdFromLocal) {
      updateAnonymousId(anonymousIdFromLocal);
    } else {
      const newAnonymousId = uuidv4();
      localStorage.setItem("scAnonymousId", newAnonymousId);
      updateAnonymousId(newAnonymousId);
    }

    const order = getOrder();
    updateOrder(order);

    if (order.orderConfirmation) {
      updateOrderPlaced(true);
    }
  }, []);

  useEffect(() => {
    const userToken = getUserAuthToken();

    if (userToken) {
      updateUserAuthToken(userToken);
    }

    if (user && currentCart && currentCart.email === null) {
      const { email, firstName, lastName, phone, defaultAddress, addresses } =
        user;

      updateCustomerDetailsAtOnce(
        {
          email,
          firstName,
          lastName,
          phone,
          address: defaultAddress,
          addresses,
        },
        currentCart
      );
    }
  }, [currentCart]);

  useEffect(() => {
    if (showPopOver) {
      setShowPopOver(false);
    }
  }, [currentTab, path]);

  useEffect(() => {
    localStorage.setItem("scUserId", userId ? userId : "null");

    if (!!userId) {
      localStorage.setItem("scLoggedIn", "true");
    }

    const handleExpiredToken = (event: Event) => {
      const customEvent = event as LocalStorageEvent;

      if (!userId) {
        return;
      }

      if (customEvent.detail.value === "" && userId) {
        logoutUser();
        setGlobalError(
          "Your session has expired due to inactivity. For your security, please log in again to continue."
        );
      }
    };

    if (userId) {
      setUserProfile(userId, false);
      window.addEventListener("local-storage", handleExpiredToken);
    } else {
      window.removeEventListener("local-storage", handleExpiredToken);
      updateUser(null);
    }

    return () => {
      window.removeEventListener("local-storage", handleExpiredToken);
    };
  }, [userId]);

  const setShowPopOver = (bool: boolean) => {
    dispatch(actionCreator(CART_CONTEXT_ACTIONS.SET_SHOW_POPOVER, bool));
  };

  const updateMyAccountQty = (qty: number) => {
    dispatch(actionCreator(CART_CONTEXT_ACTIONS.UPDATE_MY_ACCOUNT_QTY, qty));
  };

  const setGlobalError = (error: string | null) => {
    if (globalError !== error) {
      dispatch(actionCreator(CART_CONTEXT_ACTIONS.SET_GLOBAL_ERROR, error));
    }
  };

  const setShowPayNow = (bool: boolean) => {
    dispatch(actionCreator(CART_CONTEXT_ACTIONS.SET_SHOW_PAY_NOW, bool));
  };

  /*   const setInitialCartAndCookie = (data: {
      sessionStorageID: string;
      cartItems: { id: string }[];
      [key: string]: unknown;
    }) => {
      createCart(data);
  
      if (!document.cookie.includes('sc_session_id')) {
        Cookies.set('sc_session_id', data.sessionStorageID);
      }
    }; */

  const logoutUser = () => {
    createCart({
      cartItems: currentCart?.cartItems || [],
    });
    updateCustomer(null);
    updateUserAuthToken(null);
    updateUser(null);
    updateLocalAddress({ localAddress: "", isAddressValidated: false });
    localStorage.setItem("scUserId", "");
  };

  const updateAnonymousId = (id: string) => {
    dispatch(actionCreator(CART_CONTEXT_ACTIONS.UPDATE_ANONYMOUS_ID, id));
  };

  const getUserAuthToken = () => {
    const userId = localStorage.getItem("scUserId");

    if (userId === "null" || !userId) {
      return null;
    }
    return userId;
  };

  const getOrder = (): UpdateOrderProps => {
    const data = localStorage.getItem("scOrder");
    const order =
      data === null
        ? { orderConfirmation: null, submitState: null }
        : JSON.parse(data);
    return order;
  };

  const updateQuantity = (quantity: number) => {
    dispatch(actionCreator(CART_CONTEXT_ACTIONS.UPDATE_QUANTITY, quantity));
  };

  const updateUserAuthToken = (id: string | null) => {
    dispatch(actionCreator(CART_CONTEXT_ACTIONS.UPDATE_USER_TOKEN, id));
  };

  const togglePromoCode = (promoObj: PromoApplied) => {
    dispatch(actionCreator(CART_CONTEXT_ACTIONS.TOGGLE_PROMO, promoObj));
  };

  const addItemToCart = (newProduct: object) => {
    dispatch(actionCreator(CART_CONTEXT_ACTIONS.UPDATE_PRODUCT, newProduct));
  };

  const addOrderItems = (newProps: object) => {
    const newItems = { ...(currentCart?.orderItems as CartItem), ...newProps };
    dispatch(actionCreator(CART_CONTEXT_ACTIONS.UPDATE_ITEMS, newItems));
  };

  const updateCurrentExtra = (extra: number) => {
    dispatch(actionCreator(CART_CONTEXT_ACTIONS.UPDATE_CURRENT_EXTRA, extra));
  };

  const updateCurrentPage = (page: string) => {
    dispatch(actionCreator(CART_CONTEXT_ACTIONS.UPDATE_CURRENT_PAGE, page));
  };

  const updateCustomerDetails = (name: string, value?: string | object) => {
    dispatch(
      actionCreator(CART_CONTEXT_ACTIONS.UPDATE_CART, {
        ...currentCart,
        [name]: value,
      })
    );
  };

  const updateOrder = (orderToUpdate: UpdateOrderProps) => {
    localStorage.setItem("scOrder", JSON.stringify(orderToUpdate));
    dispatch(actionCreator(CART_CONTEXT_ACTIONS.UPDATE_ORDER, orderToUpdate));
  };

  const setShowScatulator = (bool: boolean) => {
    dispatch(actionCreator(CART_CONTEXT_ACTIONS.SET_SHOW_SCATULATOR, bool));
  };

  const updateShowVerification = (bool: boolean) => {
    dispatch(
      actionCreator(CART_CONTEXT_ACTIONS.UPDATE_SHOW_VERIFICATION, bool)
    );
  };

  const updateAddress = (fullAddress: object | string) => {
    dispatch(
      actionCreator(CART_CONTEXT_ACTIONS.UPDATE_CART, {
        ...currentCart,
        address: fullAddress,
      })
    );
  };

  const setBraintreeInstance = (instance: Dropin | undefined) => {
    dispatch(
      actionCreator(CART_CONTEXT_ACTIONS.UPDATE_BRAINTREE_INSTANCE, instance)
    );
  };

  const setPaymentToken = (token: string) => {
    dispatch(actionCreator(CART_CONTEXT_ACTIONS.UPDATE_PAYMENT_TOKEN, token));
  };

  const setIsScrollActivated = (bool: boolean) => {
    dispatch(
      actionCreator(CART_CONTEXT_ACTIONS.UPDATE_IS_SCROLL_ACTIVATED, bool)
    );
  };

  const setGlobalMessage = (messageObj: { show: boolean; message: string }) => {
    dispatch(
      actionCreator(CART_CONTEXT_ACTIONS.SET_GLOBAL_MESSAGE, messageObj)
    );
  };

  const updateCustomerDetailsAtOnce = (
    customerDetails: object,
    localCurrentCart?: object
  ) => {
    dispatch(
      actionCreator(
        CART_CONTEXT_ACTIONS.UPDATE_CART,
        localCurrentCart
          ? {
            ...localCurrentCart,
            ...customerDetails,
          }
          : {
            ...currentCart,
            ...customerDetails,
          }
      )
    );
  };

  const createCart = async (cart: {
    cartItems: { id: string }[];
    [key: string]: unknown;
  }) => {
    const optionList = [
      {
        value: "Deliver to the front of my property",
        text: "Deliver to the front of my property",
      },
      { value: "Deliver to concierge", text: "Deliver to concierge" },
      { value: "Deliver to mail room", text: "Deliver to mail room" },
      { value: "Deliver to foyer/lobby", text: "Deliver to foyer/lobby" },
      { value: "Special delivery request", text: "Special delivery request" },
    ];

    const initialDeliveryNote = userId
      ? {
        value: optionList.find(
          (option) => option.value === user?.defaultAddress?.deliveryNote
        )
          ? user?.defaultAddress.deliveryNote
          : user?.defaultAddress?.deliveryNote === ""
            ? "Deliver to the front of my property"
            : "Special delivery request",
        request: optionList.find(
          (option) => option.value === user?.defaultAddress?.deliveryNote
        )
          ? null
          : user?.addresses?.find((address: { accessToken: string }) => {
            return (
              address.accessToken === user?.defaultAddress?.accessToken
            );
          })?.deliveryNote,
        show: false,
      }
      : {
        value: "Deliver to the front of my property",
        request: null,
        show: false,
      };
    alert();
    await dispatch(
      actionCreator(CART_CONTEXT_ACTIONS.UPDATE_CART, {
        ...cart,
        cartItems:
          cart?.cartItems === null
            ? []
            : cart?.cartItems?.sort((a: { id: string }, b: { id: string }) => {
              return +a?.id - +b?.id;
            }),
        deliveryNote: initialDeliveryNote,
      })
    );
  };

  const updateLocalAddress = (newAddress: LocalAddressProps) => {
    dispatch(actionCreator(CART_CONTEXT_ACTIONS.UPDATE_ADDRESS, newAddress));
  };

  const updateOrderPlaced = (bool: boolean) => {
    dispatch(actionCreator(CART_CONTEXT_ACTIONS.UPDATE_ORDER_PLACED, bool));
  };

  const updateShowPhoneError = (message: string) => {
    dispatch(
      actionCreator(CART_CONTEXT_ACTIONS.UPDATE_SHOW_PHONE_ERROR, message)
    );
  };

  const updateMethod = (method: "phone" | "email" | null) => {
    dispatch(actionCreator(CART_CONTEXT_ACTIONS.UPDATE_METHOD, method));
  };

  const updateCustomer = (customer: UpdateCustomerProps | null) => {
    dispatch(actionCreator(CART_CONTEXT_ACTIONS.UPDATE_CUSTOMER, customer));
  };

  const updateShowPhoneLogin = (bool: boolean) => {
    dispatch(actionCreator(CART_CONTEXT_ACTIONS.UPDATE_SHOW_PHONE_LOGIN, bool));
  };

  const setEmailChecked = (bool: boolean) => {
    dispatch(actionCreator(CART_CONTEXT_ACTIONS.SET_EMAIL_CHECKED, bool));
  };

  const setPhoneChecked = (bool: boolean) => {
    dispatch(actionCreator(CART_CONTEXT_ACTIONS.SET_PHONE_CHECKED, bool));
  };

  const updateSendingCodeToNewUser = (bool: boolean) => {
    dispatch(
      actionCreator(CART_CONTEXT_ACTIONS.UPDATE_SENDING_CODE_TO_NEW_USER, bool)
    );
  };

  const setShowCart = (bool: boolean) => {
    dispatch(actionCreator(CART_CONTEXT_ACTIONS.SET_SHOW_CART, bool));
  };

  const updateUser = (user: object | null) => {
    dispatch(actionCreator(CART_CONTEXT_ACTIONS.UPDATE_USER, user));
  };

  const setUserProfile = async (id: string, newAddress?: object | boolean) => {
    const user = await getUserProfile(id);

    if (user?.success) {
      updateUser(user.data);
      updateCustomerDetailsAtOnce(user.data);
    } else {
      setGlobalError(user.data.message!);
    }

    if (newAddress && typeof newAddress === "object") {
      updateAddress(newAddress);
    }
  };

  const setCurrentTab = (newTab: string) => {
    dispatch(actionCreator(CART_CONTEXT_ACTIONS.SET_CURRENT_TAB, newTab));
  };

  const fetchCart = async () => {
    const response = await getCartDetails();
    if (response.success) {
      dispatch(actionCreator(CART_CONTEXT_ACTIONS.SET_CART, response.data));
    }
  };

  const fetchProduct = async () => {
    const { success, product } = await getProduct();
    if (success) {
      dispatch(actionCreator(CART_CONTEXT_ACTIONS.SET_PRODUCT, product));
    }
  };

  const addToCart = async (quantity: number) => {
    if (!cartState.product) return;

    const response = await apiAddToCart(
      quantity,
      cartState.product.accessToken
    );
    if (response.success) {
      await fetchCart(); // Refresh cart after adding product
    }
  };

  const resetCart = async () => {
    await apiResetCart();
    await fetchCart(); // Refresh cart after adding product
  };

  const updateItem = async (productId: string, qty: number) => {
    await updateCartQuantity(qty, productId);
    await fetchCart();
  };

  useEffect(() => {
    fetchCart();
    fetchProduct();
  }, []);

  const cartContextValue: CartContextValue = {
    ...cartState,
    fetchCart,
    fetchProduct,
    addToCart,
    resetCart,
    updateItem,
    setShowPopOver,
    setShowCart,
    setBraintreeInstance,
    setPaymentToken,
    setCurrentTab,
    setShowScatulator,
    addOrderItems,
    updateCurrentExtra,
    setIsScrollActivated,
    setUserProfile,
    updateUser,
    updateSendingCodeToNewUser,
    updateShowPhoneLogin,
    updateCustomer,
    updateMethod,
    updateShowVerification,
    updateShowPhoneError,
    updateOrderPlaced,
    updateLocalAddress,
    createCart,
    updateOrder,
    updateQuantity,
    togglePromoCode,
    updateUserAuthToken,
    updateCustomerDetails,
    updateCustomerDetailsAtOnce,
    updateAddress,
    updateCurrentPage,
    addItemToCart,
    logoutUser,
    setGlobalError,
    setGlobalMessage,
    setShowPayNow,
    updateMyAccountQty,
    setEmailChecked,
    setPhoneChecked,
  };

  return (
    <CartContext.Provider value={cartContextValue}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
