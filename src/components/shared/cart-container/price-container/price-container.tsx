import Image from "next/image";
import { formatPrice } from "@/utils/format-price";
import styles from "./price-container.module.scss";
import { useCart } from "@/contexts/CartContext";
import DiscountIcon from "../../../../../public/images/checkout/icon-discount.png";
import { TManualDiscount, TOrderReceiptCouponRedemption } from "@/types/index.types";

const PriceContainer = () => {
  const { currentCart } = useCart();

  const totalManualDiscount =
    currentCart?.manualDiscounts && (currentCart?.manualDiscounts as TManualDiscount[])?.length > 0
      ? (currentCart?.manualDiscounts as TManualDiscount[]).reduce(
        (acc: number, cur: TManualDiscount) => {
          if (cur.valueType === "AMOUNT") {
            return acc + cur.amount;
          }
          return acc + ((currentCart?.orderPrice || currentCart?.price) as number) * cur.amount * 0.01;
        },
        0
      )
      : 0;

  const totalCouponDiscount = currentCart?.couponRedemption
    ? (currentCart?.couponRedemption as TOrderReceiptCouponRedemption)?.coupon?.valueType === "AMOUNT"
      ? (currentCart?.couponRedemption as TOrderReceiptCouponRedemption)?.coupon?.valueFixed
      : ((Math.max(currentCart?.subtotal || 0, currentCart?.price || 0) *
        ((currentCart?.couponRedemption as TOrderReceiptCouponRedemption)?.coupon?.valueFixed ?? 0)) /
        100)
    : !currentCart?.isNewOrder
      ? (currentCart?.discountAmount as number) - totalManualDiscount
      : currentCart?.discountAmount;
  console.log('currentCart', currentCart);
  console.log('currentCart?.couponRedemption', currentCart?.couponRedemption);
  console.log('totalCouponDiscount', totalCouponDiscount);

  const validateCart = (cost: string): string => {
    const validatedCost = currentCart?.price && currentCart?.price > 0 ? cost : formatPrice(0);
    return validatedCost;
  };

  return (
    <li className={styles["price-container"]}>
      <p className="my-0">
        <span >SUBTOTAL</span>
        <span>{formatPrice(currentCart?.subtotal || 0)}</span>
      </p>

      {(currentCart?.couponRedemption as TOrderReceiptCouponRedemption)?.coupon?.code && (totalCouponDiscount as number) > 0 && (
        <p>
          <span className={styles["discount-heading"]}>
            <span>
              <Image
                src={DiscountIcon}
                alt="discount-icon"
                className={styles["discount-icon"]}
                priority
              />
              discount
            </span>
            <span className={styles.code}>
              ({(currentCart?.couponRedemption as TOrderReceiptCouponRedemption)?.coupon?.code})
            </span>
          </span>
          <span>-{formatPrice(totalCouponDiscount as number)}</span>
        </p>
      )}

      <p className={`${styles.shipping} my-0`}>
        <span>shipping</span>
        <span>{validateCart(formatPrice(currentCart?.shippingFee || 0))}</span>
      </p>

      <p className={`${styles["total-price"]} my-0`}>
        <span>total</span>
        <span>{validateCart(formatPrice(currentCart?.total || 0))}</span>
      </p>
    </li>
  );
};

export default PriceContainer;
