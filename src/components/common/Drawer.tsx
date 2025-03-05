'use client';
import React from 'react';
import {useRouter} from 'next/navigation';
import '@/styles/common/drawer.css';
import {useCart} from '@services/CartContext';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void; // Function that takes no arguments and returns void
}

const Drawer: React.FC<DrawerProps> = ({isOpen, onClose}) => {
  const router = useRouter();
  const {cart, updateItem} = useCart();

  if (!isOpen) {
    return null;
  }

  return (
    <div className="drawer-overlay">
      <div className="drawer">
        <div className="drawer-content">
          {/* Cart Header */}
          <div className="d-flex justify-content-between align-items-center">
            <h3 className="font-bold">Your Items</h3>
            <i className="fa-solid fa-xmark fa-2x" onClick={onClose}></i>
          </div>
          {/* Product Details */}
          <div className="item-details">
            <img
              className="furfy-image"
              src={'/images/furfy_australia.webp'}
              alt={'Furfy'}
            />
            <div className="item-info">
              <h5>Furfy</h5>
              <p>The world's best pet hair remover</p>

              {/* Cart Selector */}
              <div className="d-flex justify-content-between align-items-center">
                <div className="cart-quantity-selector">
                  <button
                    onClick={() =>
                      updateItem(
                        cart?.cartItems[0]?.accessToken,
                        cart.cartItems[0].qty - 1
                      )
                    }
                    disabled={cart?.cartItems[0]?.qty === 1}
                  >
                    -
                  </button>
                  <span>{cart?.cartItems[0]?.qty || 0}</span>
                  <button
                    onClick={() =>
                      updateItem(
                        cart?.cartItems[0]?.accessToken,
                        cart.cartItems[0].qty + 1
                      )
                    }
                  >
                    +
                  </button>
                </div>
                <div>
                  <img
                    className="object-contain"
                    width={20}
                    height={20}
                    src="/images/repeat.svg"
                    alt="repeat icons"
                  />
                  <span className="item-price ms-2">${cart.price || 0}</span>
                </div>
              </div>
            </div>
          </div>
          {/* Pricing Details */}
          <div className="checkout-details">
            <div className="d-flex justify-content-between align-items-center">
              <p className="text-md font-medium mb-1">SUBTOTAL:</p>
              <p className="text-md font-medium mb-1">${cart.subtotal || 0}</p>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <p className="text-md font-medium mb-1">SHIPPING:</p>
              <p className="text-md font-medium mb-1">
                ${cart.shippingFee || 0}
              </p>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <p className="text-lg font-bold mb-1">TOTAL:</p>
              <p className="text-lg font-bold mb-1">${cart.total || 0}</p>
            </div>
          </div>
          {/* Checkout Button */}
          <div className="pt-5">
            <button
              onClick={() => router.push('/checkout')}
              className="primary-button w-full"
            >
              CHECKOUT NOW
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
