"use client";

import { useEffect } from "react";
import { useApp } from "@/contexts/AppContext";
import dropin from "braintree-web-drop-in";
import { Spinner } from "../index.checkout";
import "./braintree-payment.scss";

type BraintreePaymentProps = {
  paymentToken: string | null;
  visible?: boolean;
};

const BraintreePayment = ({
  paymentToken,
  visible = true,
}: BraintreePaymentProps) => {
  const { setShowPayNow, braintreeInstance, setBraintreeInstance } = useApp();

  useEffect(() => {
    const initializeBraintree = async () => {
      const instance = await dropin.create({
        authorization: paymentToken as string,
        container: "#braintree-dropin-container",
        paypal: { flow: "vault" },
      });
      setShowPayNow?.(true);
      setBraintreeInstance?.(instance);
    };
    initializeBraintree();
    return () => {
      if (braintreeInstance) {
        braintreeInstance.teardown();
      }
    };
  }, []);

  return (
    <div style={visible ? {} : { display: "none" }}>
      {paymentToken ? (
        <div id="braintree-dropin-container" />
      ) : (
        <div style={{ textAlign: "center" }}>
          <Spinner
            extraStyles={{ width: "4rem", height: "4rem", marginTop: "4rem" }}
          />
        </div>
      )}
    </div>
  );
};

export default BraintreePayment;