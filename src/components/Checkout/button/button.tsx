import styles from "./button.module.scss";

type ButtonProps = React.ComponentProps<"button"> & {
  extraStyles?: React.CSSProperties;
  className?: string;
};

const Button = ({
  children,
  type = "button",
  disabled,
  extraStyles,
  className,
  onClick,
}: ButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled}
      style={{ ...extraStyles }}
      className={
        className ? `${styles[className]} ${styles.button}` : styles.button
      }
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
