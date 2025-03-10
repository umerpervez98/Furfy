"use client";
import Image from "next/image";
import { useCart, CartItem as CartItemType } from "@/contexts/CartContext";
import styles from "./cart-item.module.scss";

const CartItem = ({ accessToken, qty, price, name, imgUrl }: CartItemType) => {
  const { updateItem } = useCart();

  return (
    <li className={styles.li}>
      <div className="item-details">
        <Image className="furfy-image" src={imgUrl} alt={name} />
        <div className="item-info">
          <h3>{name}</h3>
          <article className={styles.article}>
            <p>The world&apos;s best pet hair remover</p>
          </article>

          <div className={styles.cartItemBtnContainer}>
            <div className="cart-quantity-selector">
              <button
                onClick={() => updateItem?.(accessToken, qty - 1)}
                disabled={qty === 1}
              >
                -
              </button>
              <span>{qty || 0}</span>
              <button onClick={() => updateItem?.(accessToken, qty + 1)}>
                +
              </button>
            </div>
            <div>

              <span className="item-price ms-2">${price || 0}</span>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
