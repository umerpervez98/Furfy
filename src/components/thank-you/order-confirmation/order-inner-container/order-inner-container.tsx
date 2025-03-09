import { HeadingSecondary } from "@/components/shared/index.shared";
import { type CSSProperties } from "react";
import styles from "./order-inner-container.module.scss";

type OrderInnerContainerProps = {
  children: React.ReactNode;
  heading?: string;
  className?: string;
  style?: CSSProperties;
};

const OrderInnerContainer = ({
  children,
  heading,
  className,
  style,
}: OrderInnerContainerProps) => {
  return (
    <div
      className={className ? `${styles.div} ${styles[className]}` : styles.div}
      style={style}
    >
      <HeadingSecondary size="medium">{heading}</HeadingSecondary>
      {children}
    </div>
  );
};

export default OrderInnerContainer;
