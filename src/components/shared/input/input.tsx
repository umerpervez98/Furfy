import { useApp } from "@/contexts/AppContext";
import type { ChangeEvent } from "react";
import styles from "./input.module.scss";

type InputProps = Omit<React.ComponentPropsWithoutRef<"input">, "onChange"> &
  Omit<React.ComponentPropsWithoutRef<"select">, "onChange"> & {
    promoApplied?: null | { code: string };
    onChange: <
      T extends HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >(
      e: ChangeEvent<T>
    ) => void;
    ref?: React.RefObject<HTMLInputElement>;
  };

const Input = ({
  onChange,
  onBlur,
  onKeyDown,
  autoFocus,
  type,
  name,
  defaultValue,
  value,
  id,
  required,
  placeholder,
  style,
  children,
  promoApplied,
  disabled,
}: InputProps) => {
  const { userId } = useApp();

  if (type === "textarea") {
    return (
      <>
        <textarea
          disabled={disabled}
          name={name}
          required={required}
          placeholder={placeholder}
          id={id}
          value={value}
          className={styles["input-textarea"]}
          onChange={onChange<HTMLTextAreaElement>}
          style={style}
        />
      </>
    );
  }

  if (type === "select") {
    return (
      <>
        <select
          disabled={disabled}
          name={name}
          required={required}
          id={id}
          defaultValue={defaultValue}
          value={(typeof value === "string" && value) || ""}
          className={styles["input-select"]}
          onChange={onChange<HTMLSelectElement>}
          style={style}
        >
          {children}
        </select>
      </>
    );
  }

  return (
    <>
      <input
        autoFocus={autoFocus}
        disabled={disabled}
        type={type}
        name={name}
        required={required}
        value={(typeof value === "string" && value) || ""}
        className={`${styles["input-normal"]} ${styles.input}  ${promoApplied ? styles["input-promo--validated"] : ""
          }`}
        onChange={onChange<HTMLInputElement>}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        id={id}
        style={
          userId && name !== "promo" && name !== "subscribe-email"
            ? {
              backgroundColor: "rgba(255, 255, 255, 0.5)",
              ...style,
            }
            : style
        }
      />
    </>
  );
};

export default Input;
