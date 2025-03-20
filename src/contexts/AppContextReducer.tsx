import type { AppState } from "./AppContext";

enum APP_CONTEXT_ACTIONS {
    SET_CART = "SET_CART",
    UPDATE_ITEM = "UPDATE_ITEM",
    SET_PRODUCT = "SET_PRODUCT",
    UPDATE_QUANTITY = "UPDATE_QUANTITY",
    UPDATE_USER_TOKEN = "UPDATE_USER_TOKEN",
    TOGGLE_PROMO = "TOGGLE_PROMO",
    UPDATE_CART = "UPDATE_CART",
    UPDATE_ORDER = "UPDATE_ORDER",
    UPDATE_SHOW_VERIFICATION = "UPDATE_SHOW_VERIFICATION",
    UPDATE_ADDRESS = "UPDATE_ADDRESS",
    UPDATE_ORDER_PLACED = "UPDATE_ORDER_PLACED",
    UPDATE_SHOW_PHONE_ERROR = "UPDATE_SHOW_PHONE_ERROR",
    UPDATE_METHOD = "UPDATE_METHOD",
    UPDATE_CUSTOMER = "UPDATE_CUSTOMER",
    UPDATE_SHOW_PHONE_LOGIN = "UPDATE_SHOW_PHONE_LOGIN",
    UPDATE_SENDING_CODE_TO_NEW_USER = "UPDATE_SENDING_CODE_TO_NEW_USER",
    UPDATE_USER = "UPDATE_USER",
    UPDATE_IS_SCROLL_ACTIVATED = "UPDATE_IS_SCROLL_ACTIVATED",
    UPDATE_PRODUCT = "UPDATE_PRODUCT",
    UPDATE_ITEMS = "UPDATE_ITEMS",
    UPDATE_CURRENT_EXTRA = "UPDATE_CURRENT_EXTRA",
    UPDATE_CURRENT_PAGE = "UPDATE_CURRENT_PAGE",
    UPDATE_PURCHASE_TYPE = "UPDATE_PURCHASE_TYPE",
    SET_SHOW_SCATULATOR = "SET_SHOW_SCATULATOR",
    UPDATE_ANONYMOUS_ID = "UPDATE_ANONYMOUS_ID",
    SET_CURRENT_TAB = "SET_CURRENT_TAB",
    UPDATE_PAYMENT_TOKEN = "UPDATE_PAYMENT_TOKEN",
    UPDATE_BRAINTREE_INSTANCE = "UPDATE_BRAINTREE_INSTANCE",
    SET_GLOBAL_ERROR = "SET_GLOBAL_ERROR",
    SET_GLOBAL_MESSAGE = "SET_GLOBAL_MESSAGE",
    SET_SHOW_CART = "SET_SHOW_CART",
    SET_SHOW_PAY_NOW = "SET_SHOW_PAY_NOW",
    UPDATE_MY_ACCOUNT_QTY = "UPDATE_MY_ACCOUNT_QTY",
    SET_SHOW_POPOVER = "SET_SHOW_POPOVER",
    SET_PHONE_CHECKED = "SET_PHONE_CHECKED",
    SET_EMAIL_CHECKED = "SET_EMAIL_CHECKED",
}
/* eslint-disable */
type AppAction = {
    type: APP_CONTEXT_ACTIONS;
    payload?: any;
};
/* eslint-enable */
const appContextReducer = (state: AppState, action: AppAction): AppState => {
    const { type, payload } = action;

    switch (type) {
        case APP_CONTEXT_ACTIONS.SET_CART:
            return { ...state, currentCart: action.payload };

        case APP_CONTEXT_ACTIONS.UPDATE_ITEM:
            return { ...state, ...action.payload };

        case APP_CONTEXT_ACTIONS.SET_PRODUCT:
            return { ...state, product: action.payload };

        case APP_CONTEXT_ACTIONS.UPDATE_USER_TOKEN:
            return {
                ...state,
                userId: payload,
            };
        case APP_CONTEXT_ACTIONS.TOGGLE_PROMO:
            return {
                ...state,
                promoApplied: payload,
            };
        case APP_CONTEXT_ACTIONS.UPDATE_CART:
            return {
                ...state,
                currentCart: payload,
            };
        case APP_CONTEXT_ACTIONS.UPDATE_ORDER:
            return {
                ...state,
                order: payload,
            };
        case APP_CONTEXT_ACTIONS.UPDATE_ADDRESS:
            return { ...state, localAddressObj: payload };
        case APP_CONTEXT_ACTIONS.UPDATE_ORDER_PLACED:
            return { ...state, orderPlaced: payload };
        case APP_CONTEXT_ACTIONS.UPDATE_SHOW_PHONE_ERROR:
            return { ...state, showPhoneError: payload };
        case APP_CONTEXT_ACTIONS.UPDATE_METHOD:
            return { ...state, method: payload };
        case APP_CONTEXT_ACTIONS.UPDATE_CUSTOMER:
            return { ...state, customer: payload };
        case APP_CONTEXT_ACTIONS.UPDATE_SHOW_PHONE_LOGIN:
            return { ...state, showPhoneLogin: payload };
        case APP_CONTEXT_ACTIONS.UPDATE_SENDING_CODE_TO_NEW_USER:
            return { ...state, sendingCodeToNewUser: payload };
        case APP_CONTEXT_ACTIONS.UPDATE_USER:
            return { ...state, user: payload };
        case APP_CONTEXT_ACTIONS.UPDATE_SHOW_VERIFICATION:
            return { ...state, showVerification: payload };
        case APP_CONTEXT_ACTIONS.UPDATE_IS_SCROLL_ACTIVATED:
            return { ...state, isScrollActivated: payload };
        case APP_CONTEXT_ACTIONS.UPDATE_PRODUCT:
            return { ...state, product: payload };
        case APP_CONTEXT_ACTIONS.UPDATE_CURRENT_EXTRA:
            return { ...state, currentExtra: payload };
        case APP_CONTEXT_ACTIONS.UPDATE_CURRENT_PAGE:
            return { ...state, currentPage: payload };
        case APP_CONTEXT_ACTIONS.SET_SHOW_SCATULATOR:
            return { ...state, showScatulator: payload };
        case APP_CONTEXT_ACTIONS.UPDATE_ANONYMOUS_ID:
            return { ...state, anonymousId: payload };
        case APP_CONTEXT_ACTIONS.SET_CURRENT_TAB:
            return { ...state, currentTab: payload };
        case APP_CONTEXT_ACTIONS.UPDATE_PAYMENT_TOKEN:
            return { ...state, paymentToken: payload };
        case APP_CONTEXT_ACTIONS.UPDATE_BRAINTREE_INSTANCE:
            return { ...state, braintreeInstance: payload };
        case APP_CONTEXT_ACTIONS.SET_GLOBAL_ERROR:
            return { ...state, globalError: payload };
        case APP_CONTEXT_ACTIONS.SET_GLOBAL_MESSAGE:
            return { ...state, globalMessage: payload };
        case APP_CONTEXT_ACTIONS.SET_SHOW_CART:
            return { ...state, showCart: payload };
        case APP_CONTEXT_ACTIONS.SET_SHOW_PAY_NOW:
            return { ...state, showPayNow: payload };
        case APP_CONTEXT_ACTIONS.UPDATE_MY_ACCOUNT_QTY:
            return { ...state, myAccountQty: payload };
        case APP_CONTEXT_ACTIONS.SET_SHOW_POPOVER:
            return { ...state, showPopOver: payload };
        case APP_CONTEXT_ACTIONS.SET_PHONE_CHECKED:
            return { ...state, phoneChecked: payload };
        case APP_CONTEXT_ACTIONS.SET_EMAIL_CHECKED:
            return { ...state, emailChecked: payload };
        default:
            return state;
    }
};

export { appContextReducer, APP_CONTEXT_ACTIONS };
