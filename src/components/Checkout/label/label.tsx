import styles from "./label.module.scss";

type LabelProps = React.ComponentProps<"label"> & {
  value?: string;
  extraStyles?: React.CSSProperties;
};

const Label = ({ children, htmlFor, value = "", extraStyles }: LabelProps) => {
  return (
    <label
      htmlFor={htmlFor}
      className={
        value
          ? children !== "mobile phone" ||
            (children === "mobile phone" && value.length > 3)
            ? `${styles.label} ${styles["label--animated"]}`
            : styles.label
          : styles.label
      }
      style={extraStyles}
    >
      {children}
    </label>
  );
};

export default Label;
