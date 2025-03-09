import Image from "next/image";
import { formatPrice } from "@/utils/format-price";
import styles from "./price-container.module.scss";
import discountIcon from "../../../../../public/images/checkout/icon-discount.png";
import { useCart } from "@/contexts/CartContext";
import { TManualDiscount } from "@/types/index.types";

const PriceContainer = () => {
  const { price, subtotal, shippingFee, total, currentCart } = useCart();

  const totalManualDiscount =
    currentCart?.manualDiscounts && currentCart?.manualDiscounts?.length > 0
      ? currentCart?.manualDiscounts.reduce(
        (acc: number, cur: TManualDiscount) => {
          if (cur.valueType === "AMOUNT") {
            return acc + cur.amount;
          }
          return acc + (currentCart?.orderPrice || price) * cur.amount * 0.01;
        },
        0
      )
      : 0;

  const totalCouponDiscount = currentCart?.orderReceiptCouponRedemption
    ? currentCart?.orderReceiptCouponRedemption.coupon.valueType === "AMOUNT"
      ? currentCart?.orderReceiptCouponRedemption.coupon.valueFixed
      : (Math.max(subtotal || 0, price || 0) *
        currentCart?.orderReceiptCouponRedemption.coupon.valueFixed) /
      100
    : !currentCart?.isNewOrder
      ? currentCart?.discountValue - totalManualDiscount
      : currentCart?.discountValue;

  const calculateTotal = () => {
    let total =
      (subtotal || price) +
      currentCart?.shippingFee -
      currentCart?.discountValue;

    if (total < 0) {
      total = 0;
    } else if (subtotal === 0) {
      total = 0;
    }
    return formatPrice(total);
  };

  const validateCart = (cost: string): string => {
    const validatedCost = price && price > 0 ? cost : formatPrice(0);
    return validatedCost;
  };

  return (
    <li className={styles["price-container"]}>
      <p>
        <span>subtotal</span>
        <span>{formatPrice(price)}</span>
      </p>

      {currentCart?.promoApplied?.code && totalCouponDiscount > 0 && (
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
              ({currentCart?.promoApplied?.code})
            </span>
          </span>
          <span>-{formatPrice(totalCouponDiscount)}</span>
        </p>
      )}
      {currentCart?.manualDiscounts &&
        currentCart?.manualDiscounts.length > 0 &&
        currentCart?.manualDiscounts.map((manualDiscount: TManualDiscount) => {
          return (
            <p key={manualDiscount.id}>
              <span className={styles["discount-heading"]}>
                <span>
                  <Image
                    src={discountIcon}
                    alt="discount-icon"
                    className={styles["discount-icon"]}
                  />
                  <span className={styles.manual}>Manual Discount</span>
                </span>
                <span className={styles.reason}>({manualDiscount.reason})</span>
              </span>
              <span>
                -
                {manualDiscount.valueType === "AMOUNT"
                  ? formatPrice(manualDiscount.amount)
                  : formatPrice(
                    (currentCart?.orderPrice || price) *
                    manualDiscount.amount *
                    0.01
                  )}
              </span>
            </p>
          );
        })}

      <p className={styles.shipping}>
        <span>shipping</span>
        <span>{validateCart(formatPrice(shippingFee))}</span>
      </p>

      <p className={styles["total-price"]}>
        <span>total</span>
        <span>{validateCart(formatPrice(total))}</span>
      </p>
    </li>
  );
};

export default PriceContainer;
