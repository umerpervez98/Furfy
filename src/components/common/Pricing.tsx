'use client';

import React, { useState } from 'react';
import Drawer from '@/components/common/Drawer';
import { useCart } from '@/contexts/CartContext';

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
              ? (product.price * quantity).toLocaleString()
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
            -
          </button>
          <span>{quantity}</span>
          <button onClick={handleIncrement}>+</button>
        </div>

        {/* Buy Now Button */}
        <button className="primary-button my-3" onClick={handleBuyNow}>
          BUY NOW
        </button>

        <p className="text-center px-sm-5 py-sm-3 text-sm mb-0 font-normal uppercase">
          Free Shipping in Australia & USA LOW RATE SHIPPING TO OTHER COUNTRIES
          30-DAY MONEY-BACK GUARANTEE
        </p>
      </div>

      {/* Drawer */}
      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </>
  );
};

export default Pricing;
