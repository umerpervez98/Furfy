"use client";
import Image from "next/image";
import { useCart, CartItem as CartItemType } from "@/contexts/CartContext";
import styles from "./cart-item.module.scss";
import DeleteIcon from '../../../../../public/icons/icon-delete.svg';
import PlusIcon from '../../../../../public/icons/icon-plus.svg';
import MinusIcon from '../../../../../public/icons/icon-minus.svg';

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
              {qty == 1 && <button
                onClick={() => updateItem?.(accessToken, qty - 1)}
                disabled={qty === 1}
              >
                <Image src={DeleteIcon} alt="Delete" />
              </button>}

              {qty > 1 && <button
                onClick={() => updateItem?.(accessToken, qty - 1)}
                disabled={qty === 1}
              >
                <Image src={MinusIcon} alt="Minus" />
              </button>}
              <span>{qty || 0}</span>
              <button onClick={() => updateItem?.(accessToken, qty + 1)}>
                <Image src={PlusIcon} alt="Plus" />
              </button>
            </div>
            <div>

              <span className="item-price ms-2">${(price / 100).toFixed(2) || 0}</span>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
