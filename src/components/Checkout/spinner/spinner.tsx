import styles from "./spinner.module.scss";

type SpinnerProps = {
  extraStyles?: React.CSSProperties;
};

const Spinner = ({ extraStyles }: SpinnerProps) => {
  return <span style={extraStyles} className={styles.span}></span>;
};

export default Spinner;
