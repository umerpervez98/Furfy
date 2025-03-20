"use client";
import { useState } from "react";
import Image from "next/image";
import { useApp, CartItem as CartItemType } from "@/contexts/AppContext";
import styles from "./cart-item.module.scss";
import DeleteIcon from "../../../../../public/icons/icon-delete.svg";
import PlusIcon from "../../../../../public/icons/icon-plus.svg";
import MinusIcon from "../../../../../public/icons/icon-minus.svg";
import ConfirmationPopup from "../../confirmation-popup/confirmation-popup";

const CartItem = ({ accessToken, qty, name, imgUrl, setOverlay }: CartItemType) => {
  const { updateItem, resetCart, product } = useApp();

  const [showConfirmation, setShowConfirmation] = useState(false);

  const noConfirmationHandler = () => {
    setShowConfirmation(false);
    setOverlay(false);
  };

  const yesConfirmationHandler = () => {
    resetCart();
    setOverlay(false);
    setShowConfirmation(false);
  };
  const decreaseQuantity = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (qty === 1) {
      setShowConfirmation(true);
      setOverlay(true)
    } else {
      updateItem?.(accessToken, qty - 1)
    }
  }
  const increaseQuantity = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    updateItem?.(accessToken, qty + 1)
  }

  return (
    <li className={styles.li}>
      <div className="item-details">
        <Image className="furfy-image" src={imgUrl} alt={name} />
        <div className="item-info">
          <h3 className="uppercase">{name}</h3>
          <article className={styles.article}>
            <p>The world&apos;s best pet hair remover</p>
          </article>

          <div className={styles.cartItemBtnContainer}>
            <div className="cart-quantity-selector">
              {qty == 1 && (
                <button
                  onClick={decreaseQuantity}
                >
                  <Image src={DeleteIcon} alt="Delete" />
                </button>
              )}

              {qty > 1 && (
                <button
                  onClick={decreaseQuantity}
                  disabled={qty === 1}
                >
                  <Image src={MinusIcon} alt="Minus" />
                </button>
              )}
              <span>{qty || 0}</span>
              <button onClick={increaseQuantity}>
                <Image src={PlusIcon} alt="Plus" />
              </button>
            </div>
            <div>
              <span className="item-price ms-2">
                ${((product?.price || 0) * qty / 100).toFixed(2) || 0}
              </span>
            </div>
          </div>
        </div>
      </div>
      {showConfirmation && (
        <ConfirmationPopup
          text='Are you sure you want to remove this item?'
          noHandler={noConfirmationHandler}
          yesHandler={yesConfirmationHandler}
        />
      )}
    </li>
  );
};

export default CartItem;
