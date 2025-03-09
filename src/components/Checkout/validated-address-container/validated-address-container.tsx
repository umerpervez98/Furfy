import type { CSSProperties } from "react";
import {
  Label,
  ButtonSecondary,
  FormRow,
  GreenTick,
} from "@/components/Checkout/index.checkout";
import styles from "./validated-address-container.module.scss";
import FlagsSelect from "../flags-select/flags-select";

type ValidatedAddressContainerProps = {
  resetInput: () => void;
  input: string;
  label: string;
  buttonLabel?: string;
  error?: boolean;
  showBtn?: boolean;
  showVerifiedTick?: boolean;
  style?: CSSProperties;
  country?: string;
};

const ValidatedAddressContainer = ({
  resetInput,
  input,
  label,
  buttonLabel,
  error,
  showBtn = true,
  showVerifiedTick,
  style,
  country,
}: ValidatedAddressContainerProps) => {
  return (
    <>
      <FormRow
        style={label === "mobile phone" ? { marginTop: "0" } : {}}
        className={label === "mobile phone" ? styles["formRow-container"] : ""}
      >
        {label === "mobile phone" && (
          <FlagsSelect
            disabled={true}
            country={country || "AU"}
            className={`${styles["flag-select"]}`}
            onChangeCountry={() => { }}
          />
        )}
        <p
          className={`${styles["input-display"]} ${error ? `${styles["background-error"]}` : ""
            }`}
          style={style}
        >
          {input}
        </p>
        <Label htmlFor="input" value={"true"}>
          {label}
        </Label>
        {showVerifiedTick && (
          <GreenTick
            className="phone-verification-tick"
            style={{
              right: "15px",
              left: "auto",
              width: "2.7rem",
              height: "2.7rem",
              backgroundColor: "#000",
              transform: "translate(0, -50%)",
            }}
          />
        )}
      </FormRow>
      {showBtn && (
        <ButtonSecondary
          onClickHandler={resetInput}
          extraStyles={{ marginLeft: "auto", marginTop: "1rem" }}
        >
          {buttonLabel}
        </ButtonSecondary>
      )}
    </>
  );
};

export default ValidatedAddressContainer;
