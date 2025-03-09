"use client";

import { useEffect } from "react";
import { useCart } from "@/contexts/CartContext";
import dropin from "braintree-web-drop-in";
import { Spinner } from "../index.checkout";
import "./braintree-payment.scss";

type BraintreePaymentProps = {
  paymentToken: string | null;
  shouldInitiate: boolean;
  visible?: boolean;
};

const BraintreePayment = ({
  paymentToken,
  visible = true,
  shouldInitiate = false,
}: BraintreePaymentProps) => {
  const { setShowPayNow, braintreeInstance, setBraintreeInstance } = useCart();

  // I setup this hook and used paymenttoken and shouldInitiate 
  // to initialize functionality of braintree
  // also if we already have an instance, then first tear down and then initialize.
  // We can improve this later, but for now, it is just a quick fix.
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

    if (paymentToken && shouldInitiate) {
      if (braintreeInstance) {
        braintreeInstance.teardown().then(() => {
          initializeBraintree();
        });
      } else {
        initializeBraintree();
      }
    }
  }, [paymentToken, shouldInitiate]);

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