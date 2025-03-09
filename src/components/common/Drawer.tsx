'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import '@/styles/common/drawer.css';
import { useCart } from '@/contexts/CartContext';
import Image from 'next/image';
import FurfyAustralia from '../../../public/images/furfy_australia.webp';
import { PriceContainer } from '../shared/index.shared';
interface DrawerProps {
  isOpen: boolean;
  onClose: () => void; // Function that takes no arguments and returns void
}

const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const { cartItems, updateItem, price } = useCart();

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
            <Image
              className="furfy-image"
              src={FurfyAustralia}
              alt={'Furfy'}
            />
            <div className="item-info">
              <h5>Furfy</h5>
              <p>The world&apos;s best pet hair remover</p>

              {/* Cart Selector */}
              <div className="d-flex justify-content-between align-items-center">
                <div className="cart-quantity-selector">
                  <button
                    onClick={() =>
                      cartItems?.[0]?.accessToken && updateItem?.(
                        cartItems?.[0]?.accessToken,
                        cartItems?.[0]?.qty - 1
                      )
                    }
                    disabled={cartItems?.[0]?.qty === 1}
                  >
                    -
                  </button>
                  <span>{cartItems?.[0]?.qty || 0}</span>
                  <button
                    onClick={() =>
                      cartItems?.[0]?.accessToken && updateItem?.(
                        cartItems?.[0]?.accessToken,
                        cartItems?.[0]?.qty + 1
                      )
                    }
                  >
                    +
                  </button>
                </div>
                <div>
                  <span className="item-price ms-2">${price || 0}</span>
                </div>
              </div>
            </div>
          </div>
          <PriceContainer />
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
