'use client';

import { useState, type ChangeEvent, type FocusEvent } from "react";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import styles from "./btn-quantity-small.module.scss";

type BtnQuantitySmallProps = {
  id: string;
  quantity: number;
  prevHandler: () => void;
  nextHandler: () => void;
  onBlurHandler: (e: FocusEvent<HTMLInputElement>) => void;
};

const BtnQuantitySmall = ({
  id,
  quantity,
  prevHandler,
  nextHandler,
  onBlurHandler,
}: BtnQuantitySmallProps) => {
  const [localQty, setLocalQty] = useState<string | null>(null);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setLocalQty(e.target.value);
  };

  return (
    <div className={styles.div}>
      <button
        className={styles["qty-button"]}
        type="button"
        id={`button-minus-${id}`}
        aria-label={`button-minus-${id}`}
        onClick={prevHandler}
      >
        {quantity <= 1 ? <FaTrash /> : <FaMinus />}
      </button>
      <input
        type="text"
        name="quantity"
        id={id}
        value={localQty !== null ? localQty : quantity}
        onChange={onChangeHandler}
        onBlur={(e) => {
          onBlurHandler(e);
          setLocalQty(null);
        }}
      />
      <label
        htmlFor={id}
        className={styles["label-quantity"]}
        id={`label-${id}`}
      >
        quantity
      </label>
      <button
        className={styles["qty-button"]}
        type="button"
        id={`button-plus-${id}`}
        aria-label={`button-plus-${id}`}
        onClick={nextHandler}
      >
        <FaPlus />
      </button>
    </div>
  );
};

export default BtnQuantitySmall;
