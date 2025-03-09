import type {
  MouseEvent,
  ReactNode,
  CSSProperties,
} from "react";
import styles from "./grey-overlay.module.scss";

type GreyOverlayProps = {
  onClick?:
  Function
  children?: ReactNode;
  style?: CSSProperties;
};

const GreyOverlay = ({ onClick, children, style }: GreyOverlayProps) => {
  const onClickHandler = (e: MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;

    if (onClick && target.classList[0]?.includes("overlay_section")) {
      onClick(false);
    }
  };

  return (
    <section style={style} className={styles.section} onClick={onClickHandler}>
      {children}
    </section>
  );
};

export default GreyOverlay;
