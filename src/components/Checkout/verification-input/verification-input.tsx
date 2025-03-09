"use client";

import { useEffect, useRef, useState } from "react";
import {
  Input,
  GreenTick,
  RedCross,
} from "@/components/Checkout/index.checkout";
import styles from "./verification-input.module.scss";

type VerificationInputProps = {
  authHandler: (code: string) => Promise<boolean | void>;
  setShowVerification: (value: boolean) => void;
};

const VerificationInput = ({
  authHandler,
  setShowVerification,
}: VerificationInputProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const onChangeHandler = async (value: string) => {
    if (value.length <= 4) {
      setCode(value);

      if (value.length === 4) {
        const result = await authHandler(value);

        if (result) {
          setError(false);
          setSuccess(true);
          setTimeout(() => {
            setShowVerification(false);
          }, 1000);
        } else {
          setCode("");
          setError(true);
          setSuccess(false);
        }
      }
    }
  };

  return (
    <div className={styles.div}>
      <Input
        autoFocus
        ref={inputRef as React.RefObject<HTMLInputElement>}
        type="text"
        name="code"
        value={code}
        required
        onChange={(e) => {
          if ("value" in e.target && typeof e.target.value === "string") {
            onChangeHandler(e.target.value);
          }
        }}
        style={{
          padding: "1.5rem 3.5rem",
          width: "20rem",
          letterSpacing: "8px",
          fontSize: "3.3rem",
          backgroundColor:
            code.length < 4 ? "#fff" : "rgba(255, 255, 255, 0.5)",
        }}
      />
      {success && (
        <GreenTick
          className="phone-verification-tick"
          style={{ color: "#FFF0B2" }}
        />
      )}
      {error && <RedCross className="phone-verification-tick" />}
      <div
        className={`${styles["placeholder-container"]} ${code ? styles["placeholder-container-hidden"] : ""
          }`}
      >
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

export default VerificationInput;
