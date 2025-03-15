import Image from "next/image";
import { formatPrice } from "@/utils/format-price";
import styles from "./price-container.module.scss";
import { useCart } from "@/contexts/CartContext";
import { PromoApplied, TManualDiscount, TOrderReceiptCouponRedemption } from "@/types/index.types";

const PriceContainer = () => {
  const { price, subtotal, shippingFee, total, currentCart } = useCart();

  const totalManualDiscount =
    currentCart?.manualDiscounts && (currentCart?.manualDiscounts as TManualDiscount[])?.length > 0
      ? (currentCart?.manualDiscounts as TManualDiscount[]).reduce(
        (acc: number, cur: TManualDiscount) => {
          if (cur.valueType === "AMOUNT") {
            return acc + cur.amount;
          }
          return acc + ((currentCart?.orderPrice || price) as number) * cur.amount * 0.01;
        },
        0
      )
      : 0;

  const totalCouponDiscount = currentCart?.orderReceiptCouponRedemption
    ? (currentCart?.orderReceiptCouponRedemption as TOrderReceiptCouponRedemption).coupon.valueType === "AMOUNT"
      ? (currentCart?.orderReceiptCouponRedemption as TOrderReceiptCouponRedemption).coupon.valueFixed
      : (Math.max(subtotal || 0, price || 0) *
        (currentCart?.orderReceiptCouponRedemption as TOrderReceiptCouponRedemption).coupon.valueFixed) /
      100
    : !currentCart?.isNewOrder
      ? (currentCart?.discountValue as number) - totalManualDiscount
      : currentCart?.discountValue;

  const validateCart = (cost: string): string => {
    const validatedCost = price && price > 0 ? cost : formatPrice(0);
    return validatedCost;
  };

  return (
    <li className={styles["price-container"]}>
      <p className="my-0">
        <span >SUBTOTAL</span>
        <span>{formatPrice(price)}</span>
      </p>

      {(currentCart?.promoApplied as PromoApplied)?.code && (totalCouponDiscount as number) > 0 && (
        <p>
          <span className={styles["discount-heading"]}>
            <span>
              <Image
                src={"/images/checkout/icon-discount.png"}
                alt="discount-icon"
                className={styles["discount-icon"]}
                priority
              />
              discount
            </span>
            <span className={styles.code}>
              ({(currentCart?.promoApplied as PromoApplied)?.code})
            </span>
          </span>
          <span>-{formatPrice(totalCouponDiscount as number)}</span>
        </p>
      )}

      <p className={`${styles.shipping} my-0`}>
        <span>shipping</span>
        <span>{validateCart(formatPrice(shippingFee))}</span>
      </p>

      <p className={`${styles["total-price"]} my-0`}>
        <span>total</span>
        <span>{validateCart(formatPrice(total))}</span>
      </p>
    </li>
  );
};

export default PriceContainer;
