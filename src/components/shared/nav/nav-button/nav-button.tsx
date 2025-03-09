import styles from "./nav-button.module.scss";
import type { Dispatch, SetStateAction } from "react";

type NavButtonProps = {
  onClick: Dispatch<SetStateAction<boolean>>;
  currentState: boolean;
  style?: React.CSSProperties;
  className?: string;
};

const NavButton = ({
  onClick,
  currentState,
  style,
  className,
}: NavButtonProps) => {
  return (
    <button
      type="button"
      onClick={() => {
        if (className) {
          onClick(false);
        } else {
          onClick(true);
        }
      }}
      style={style}
      className={
        currentState
          ? `${styles.button} ${styles["btn-hidden"]}`
          : styles.button
      }
    >
      <span
        className={
          className
            ? `${styles[className]} ${styles["btn-nav-icon"]}`
            : styles["btn-nav-icon"]
        }
      ></span>
    </button>
  );
};

export default NavButton;
