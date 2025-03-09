import styles from "./paragraph.module.scss";

type ParagraphProps = {
  children?: React.ReactNode;
  extraStyles?: React.CSSProperties;
  className?: string;
};

const Paragraph = ({ children, extraStyles, className }: ParagraphProps) => {
  return (
    <p
      style={extraStyles}
      className={className ? `${styles.p} ${styles[className]}` : styles.p}
    >
      {children}
    </p>
  );
};

export default Paragraph;
