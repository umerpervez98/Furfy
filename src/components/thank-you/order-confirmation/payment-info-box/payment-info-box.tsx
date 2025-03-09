"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import paypalIcon from "../../../../../public/images/thank-you/paypal.png";
import mastercardIcon from "../../../../../public/images/thank-you/mastercard.svg";
import visaIcon from "../../../../../public/images/thank-you/visa.png";
import styles from "./payment-info-box.module.scss";

export type PaymentInfoBoxProps = {
  cardType: string | null;
  cardNumber: string | null;
  paypalEmail: string | null;
  paymentMethodType: string;
};

const PaymentInfoBox = ({
  cardType,
  cardNumber,
  paypalEmail,
  paymentMethodType,
}: PaymentInfoBoxProps) => {
  const elementRef = useRef<HTMLDivElement | null>(null);
  const [elementWidth, setElementWidth] = useState<number | null>(null);

  useEffect(() => {
    // Function to update the element width
    const updateElementWidth = () => {
      if (elementRef.current) {
        const width = elementRef.current.offsetWidth;
        setElementWidth(width);
      }
    };

    // Call it once to initialize
    updateElementWidth();

    // Add a resize event listener to track changes in element width
    window.addEventListener("resize", updateElementWidth);

    // Clean up the listener when the component unmounts
    return () => {
      window.removeEventListener("resize", updateElementWidth);
    };
  }, []);

  let paymentIcon = visaIcon;

  switch (cardType) {
    case "visa":
      paymentIcon = visaIcon;
      break;
    case "mastercard":
      paymentIcon = mastercardIcon;
      break;
    case "":
      paymentIcon = paypalIcon;
      break;
  }

  return (
    <div
      className={
        elementWidth && elementWidth >= 242
          ? `${styles.div} ${styles.left}`
          : styles.div
      }
    >
      <Image src={paymentIcon} alt={paymentMethodType} width={70} height={45} />
      <div ref={elementRef}>
        <h4>paid with {paymentMethodType}</h4>
        <p>
          {cardNumber && paymentMethodType === "creditcard"
            ? `Ending in ${cardNumber.slice(cardNumber.length - 4)}`
            : paypalEmail}
        </p>
      </div>
    </div>
  );
};

export default PaymentInfoBox;
