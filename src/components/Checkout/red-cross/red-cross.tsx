import { FaTimes } from "react-icons/fa";
import styles from "./red-cross.module.scss";

type RedCrossProps = {
  className?: string;
  style?: React.CSSProperties;
};

const RedCross = ({ className, style }: RedCrossProps) => {
  return (
    <span
      className={
        className ? `${styles.span} ${styles[className]}` : styles.span
      }
      style={style}
    >
      <FaTimes />
    </span>
  );
};

export default RedCross;
