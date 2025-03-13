'use client';

import React, { useState } from 'react';
import Drawer from '@/components/common/Drawer';
import { useCart } from '@/contexts/CartContext';
import Minus from '../../../public/icons/icon-minus.svg';
import Plus from '../../../public/icons/icon-plus.svg';
import Image from 'next/image';

const Pricing = () => {
  const { product, addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev));

  const handleBuyNow = async () => {
    await addToCart?.(quantity);
    setIsDrawerOpen(true);
  };

  return (
    <>
      {/* Pricing */}
      <div className="py-4 text-center">
        <h5>
          <span className="font-semibold ms-3 price-text">
            $
            {product
              ? (product.price / 100 * quantity).toFixed(2)
              : '0.00'}
          </span>
        </h5>
      </div>

      {/* Review */}
      <div className="text-center review-container">
        <i className="fa fa-star"></i>
        <i className="fa fa-star"></i>
        <i className="fa fa-star"></i>
        <i className="fa fa-star"></i>
        <i className="fa fa-star"></i>
        <span className="font-normal ms-2 text-gray review-text">36 reviews</span>
      </div>

      {/* Buy Now */}
      <div className="py-3 d-flex justify-content-center align-items-center flex-column">
        {/* Quantity Selector */}
        <div className="quantity-selector">
          <button
            onClick={handleDecrement}
            disabled={quantity === 1}
          >
            <Image src={Minus} alt="Minus" />
          </button>
          <span>{quantity}</span>
          <button onClick={handleIncrement}>
            <Image src={Plus} alt="Plus" />
          </button>
        </div>

        {/* Buy Now Button */}
        <button className="primary-button my-3" onClick={handleBuyNow}>
          BUY NOW
        </button>

        <p className="text-center px-sm-5 py-sm-3 text-sm mb-0 font-normal uppercase">
          Free Shipping in Australia & USA<br /> LOW RATE SHIPPING TO OTHER COUNTRIES<br />
          30-DAY MONEY-BACK GUARANTEE
        </p>
      </div>

      {/* Drawer */}
      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </>
  );
};

export default Pricing;
