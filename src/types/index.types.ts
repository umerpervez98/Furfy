import { CartItem } from "@/contexts/CartContext";

export type PaymentMethod = {
  accessToken: string;
  cardType: string;
  cardExpiry: string;
  cardNumber: string;
  paypalEmail: string;
  isDefault: boolean;
};

export type UpdateCustomerProps = {
  customerID: string;
  email?: string;
  phone?: string;
};

export type CurrentCart = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  accessToken: string;
  deliveryNote: DeliveryNote;
  address: null | string | AddressObject;
  priceBeforeCoupon: number;
  cartItems: CartItem[];
  [key: string]: any;
};

export type DeliveryNote = {
  value: string;
  request: null | string;
  show: boolean;
};

export type AddressObject = {
  addressToken?: string;
  id: string;
  address_line_1: string;
  address_line_2: string;
  locality_name: string;
  state_territory: string;
  postcode: number | string;
  full_address: string;
  canonical_address: string;
  suburb?: string;
  line1?: string;
  line2?: string;
  state?: string;
  country: string;
  city?: string;
  addressLine1: string;
  addressLine2: string;
  deliveryNote: string | object;
  setDefault: boolean;
  isActive?: boolean;
};



export type User = {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  paymentMethods: PaymentMethod[];
  addresses: {
    accessToken: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
    [key: string]: unknown;
  }[];
  defaultAddress: {
    accessToken: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
    deliveryNote: string | object;
  };
  emailVerified: boolean;
  phoneVerified: boolean;
  [key: string]: any;
};

export type UpdateOrderProps = {
  orderConfirmation: TOrderConfirmation | null;
  submitState: SubmitState;
  error: string | null;
};

/*** ==========================
 * Manual Discount Types
=========================== */
// eslint-disable-next-line no-unused-vars
export type TManualDiscount = {
  id: number;
  accessToken: string;
  amount: number;
  reason: string;
  dateCreated: string;
  dateUpdated: string;
  deletedAt?: string;
  adminID: number;
  customerOrderID: number;
  subscriptionID: number;
  valueType: 'AMOUNT' | 'PERCENTAGE';
  [key: string]: unknown;
};

export type TCouponRedemption = {
  coupon: {
    valueType: 'AMOUNT' | 'PERCENTAGE';
    valueFixed: number;
  };
  valueFixed: number;
  [key: string]: unknown;
};

export type TOrderConfirmation = {
  id: number;
  dateCreated: string;
  priceBeforeCoupon: number;
  amountBeforeDiscount: number;
  price: number;
  couponCode: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  country: string;
  deliveryNote: string;
  orderItems: { qty: number; price: number;[key: string]: unknown }[];
  paymentMethod: PaymentInfoBoxProps & { [key: string]: unknown };
  estimatedDeliveryDate: string | null;
  shippingFee: number;
  orderStatus: { name: string;[key: string]: unknown };
  orderPaymentStatus: { name: string;[key: string]: unknown };
  manualDiscounts?: TManualDiscount[];
  couponRedemption: TCouponRedemption;
  discountAmount: number;
  [key: string]: unknown;
};

export type SubmitState = 'success' | 'fail' | 'processing' | null;

export type PaymentInfoBoxProps = {
  cardType: string | null;
  cardNumber: string | null;
  paypalEmail: string | null;
  paymentMethodType: string;
};

export type PromoApplied = {
  code: string;
  rate?: number;
} | null;

export type LocalAddressProps = {
  localAddress: string | { address: any; fullAddress: any };
  isAddressValidated: boolean;
};

export type Method = 'phone' | 'email';

export type LocalAddress = { address: string; fullAddress: string | object };

export type Order = {
  id: string;
  orderItems: object[];
  dateCreated: string;
  [key: string]: unknown;
};

export type Subscription = {
  id: string;
  subscriptionStatus: { name: string };
  dateCreated: string;
  [key: string]: unknown;
};

export type Product = {
  productThumbnailID: string;
  productThumbnail: { accessToken: string; extension: string };
  productVariants: {
    sku: string;
    name: string;
    productThumbnailID: string;
    productThumbnail: { accessToken: string };
    variantThumbnailID: string;
    variantThumbnail: { accessToken: string; extension: string };
    [key: string]: unknown;
  }[];
  name: string;
  price: number;
  sku: string;
  accessToken: string;
  subscriptionPlans: {
    accessToken: string;
    name: string;
    freq: number;
    price: number;
    qtyRules: { minQty: number; maxQty: number; price: number }[];
    qtyPricingRulesEnabled: boolean;
    [key: string]: unknown;
  }[];
  description: string;
  shortDescription: string;
  cartLine1: string;
  cartLine2: string;
  qtyRules: { minQty: number; maxQty: number; price: number }[];
  qtyPricingRulesEnabled: boolean;
  [key: string]: unknown;
};

export type PurchaseType = 'subscription' | 'one-off';

export type Testimonial = {
  text: string;
  author: string;
  position: string;
};

export type CurrentTab =
  | 'dashboard'
  | 'my subscription'
  | 'my orders'
  | 'contact us'
  | 'my details';

/* *************************************** */
/* Contact Form Types */
/* *************************************** */

export type ContactFormSubject =
  | 'my order'
  | 'my subscription'
  | 'shipping'
  | 'something else';

export type ContactFormPayload = {
  subject: string;
  message: {
    text: string;
  };
  priority: number;
  status: 'open' | 'closed' | 'pending';
  requester: {
    name: string;
    email: string;
  };
  teamIDs: string[];
  assignment: {
    team: {
      ID: string;
    };
    agent: null | string;
  };
};

/* *************************************** */
/* my detail types */
/* *************************************** */
export type TLocalPaymentMethodData = {
  method: 'creditcard' | 'paypal' | '';
  lastFour?: string;
  cardType?: string;
  expiry?: string;
  email?: string;
  isDefault?: boolean;
  paymentMethodNonce: string;
};

export enum EUserProfile {
  SUBSCRIPTION = 'subscription',
  MYDETAIL = 'my detail',
}
