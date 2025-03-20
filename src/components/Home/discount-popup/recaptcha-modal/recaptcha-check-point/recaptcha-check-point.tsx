'use client';
import React, { useState, Dispatch, SetStateAction } from 'react';
import styles from './recaptcha-check-point.module.scss';
import ScatbagsPooLogo from 'public/images/shared/scatbags-poo';
import { HeadingSecondary } from '@/components/shared/index.shared';
import RotateIcon from 'public/images/shared/rotate-icon';

type RecaptchaCheckPointProps = {
  handleSuccess: () => void;
  handleError: () => void;
  handleClose: Dispatch<SetStateAction<boolean>>;
};

const randomDeg = () => {
  const value = Math.floor(Math.random() * 17);
  return value * 20 + 20;
};

const RecaptchaCheckPoint = ({
  handleSuccess,
  handleError,
  handleClose,
}: RecaptchaCheckPointProps) => {
  const [targetDeg] = useState(randomDeg);
  const [pointerDeg, setPointerDeg] = useState(0);

  function handleClick(action: string) {
    let newDeg: number = pointerDeg;
    if (action === '+') {
      newDeg += 20;
      if (newDeg === 360) {
        newDeg = 0;
      }
    }
    if (action === '-') {
      newDeg -= 20;
      if (newDeg === -20) {
        newDeg = 340;
      }
    }
    setPointerDeg(newDeg);
  }

  function handleSubmit() {
    if (pointerDeg === targetDeg) {
      handleSuccess();
    } else {
      handleError();
    }
    handleClose(false);
  }

  return (
    <div className={styles.container}>
      <HeadingSecondary size="small">Point to the poo</HeadingSecondary>
      <section
        className={`${styles.target} ${styles.swivel}`}
        style={{ transform: `rotate(${targetDeg}deg)` }}
      >
        <span style={{ transform: `rotate(-${targetDeg}deg)` }}>
          <ScatbagsPooLogo />
        </span>
      </section>
      <section
        className={`${styles.pointer} ${styles.swivel}`}
        style={{ transform: `rotate(${pointerDeg}deg)` }}
      >
        <span></span>
      </section>
      <aside className={styles.controls}>
        <button onClick={() => handleClick('-')}>
          <RotateIcon />
        </button>
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={() => handleClick('+')}>
          <RotateIcon />
        </button>
      </aside>
    </div>
  );
};

export default RecaptchaCheckPoint;
