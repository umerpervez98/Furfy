import Image from "next/image";
import styles from "./green-spinner.module.scss";
import BlackSpin from "../../../../public/images/checkout/black-spin.svg";
type GreenSpinnerProps = {
  extraStyles?: React.CSSProperties;
};

const GreenSpinner = ({ extraStyles }: GreenSpinnerProps) => {
  return (
    <Image
      src={BlackSpin}
      alt="Green Spinner"
      className={styles.spinner}
      style={extraStyles}
    />
  );
};

export default GreenSpinner;
