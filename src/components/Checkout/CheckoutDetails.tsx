"use client";

import { useState, useEffect, type ChangeEvent, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/contexts/AppContext";
import {
  AllInputContainer,
  PhoneVerificationContainer,
} from "./index.checkout";
import {
  CartContainer,
  PayTermsContainer,
} from "@/components/shared/index.shared";
import {
  getPaymentMethods,
  submitCartWithPayment,
} from "@/services/cart-functions";
import { authWithMethod } from "@/services/auth-functions";
import type {
  PaymentMethod,
  UpdateCustomerProps,
  SubmitState,
  LocalAddress,
} from "@/types/index.types";
import styles from "./checkout.module.scss";
import { validateName } from "@/utils/account-functions";
import PaymentContainer from "../Checkout/payment-container/payment-container";

declare global {
  interface Window {
    fbq: (type: string, eventName: string, params?: object) => void;
  }
}

const Checkout = () => {
  // Braintree Payment
  const [paymentError, setPaymentError] = useState<{
    error: string;
    type?: string;
  } | null>(null);
  const [newPayment, setNewPayment] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[] | null>(
    null
  );
  const [processingPayment, setProcessingPayment] = useState(false);
  const [emailHasChanged, setEmailHasChanged] = useState(false);
  const [currentEmail, setCurrentEmail] = useState("");

  const {
    fetchCart,
    updateSendingCodeToNewUser,
    updateCustomer,
    updateShowPhoneLogin,
    updateMethod,
    updateShowVerification,
    updateShowPhoneError,
    updateOrderPlaced,
    updateLocalAddress,
    updateOrder,
    updateCustomerDetails,
    updateCustomerDetailsAtOnce,
    updateUserAuthToken,
    togglePromoCode,
    showPayNow,
    setShowPayNow,
    braintreeInstance,
    localAddressObj,
    order,
    user,
    userId,
    currentCart,
    phoneChecked,
    emailChecked,
    setPhoneChecked,
    setEmailChecked,
  } = useApp();

  const { orderConfirmation, submitState } = order ?? {};


  const { email, phone, firstName, lastName, address, deliveryNote } =
    currentCart
      ? currentCart
      : {
        email: "",
        phone: "",
        firstName: "",
        lastName: "",
        address: "",
        deliveryNote: "",
      };
  const { isAddressValidated, localAddress } = localAddressObj ?? {};

  const router = useRouter();

  useEffect(() => {
    if (userId) {
      initPaymentMethods(userId);
    } else {
      setPaymentMethods(null);
    }
  }, [userId, user]);

  useEffect(() => {
    if (!newPayment) {
      setShowPayNow?.(true);
    }
  }, [newPayment]);

  const setSubmitState = (newState: SubmitState) => {
    updateOrder?.({
      orderConfirmation: orderConfirmation ?? null,
      submitState: newState,
      error: null,
    });
  };

  useEffect(() => {
    if (submitState === "fail") {
      setSubmitState(null);
    }
  }, []);

  const setIsAddressValidated = (newIsAddressValidated: boolean) => {
    updateLocalAddress?.({
      ...localAddressObj,
      isAddressValidated: newIsAddressValidated,
      localAddress: typeof localAddressObj?.localAddress === 'string'
        ? ''
        : {
          address: '',
          fullAddress: ""
        },
    });
  };

  const setLocalAddress = (newLocalAddress: LocalAddress) => {
    updateLocalAddress?.({
      ...localAddressObj,
      localAddress: newLocalAddress as string | { address: string; fullAddress: string; },
      isAddressValidated: localAddressObj?.isAddressValidated ?? false,
    });
  };

  const setPhone = (newPhone: string | undefined) =>
    updateCustomerDetails?.("phone", newPhone);

  const initPaymentMethods = async (userId: string) => {
    const methods = await getPaymentMethods(userId);

    setPaymentMethods(methods.data);

    if (methods.data?.length >= 1) {
      setSelectedPaymentMethod(
        methods.data.find((method) => method.isDefault)!.accessToken
      );
    }
  };

  const onChangeHandler = <
    T extends HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >(
    e: ChangeEvent<T>
  ) => {
    if (e.target.name === "firstName" || e.target.name === "lastName") {
      let newValue;

      if (!e.target.value) {
        newValue = "";
      } else {
        newValue = validateName(
          e.target.value[0].toUpperCase() +
          e.target.value.slice(1).toLowerCase()
        );
      }

      updateCustomerDetails?.(e.target.name, newValue);
    } else if (e.target.name === "email") {
      if (!emailHasChanged) {
        setEmailHasChanged(true);
      }
      setCurrentEmail(e.target.value.toLowerCase());
      updateCustomerDetails?.("email", e.target.value.toLowerCase());
    } else {
      updateCustomerDetails?.(e.target.name, e.target.value);
    }
  };

  const updateDeliveryNote = async (newDeliveryNote: string | object) => {
    await updateCustomerDetails?.("deliveryNote", newDeliveryNote);
  };

  const submitOrderObject = async (orderObject: object) => {
    setProcessingPayment(true);
    updateOrderPlaced?.(false);
    updateOrder?.({
      ...order,
      orderConfirmation: order?.orderConfirmation ?? null,
      submitState: "processing",
      error: null,
    });
    router.push("/thank-you");
    try {
      const response = await submitCartWithPayment(orderObject, userId ?? null);

      if (response.success) {
        fetchCart?.();

        // Store the userId in local storage if it's a first time user
        if (!userId) {
          updateUserAuthToken?.(response.accessToken);
        }

        // Once the payment and creating an order are successful
        setIsAddressValidated(false);
        togglePromoCode?.(null);
        setNewPayment(false);
        setEmailChecked?.(false);
        setPhoneChecked?.(false);
        // You can add a delay to show the order confirmation
        setTimeout(() => {
          updateOrder?.({
            submitState: "success",
            orderConfirmation: response.data,
            error: null,
          });
          if (!user) {
            setLocalAddress("");
          }
          if (
            typeof window !== "undefined" &&
            typeof window.fbq !== "undefined"
          ) {
            window.fbq("track", "Purchase", {
              value: response.data.price,
              currency: "AUD",
            });
          }
        }, 500);

        // setUserProfile(userId || response.accessToken);
      } else {
        setTimeout(() => {
          updateOrder?.({
            ...order,
            submitState: "fail",
            error:
              response.details?.length > 0
                ? response.details?.join(" ")
                : response.message,
          });
        }, 2000);
      }
    } catch (error) {
      console.log("failed to submit order", error);
      if (error instanceof Error) {
        setTimeout(() => {
          updateOrder({
            ...order,
            submitState: "fail",
            error: error.message,
          });
        }, 2000);
      } else {
        setTimeout(() => {
          updateOrder({
            ...order,
            submitState: "fail",
            error: "An error occurred while processing your payment.",
          });
        }, 2000);
      }
    }

    setProcessingPayment(false);
  };

  const handlePayment = async () => {
    if (!phoneChecked && !userId) {
      setPaymentError({
        error:
          "You need to first verify your phone number to proceed with the payment processing.",
      });
      return;
    }

    let orderObject = {};

    if (userId && !newPayment && paymentMethods && paymentMethods?.length > 0) {
      const addressToken = user?.addresses.find((serverAddress) => {
        if (typeof address === "object") {
          return serverAddress.addressLine1 === address?.addressLine1;
        }
      })?.accessToken;
      console.log("selectedPaymentMethod", selectedPaymentMethod);
      orderObject = { addressToken, paymentMethodToken: selectedPaymentMethod };
    } else {
      if (braintreeInstance) {
        // Set two different flows
        // 1. pay as guest || pay as user with new method
        // 2. pay as user with stored method

        braintreeInstance.requestPaymentMethod(async (error, payload) => {
          if (
            error &&
            "message" in error &&
            typeof error.message === "string"
          ) {
            setPaymentError({ error: error.message });
          } else if (currentCart) {
            const paymentNonce = payload.nonce;
            type LocalPaymentMethodData = {
              method: string;
              lastFour?: string;
              cardType?: string;
              expiry?: string;
              email?: string;
            };

            const localPaymentMethodData: LocalPaymentMethodData = {
              method: "",
              lastFour: "",
              cardType: "",
              expiry: "",
              email: "",
            };

            localPaymentMethodData.method =
              payload.type.toLowerCase() === "creditcard"
                ? "creditcard"
                : payload.type.toLowerCase() == "paypalaccount"
                  ? "paypal"
                  : "";

            if (
              localPaymentMethodData.method == "creditcard" &&
              "lastFour" in payload.details &&
              "expirationMonth" in payload.details
            ) {
              localPaymentMethodData.lastFour = payload.details.lastFour;
              localPaymentMethodData.cardType =
                payload.details.cardType.toLowerCase();
              localPaymentMethodData.expiry =
                payload.details.expirationMonth +
                "/" +
                payload.details.expirationYear;
            } else if (
              localPaymentMethodData.method == "paypal" &&
              "email" in payload.details
            ) {
              localPaymentMethodData.email = payload.details.email;
            }

            const paymentObject = {
              paymentMethodData: localPaymentMethodData,
              nonce: paymentNonce,
            };

            let orderObject;

            if (
              (userId && newPayment) ||
              (userId && paymentMethods && paymentMethods?.length <= 0)
            ) {
              const addressToken = user?.addresses.find((serverAddress) => {
                if (address && typeof address === "object") {
                  return serverAddress.addressLine1 === address.addressLine1;
                }
              })!.accessToken;

              orderObject = {
                ...paymentObject,
                addressToken,
              };
            } else if (
              address &&
              typeof address === "object" &&
              typeof deliveryNote === "object"
            ) {
              orderObject = {
                ...paymentObject,
                ...address,
                email,
                phone,
                firstName,
                lastName,
                city: address.suburb,
                address1: address.line1,
                address2: address.line2,
                deliveryNote: deliveryNote.request
                  ? deliveryNote.request
                  : deliveryNote.value,
                postcode:
                  typeof address.postcode === "string"
                    ? parseInt(address.postcode)
                    : address.postcode,
              };

              if ("line1" in orderObject) {
                delete orderObject.line1;
              }
              if ("line2" in orderObject) {
                delete orderObject.line2;
              }
              if ("suburb" in orderObject) {
                delete orderObject.suburb;
              }
              if ("postCode" in orderObject) {
                delete orderObject.postCode;
              }
            }

            submitOrderObject(orderObject!);
          }
        });
      }
      return;
    }

    submitOrderObject(orderObject);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currentCart && currentCart?.cartItems && currentCart?.cartItems?.length > 0) {
      await handlePayment();
    } else {
      alert("Please add products to the cart first");
    }
  };

  const authWithPhoneHandler = async () => {
    if (phone) {
      updateSendingCodeToNewUser?.(true);

      try {
        const res = await authWithMethod("phone", phone);
        if (res.exists && "data" in res) {
          updateCustomer?.(res.data as UpdateCustomerProps);
          updateShowPhoneLogin?.(true);
        } else if (res.success) {
          updateMethod?.("phone");
          updateShowVerification?.(true);
        } else {
          updateShowPhoneError?.(res.message);
        }

        updateSendingCodeToNewUser?.(false);
      } catch { }
    }
  };

  const evaluatePayVisible = !!(
    ((email &&
      firstName &&
      lastName &&
      phone &&
      emailChecked &&
      isAddressValidated) ||
      user) &&
    currentCart?.cartItems?.[0]
  );

  useEffect(() => {
    if (localStorage.getItem("scEmail") && !emailHasChanged) {
      if (!userId) {
        updateCustomerDetailsAtOnce?.({
          email: localStorage.getItem("scEmail"),
        });
      }
    }
  }, [currentCart?.email]);

  useEffect(() => {
    const scEmail = localStorage.getItem("scEmail");
    if (!emailHasChanged && scEmail !== null && scEmail.length > 0) {
      setCurrentEmail(scEmail);
    }
  }, []);

  return (
    <>
      <section className={`container ${styles.section}`}>
        <form id="payment-form" onSubmit={handleSubmit}>
          <AllInputContainer
            onChangeHandler={onChangeHandler}
            updateDeliveryNote={updateDeliveryNote}
            setPhone={setPhone}
            isAddressValidated={!!isAddressValidated}
            setIsAddressValidated={setIsAddressValidated}
            localAddress={(localAddress ?? "") as LocalAddress}
            setLocalAddress={setLocalAddress}
            emailHasChanged={emailHasChanged}
            currentEmail={currentEmail}
          />
          <CartContainer
            evaluatePayVisible={evaluatePayVisible && !!showPayNow}
            processingPayment={processingPayment}
          />
          <PaymentContainer
            selectedPaymentMethod={selectedPaymentMethod}
            setSelectedPaymentMethod={setSelectedPaymentMethod}
            newPayment={newPayment}
            setNewPayment={setNewPayment}
            paymentMethods={
              paymentMethods || [
                {
                  accessToken: "",
                  cardType: "string",
                  cardExpiry: "string",
                  cardNumber: "string",
                  paypalEmail: "string",
                  isDefault: true,
                },
              ]
            }
            visible={evaluatePayVisible}
          />

          <PayTermsContainer
            evaluatePayVisible={evaluatePayVisible && !!showPayNow}
            processingPayment={processingPayment}
            className="show"
          />
        </form>
      </section>
      {paymentError && (
        <PhoneVerificationContainer
          alert={true}
          heading={
            paymentError.error === "No payment method is available."
              ? "add a payment method"
              : "verify phone number"
          }
          paragraph={[paymentError.error, " "]}
          setShowVerification={() => setPaymentError(null)}
          btn1={"verify"}
          btn1Handler={() => {
            setPaymentError(null);
            if (paymentError.error !== "No payment method is available.") {
              authWithPhoneHandler();
            }
          }}
        />
      )}
    </>
  );
};

export default Checkout;
