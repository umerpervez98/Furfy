import styles from "./form-row.module.scss";

type FormRowProps = {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
};

const FormRow = ({ children, style, className }: FormRowProps) => {
  return (
    <div
      style={style}
      className={`form-row ${styles.div} ${className && className?.length > 0 ? className : ""}`}
    >
      {children}
    </div>
  );
};

export default FormRow;
