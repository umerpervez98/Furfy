import type { ReactNode, CSSProperties } from 'react';
import styles from './heading-secondary.module.scss';

type HeadingSecondaryProps = {
  children: ReactNode;
  style?: CSSProperties;
  size?: string;
};

const HeadingSecondary = ({ children, style, size }: HeadingSecondaryProps) => {
  const validateSize = (sizeProp: string | undefined) => {
    if (sizeProp === 'large' || sizeProp === 'medium' || sizeProp === 'small') {
      return `--${sizeProp}`;
    } else {
      return '';
    }
  };

  return (
    <h2
      style={style}
      className={styles[`heading-secondary${validateSize(size)}`]}
    >
      {children}
    </h2>
  );
};

export default HeadingSecondary;
