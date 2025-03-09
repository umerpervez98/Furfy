import { FocusEvent, Dispatch, SetStateAction } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import styles from "./button-scatbags.module.scss";
import type { ChangeEvent } from "react";
import { useCart } from "@/contexts/CartContext";
import { validateQuantity } from "@/utils/cart-functions";

type ButtonScatbagsProps = {
  onChange: (value: number) => void;
  localQty: string;
  setLocalQty: Dispatch<SetStateAction<string>>;
};

const ButtonScatbags = ({
  onChange,
  localQty,
  setLocalQty,
}: ButtonScatbagsProps) => {
  const { updateQuantity } = useCart();

  const handleUpdate = (newQty: number) => {
    setLocalQty(`${newQty}`);
    onChange(newQty);
    updateQuantity(newQty);
  };

  const handleDecrement = async () => {
    const newQty = validateQuantity(+localQty - 1);
    handleUpdate(newQty);
  };

  const handleIncrement = async () => {
    const newQty = validateQuantity(+localQty + 1);
    handleUpdate(newQty);
  };

  const onBlurHandler = (e: FocusEvent<HTMLInputElement>) => {
    const newQty = validateQuantity(+e.target.value);
    handleUpdate(newQty);
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setLocalQty(e.target.value);
  };

  return (
    <div className={styles["button-scatbags"]}>
      <button type="button" onClick={handleDecrement}>
        <FaMinus />
      </button>
      <input
        type="text"
        value={localQty}
        onChange={onChangeHandler}
        onBlur={onBlurHandler}
      />
      <button type="button" onClick={handleIncrement}>
        <FaPlus />
      </button>
    </div>
  );
};

export default ButtonScatbags;
