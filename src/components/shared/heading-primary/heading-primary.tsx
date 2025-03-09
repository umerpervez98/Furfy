import type { ReactNode, CSSProperties } from 'react';
import styles from './heading-primary.module.scss';

type HeadingPrimaryProps = {
  children: ReactNode;
  style?: CSSProperties;
  size?: string;
};

const HeadingPrimary = ({ children, style, size = "large" }: HeadingPrimaryProps) => {
  const validateSize = (sizeProp: string) => {
    if (sizeProp === "large" || sizeProp === "medium" || sizeProp === "small") {
      return `--${sizeProp}`;
    } else {
      console.error(
        "HeadingSecondary component contains invalid size property."
      );
      return "";
    }
  };

  return <h2 style={style} className={styles[`heading-primary${size && validateSize(size)}`]}
  >{children}</h2>;
};

export default HeadingPrimary;
