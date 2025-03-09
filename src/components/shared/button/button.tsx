"use client";

import type { HTMLProps } from "react";
import styles from "./button.module.scss";

type ButtonProps = HTMLProps<HTMLButtonElement> & {
  type?: "button" | "submit" | "reset";
  onClick?: (quantity?: number) => void | Promise<void> | ((weekToken?: string) => void);
  value?: number;
  isCurrentValue?: boolean;
  isLoading?: boolean;
};

const Button = ({
  type = "button",
  onClick,
  children,
  value,
  isCurrentValue,
  style,
  disabled,
  isLoading,
}: ButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      style={style}
      className={
        isCurrentValue ? `${styles.selected} ${styles.button}` : styles.button
      }
      onClick={
        onClick ? (value ? () => onClick(value) : () => onClick()) : () => {}
      }
    >
      {children}
    </button>
  );
};

export default Button;
