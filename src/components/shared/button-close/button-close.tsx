import Image from "next/image";
import { IoCloseOutline } from "react-icons/io5";
import type { CSSProperties } from "react";
import styles from "./button-close.module.scss";
import BtnClose from "../../../../public/images/shared/btn-close.svg";
type ButtonCloseProps = {
  special?: boolean;
  onClick: () => void;
  style?: CSSProperties;
};

const ButtonClose = ({ special, onClick, style }: ButtonCloseProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      style={style}
      className={
        special
          ? `${styles.button} ${styles["button--special"]}`
          : styles.button
      }
    >
      {special ? (
        <Image src={BtnClose} alt="Button close icon" />
      ) : (
        <IoCloseOutline />
      )}
    </button>
  );
};

export default ButtonClose;
