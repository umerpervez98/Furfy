import styles from "./button-secondary.module.scss";

type ButtonSecondaryProps = React.ComponentProps<"button"> & {
  onClickHandler: () => void;
  extraStyles?: React.CSSProperties;
};

const ButtonSecondary = ({
  children,
  type = "button",
  onClickHandler,
  extraStyles,
}: ButtonSecondaryProps) => {
  return (
    <button
      type={type}
      onClick={onClickHandler}
      style={extraStyles}
      className={styles.button}
    >
      {children}
    </button>
  );
};

export default ButtonSecondary;
