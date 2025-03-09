"use client";
import { useCallback, useEffect, useState, type ChangeEvent } from "react";
import styles from "./phone-input-field.module.scss";
import FlagsSelect from "../flags-select/flags-select";
import { debounce } from "@/utils/debounce";

type PhoneInputFieldProps = {
  phone: string;
  country: string;
  disabled: boolean;
  onPhoneChange: (phone: string) => void;
  onCountryChange: (country: string) => void;
  validateHandler: () => void;
};

const PhoneInputField = ({
  phone,
  country = "AU",
  disabled,
  onPhoneChange,
  onCountryChange,
  validateHandler,
}: PhoneInputFieldProps) => {
  const [validate, setValidate] = useState(false);

  const debounceValidation = useCallback(
    debounce(() => {
      setValidate(true);
    }, 2000), // called after 2 seconds
    []
  );

  const onChangePhoneNumber = (e: ChangeEvent<HTMLInputElement>) => {
    const newPhone = e.target.value;
    onPhoneChange(newPhone);
    debounceValidation();
  };

  const onChangeCountry = (val: string) => {
    onPhoneChange("");
    onCountryChange(val);
  };

  useEffect(() => {
    if (validate) {
      setValidate(false);
      validateHandler();
    }
  }, [validate]);

  return (
    <>
      <div
        className={`${styles["phone-input-wrapper"]} ${
          phone && phone.length > 3
            ? styles["phone-input-wrapper--validated"]
            : ""
        } ${disabled ? styles["phone-input-wrapper--disabled"] : ""}`}
      >
        <FlagsSelect
          disabled={disabled}
          country={country}
          className={`${styles["flag-select"]}`}
          onChangeCountry={onChangeCountry}
        />
        <input
          disabled={disabled}
          value={phone}
          placeholder="Mobile Phone"
          className={`${styles["phone-input"]}`}
          onChange={onChangePhoneNumber}
        />
      </div>
    </>
  );
};

export default PhoneInputField;
