"use client";

import { Fragment, useEffect, useState, type CSSProperties } from "react";
import { usePathname } from "next/navigation";
import { useCart } from "@/contexts/CartContext";
import {
  HeadingSecondary,
  CartItem,
  PromoContainer,
  PriceContainer,
  PayTermsContainer,
  GreyOverlay,
} from "../index.shared";
import { fetchCart } from "@/utils/cart-functions";
import type {
  DeliveryNote,
  TCouponRedemption,
  TManualDiscount,
} from "@/types/index.types";
import styles from "./cart-container.module.scss";
import FurfyAustralia from '../../../../public/images/furfy_australia.webp';

const ORIGIN = process.env.NEXT_PUBLIC_BASE_URL;

type CartContainerProps = {
  subscriptionQty?: number;
  isGreyedOut?: boolean;
  totalFromConfirmation?: number;
  price?: number;
  couponCode?: string;
  orderReceiptCouponRedemption?: TCouponRedemption;
  items?: any;
  aside?: boolean;
  visible?: boolean;
  confirmation?: boolean;
  evaluatePayVisible: boolean;
  style?: CSSProperties;
  processingPayment: boolean;
  shippingFeeProp?: number;
  manualDiscounts?: TManualDiscount[];
  isNewOrder?: boolean;
  subscriptionQtyTotal?: number;
  orderQtyTotal?: number;
  subscriptionPrice?: number;
  orderPrice?: number;
  discountAmount?: number;
};

type Options = {
  method: string;
  credentials: "include";
  headers: { "Content-Type": string };
  body?: string;
};

export const INITIAL_PROMO_STATE = {
  code: "",
  error: false,
  show: false,
  loading: false,
};

const CartContainer = ({
  subscriptionQty,
  isGreyedOut,
  totalFromConfirmation,
  price,
  couponCode,
  items,
  visible = true,
  confirmation,
  evaluatePayVisible,
  processingPayment,
  shippingFeeProp,
  manualDiscounts,
  isNewOrder,
  subscriptionQtyTotal,
  orderQtyTotal,
  subscriptionPrice,
  orderPrice,
  discountAmount,
  orderReceiptCouponRedemption,
}: CartContainerProps) => {
  const path = usePathname();

  const [scCode, setScCode] = useState("");
  const [promo, setPromo] = useState(INITIAL_PROMO_STATE);
  const [loading, setLoading] = useState(false);
  const [overlay, setOverlay] = useState(false);
  const [autoApplied, setAutoApplied] = useState(false);
  const {
    cartItems,
    togglePromoCode,
    createCart,
    order,
    currentCart,
    promoApplied,
  } = useCart();

  let email: string,
    firstName: string,
    lastName: string,
    phone: string,
    address: null | string | object,
    deliveryNote: DeliveryNote,
    couponRedemption: any,
    priceBeforeCoupon: number = 0,
    shippingFee: number = 0,
    discountValue: number = 0;

  if (currentCart) {
    email = currentCart.email;
    firstName = currentCart.firstName;
    lastName = currentCart.lastName;
    phone = currentCart.phone;
    address = currentCart.address;
    deliveryNote = currentCart.deliveryNote;
    couponRedemption = currentCart.couponRedemption;
    priceBeforeCoupon = currentCart.priceBeforeCoupon;
    shippingFee = currentCart.shippingFee;
    discountValue = currentCart?.discountAmount || 0;
  }

  if (path === "/thank-you") {
    couponRedemption = order?.orderConfirmation?.couponRedemption;
    priceBeforeCoupon = order?.orderConfirmation?.priceBeforeCoupon!;
    discountValue = order?.orderConfirmation?.discountAmount as number;
  }

  const applyCoupon = async (code: string) => {
    const URL = `${[ORIGIN]}/api/cart/apply-coupon`;

    const options: Options = {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        coupon: code,
      }),
    };

    setLoading(true);

    try {
      const response = await fetch(URL, options);
      const data = await response.json();

      if (data.success) {
        setPromo({ ...promo, error: false });
        togglePromoCode({ code: code, rate: 0.15 });
        await fetchCart(createCart, {
          email,
          firstName,
          lastName,
          phone,
          address,
          deliveryNote,
        });

        // const { couponRedemption, priceBeforeCoupon } = data.data;

        // const discountValue =
        //   couponRedemption?.coupon?.valueType === 'PERCENTAGE'
        //     ? (priceBeforeCoupon * couponRedemption?.coupon.valueFixed) / 100
        //     : couponRedemption?.coupon?.valueFixed;

        // handleCustomerIoData((user?.email || anonymousId)!, "track", {
        //   event: "Coupon Applied",
        //   properties: {
        //     cart_id: currentCart && currentCart?.accessToken,
        //     coupon_id: code,
        //     discount: formatPrice(discountValue),
        //   },
        // });
      } else {
        // handleCustomerIoData((user?.email || anonymousId)!, "track", {
        //   event: "Coupon Denied",
        //   properties: {
        //     cart_id: currentCart && currentCart?.accessToken,
        //     coupon_id: code,
        //     reason: data.message,
        //   },
        // });
        setPromo({ ...promo, error: true, code: "" });
        togglePromoCode(null);
      }
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  const removeCoupon = async () => {
    /*  const URL = `${[ORIGIN]}api/cart/remove-coupon`;
 
     const options: Options = {
       method: "POST",
       credentials: "include",
       headers: {
         "Content-Type": "application/json",
       },
     };
 
     try {
       const response = await fetch(URL, options);
       await response.json();
 
       fetchCart(createCart, {
         email,
         firstName,
         lastName,
         phone,
         address,
         deliveryNote,
       });
     } catch (error) {
       console.error(error);
     } */
  };

  const onClickHandler = () => {
    // VALIDATE EMAIL WITH COUPON HERE
    if (promo.code) {
      applyCoupon(promo.code);
    }
  };

  const onChangeHandler = <T,>(e: React.ChangeEvent<T>) => {
    if ("value" in e.target && typeof e.target.value === "string") {
      const newCode = e.target.value.toUpperCase();
      setPromo({ ...promo, code: newCode });

      if (promoApplied) {
        removeCoupon?.();
        togglePromoCode?.(null);
      }
    }
  };

  function clearPromo() {
    setPromo({ ...promo, error: false, code: "" });
    removeCoupon?.();
    togglePromoCode?.(null);
  }

  useEffect(() => {
    if (cartItems && cartItems?.length < 1) {
      clearPromo();
    }
  }, [cartItems?.length]);

  useEffect(() => {
    if (currentCart && currentCart?.couponCode) {
      setPromo({
        ...promo,
        code: currentCart?.couponCode.toUpperCase(),
        show: true,
      });
      togglePromoCode({ code: currentCart?.couponCode });
    }
  }, [currentCart && currentCart?.couponCode]);

  useEffect(() => {
    if (autoApplied && promo.code.length > 0 && promo.code === scCode) {
      applyCoupon(promo.code);
    }
  }, [autoApplied]);

  useEffect(() => {
    if (promo.error) {
      const timerId = setTimeout(() => {
        setPromo({ ...promo, error: false });
      }, 3000);

      return () => {
        clearTimeout(timerId);
      };
    }
    if (scCode.length > 0 && promo.code === scCode) {
      setAutoApplied(true);
    }
  }, [promo]);

  useEffect(() => {
    if (scCode !== null && scCode.length > 0) {
      setPromo({
        ...promo,
        code: scCode,
        show: true,
      });
    }
  }, [scCode]);

  useEffect(() => {
    const scCode = localStorage.getItem("scCode");
    if (!autoApplied && scCode !== null && scCode.length > 0) {
      setScCode(scCode);
    }
  }, []);

  return (
    <div
      className={
        isGreyedOut
          ? `${styles["cart-container--greyed-out"]} ${styles["cart-container"]}`
          : styles["cart-container"]
      }
    >
      {!confirmation && (
        <HeadingSecondary style={{ fontWeight: 700 }}>
          your items
        </HeadingSecondary>
      )}
      <ul>
        {(cartItems && cartItems?.length > 0) || confirmation ? (
          cartItems?.map((product) => {
            return (
              <Fragment key={`cart-item-${product.id}`}>
                <CartItem {...product} imgUrl={FurfyAustralia} />
              </Fragment>
            );
          })
        ) : (
          <li key="cart-item-empty" className={styles["empty-item"]}>
            your cart is empty
          </li>
        )}

        <PriceContainer
          price={totalFromConfirmation || priceBeforeCoupon}
          discountValue={discountAmount || discountValue}
          manualDiscounts={manualDiscounts}
          promoApplied={
            couponCode ? { code: couponCode! } : promoApplied || null
          }
          subtotal={price}
          subscriptionQty={subscriptionQty}
          shippingFee={
            shippingFeeProp !== undefined ? shippingFeeProp : shippingFee
          }
          isSubscription={items?.[0].subscriptionPlan !== null}
          isNewOrder={isNewOrder}
          subscriptionQtyTotal={subscriptionQtyTotal}
          orderQtyTotal={orderQtyTotal}
          subscriptionPrice={subscriptionPrice}
          orderPrice={orderPrice}
          orderReceiptCouponRedemption={orderReceiptCouponRedemption}
        />

        {overlay && (
          <GreyOverlay
            style={{
              position: "absolute",
              zIndex: "1",
            }}
          />
        )}
      </ul>
      {visible && (
        <PromoContainer
          promoApplied={promoApplied || null}
          loading={loading}
          promo={promo}
          setPromo={setPromo}
          onClickHandler={onClickHandler}
          onChangeHandler={onChangeHandler}
          clearPromo={clearPromo}
        />
      )}
      {visible && (
        <PayTermsContainer
          processingPayment={processingPayment}
          evaluatePayVisible={evaluatePayVisible}
          className="hidden"
        />
      )}
    </div>
  );
};

export default CartContainer;
