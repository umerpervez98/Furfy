import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import styles from "./phone-input-container.module.scss";

type PhoneInputContainerProps = {
  onBlurHandler: () => void;
  phoneInputHandler: (newPhone: string | undefined) => void;
  disabled: boolean;
  phone: string;
};

const PhoneInputContainer = ({
  onBlurHandler,
  phoneInputHandler,
  disabled,
  phone,
}: PhoneInputContainerProps) => {
  return (
    <PhoneInput
      required
      defaultCountry="au"
      disabled={disabled}
      value={phone}
      onChange={phoneInputHandler}
      onBlur={onBlurHandler}
      style={{}}
      className={`${styles["phone-input-container"]} ${phone && phone.length > 3 ? styles["phone-input-container--validated"] : ""
        } ${disabled ? styles["phone-input-container--disabled"] : ""}`}
      inputClassName={styles["phone-input"]}
    />
  );
};

export default PhoneInputContainer;
