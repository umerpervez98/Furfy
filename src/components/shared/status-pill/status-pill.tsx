import styles from "./status-pill.module.scss";

export type StatusPillProps = {
  text: string;
  color?: string;
  large?: boolean;
};

const StatusPill = ({ text, color, large }: StatusPillProps) => {
  let colorToUse = color || "green";

  if (text === "cancelled") {
    colorToUse = "pink";
  } else if (text === "refunded" || text === "partially-refunded" || text === "unfulfilled") {
    colorToUse = "yellow";
  }

  return (
    <span
      className={
        large
          ? `${styles["status-pill"]} ${styles[`status-pill--${colorToUse}`]} ${styles["status-pill--large"]}`
          : `${styles["status-pill"]} ${styles[`status-pill--${colorToUse}`]}`
      }
    >
      {text}
    </span>
  );
};

export default StatusPill;
