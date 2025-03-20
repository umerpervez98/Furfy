import React from 'react';
import styles from './closed-popup.module.scss';
import buttonClose from 'public/images/shared/btn-close.svg';
import Image from 'next/image';

type ClosedPopupProps = {
  toggleDiscount: () => void;
  togglePopup: () => void;
  value: number;
  type: string;
};

const ClosedPopup = ({
  toggleDiscount,
  togglePopup,
  value,
  type,
}: ClosedPopupProps) => {
  function handlePopup() {
    togglePopup();
  }
  function handleDiscount() {
    toggleDiscount();
  }

  function renderMessage() {
    if (type === 'PERCENTAGE') {
      return `${value}% off`;
    } else {
      return 'Open discount';
    }
  }

  return (
    <section className={styles['popup-closed']}>
      <button onClick={handleDiscount} className={styles['close-button']}>
        <Image src={buttonClose} alt="popup close button" width={20} priority />
      </button>
      <p onClick={handlePopup}>{renderMessage()}</p>
    </section>
  );
};

export default ClosedPopup;
