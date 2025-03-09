import Image from "next/image";
import { BsCheck } from "react-icons/bs";
import styles from "./green-tick.module.scss";

type GreenTickProps = {
  style?: React.CSSProperties;
  className?: string;
  imgSrc?: string;
};

const GreenTick = ({ style, className, imgSrc }: GreenTickProps) => {
  return (
    <span
      style={style}
      className={
        className ? `${styles[className]} ${styles.span}` : styles.span
      }
    >
      {imgSrc ? <Image src={imgSrc} alt="Receipt Icon" /> : <BsCheck />}
    </span>
  );
};

export default GreenTick;
