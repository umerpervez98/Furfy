'use client';
import React, { Fragment } from 'react';
import { useRouter } from 'next/navigation';
import '@/styles/common/drawer.css';
import { useCart } from '@/contexts/CartContext';
import FurfyAustralia from '../../../public/images/furfy_australia.webp';
import { CartItem, PriceContainer } from '../shared/index.shared';
interface DrawerProps {
  isOpen: boolean;
  onClose: () => void; // Function that takes no arguments and returns void
}

const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const { cartItems } = useCart();

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
          <ul>
            {(cartItems && cartItems?.length > 0) ? (
              cartItems?.map((product) => {
                return (
                  <Fragment key={`cart-item-${product.id}`}>
                    <CartItem {...product} imgUrl={FurfyAustralia} />
                  </Fragment>
                );
              })
            ) : (
              <li key="cart-item-empty" >
                your cart is empty
              </li>
            )}

            <PriceContainer />
          </ul>
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
