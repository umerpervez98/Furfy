import React, { FormEvent, ChangeEvent, Dispatch, SetStateAction } from "react";
import Image from "next/image";
import styles from "./open-popup.module.scss";
import { HeadingPrimary } from "@/components/shared/index.shared";
import { ExcedePixel } from "@/classes/excedeTrackingPixel";
import buttonClose from "../../../../../public/images/shared/btn-close.svg";
import clipboard from "../../../../../public/images/home/clipboard.svg";
import clipboardSaved from "../../../../../public/images/home/clipboard-saved.svg";
import { Spinner } from "@/components/Checkout/index.checkout";
import { copyToClipboard } from "@/utils/clipboard-functions";
import RecaptchaModal from "../recaptcha-modal/recaptcha-modal";

interface ReCaptcha {
  ready: (callback: () => void) => void;
  execute: (siteKey: string, options: { action: string }) => Promise<string>;
}

type OpenPopupProps = {
  updateCustomerDetails: (name: string, value?: string | object) => void;
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  formData: FormData;
  setFormData: Dispatch<SetStateAction<FormData>>;
  togglePopup: () => void;
  submitted: boolean;
  open: boolean;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  error: string;
  refresh: () => void;
  code: string;
  copied: boolean;
  setCopied: Dispatch<SetStateAction<boolean>>;
  recaptchaModalOpen: boolean;
  setRecaptchaModalOpen: Dispatch<SetStateAction<boolean>>;
  setRecaptchaToken: Dispatch<SetStateAction<string>>;
  onRecaptchaSuccess: () => void;
  onRecaptchaChallengeError: () => void;
  title: string;
  description: string;
  discount: number;
  discountType: string;
};

const OpenPopup = ({
  email,
  setEmail,
  setFormData,
  togglePopup,
  submitted,
  open,
  loading,
  setLoading,
  error,
  refresh,
  code,
  copied,
  setCopied,
  recaptchaModalOpen,
  setRecaptchaModalOpen,
  setRecaptchaToken,
  onRecaptchaSuccess,
  onRecaptchaChallengeError,
  title,
  description,
  discount,
  discountType,
}: OpenPopupProps) => {
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    setLoading(true);

    const emailFormData: FormData = new FormData(event.currentTarget);

    const grecaptcha = (window as unknown as { grecaptcha: ReCaptcha })
      .grecaptcha;
    const recaptchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_KEY;
    if (!recaptchaKey) throw new Error("Missing RECAPTCHA_KEY");

    const URL = `${process.env.NEXT_PUBLIC_HOST_SERVER_URL}api/public`;

    const ExcedeTrackingPixel = new ExcedePixel(URL);

    const ExcedeFormType = "popup";
    const ExcedeType = "discount";
    const ExcedeFormTitle = "Discount Request Form - 15% off first purchase";
    const ExcedeFormUrl = window.location.href;
    const ipAddress = await ExcedeTrackingPixel.GetUserIpAddress();
    const ExcedeSubmitterIP = ipAddress;
    const ExcedeProductSku = "SCATBAGS";


    grecaptcha.ready(function () {
      grecaptcha
        .execute(recaptchaKey, {
          action: ExcedeFormType,
        })
        .then(function (token: string) {
          setRecaptchaToken(token);
          emailFormData.append("form_submitter_ip", ExcedeSubmitterIP);
          emailFormData.append("type", ExcedeType);
          emailFormData.append("form_title", ExcedeFormTitle);
          emailFormData.append("form_url", ExcedeFormUrl);
          emailFormData.append("product_sku", ExcedeProductSku);
          setFormData(emailFormData);
        });
    });
  }

  function handleClick() {
    togglePopup();
  }

  const conatinerContents = () => {
    const sharedArgs = {
      type: submitted ? "text" : "email",
      name: submitted ? "discount" : "email",
      id: submitted ? "discount" : "email",
      value: submitted && code ? code : email,
    };

    const submittedArgs = {
      readOnly: true,
      className: styles["discount-input"],
    };

    const unsubmittedArgs = {
      placeholder: "enter your email",
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        refresh();
        setEmail(e.target.value);
      },
      className: error ? styles["input-error"] : "",
    };

    const determineArgs = submitted ? submittedArgs : unsubmittedArgs;

    const inputArgs = {
      ...sharedArgs,
      ...determineArgs,
    };

    return (
      <div className={styles["form-container"]}>
        {description && <p
          className={
            styles[
            `form-text${submitted ? "--submitted" : error ? "--error" : ""}`
            ]
          }
        >
          {description}
        </p>}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            refresh();
            setRecaptchaToken("");
            handleSubmit(e);
          }}
        >
          <>
            <div style={{ position: "relative", flex: 1 }}>
              <input {...inputArgs} />
              {submitted && (
                <button
                  type="button"
                  style={{
                    position: "absolute",
                    right: "3rem",
                    top: "50%",
                    transform: "translate(0px, -50%)",
                  }}
                  onClick={() => {
                    copyToClipboard(code);
                    setCopied(true);
                  }}
                >
                  <Image
                    src={copied ? clipboardSaved : clipboard}
                    alt="copy to clipboard"
                    width={25}
                  />
                </button>
              )}
            </div>

            {submitted ? (
              <p className={styles["expiry-text"]}>
                Code expires in 7 days from signup.
              </p>
            ) : (
              <button
                type="submit"
                className={styles["submit-button"]}
                disabled={
                  email.length <= 0 &&
                    !email
                      ?.toLowerCase()
                      .match(
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                      )
                    ? true
                    : false
                }
              >
                {loading ? <Spinner /> : `GET ${discount}${discountType === "PERCENTAGE" ? "%" : "$"} OFF`}
              </button>
            )}
          </>
        </form>

      </div>
    );
  };

  return (
    <section className={styles[`discount-popup${!open ? "--closed" : ""}`]}>
      <div
        className={styles["popup-open-background"]}
        onClick={handleClick}
        style={{ pointerEvents: recaptchaModalOpen ? "none" : "auto" }}
      />
      <section
        className={styles["popup-open"]}
        style={{ pointerEvents: recaptchaModalOpen ? "none" : "auto" }}
      >
        <button
          onClick={handleClick}
          className={`${styles["close-button"]} ${styles["close-button--large"]}`}
        >
          <Image
            src={buttonClose}
            alt="popup close button"
            width={40}
            priority
          />
        </button>

        <article className={styles.content}>
          <h1>HEY, DON&apos;T MISS OUT</h1>
          <HeadingPrimary size="large">{title}</HeadingPrimary>
        </article>
        {conatinerContents()}
      </section>
      {recaptchaModalOpen && (
        <RecaptchaModal
          onRecaptchaSuccess={onRecaptchaSuccess}
          onRecaptchaChallengeError={onRecaptchaChallengeError}
          setRecaptchaModalOpen={setRecaptchaModalOpen}
        />
      )}
    </section>
  );
};

export default OpenPopup;
