"use client";

import { Fragment, useEffect, useState, type CSSProperties } from "react";
import { useApp } from "@/contexts/AppContext";
import {
  HeadingSecondary,
  CartItem,
  PromoContainer,
  PriceContainer,
  PayTermsContainer,
} from "../index.shared";
import styles from "./cart-container.module.scss";
import FurfyAustralia from "../../../../public/images/furfy_australia.webp";
import {
  applyCoupon as applyCouponApi,
  removeCoupon as removeCouponApi,
} from "@/services/cart-functions";
type CartContainerProps = {
  isGreyedOut?: boolean;
  visible?: boolean;
  confirmation?: boolean;
  evaluatePayVisible: boolean;
  style?: CSSProperties;
  processingPayment: boolean;
};

export const INITIAL_PROMO_STATE = {
  code: "",
  error: false,
  show: false,
  loading: false,
};

const CartContainer = ({
  isGreyedOut,
  visible = true,
  confirmation,
  evaluatePayVisible,
  processingPayment,
}: CartContainerProps) => {
  const [scCode, setScCode] = useState("");
  const [promo, setPromo] = useState(INITIAL_PROMO_STATE);
  const [autoApplied, setAutoApplied] = useState(false);
  const { togglePromoCode, currentCart, promoApplied, fetchCart } = useApp();
  const [loading, setLoading] = useState(false);

  const applyCoupon = async (code: string) => {
    setLoading(true);

    try {
      const data = await applyCouponApi(code);

      if (data.success) {
        setPromo({ ...promo, error: false });
        togglePromoCode({ code: code, rate: 0.15 });
        fetchCart();
      } else {
        setPromo({ ...promo, error: true, code: "" });
        togglePromoCode(null);
      }
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
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
    }
  };

  useEffect(() => {
    if (currentCart && currentCart?.couponCode) {
      setPromo({
        ...promo,
        code: currentCart?.couponCode.toUpperCase(),
        show: true,
      });
      togglePromoCode({ code: currentCart?.couponCode as string });
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

  const clearPromo = async () => {
    setPromo({ ...promo, error: false, code: "" });
    await removeCouponApi();
    fetchCart();
    togglePromoCode(null);
  };

  useEffect(() => {
    if (currentCart?.cartItems && currentCart?.cartItems?.length < 1) {
      clearPromo();
    }
  }, [currentCart?.cartItems?.length]);
  console.log('currentCart', currentCart?.cartItems);
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
        {(currentCart?.cartItems && currentCart?.cartItems?.length > 0) ||
          confirmation ? (
          currentCart?.cartItems?.map((product) => {
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

        <PriceContainer />
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
