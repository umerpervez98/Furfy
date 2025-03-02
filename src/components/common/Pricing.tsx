'use client';

import React, { useState, useEffect } from 'react';
import Drawer from '@/components/common/Drawer';
import { addToCart, getProduct,getCartDetails } from '@services/api';

type Product = {
  price: number;
  name: string;
  description: string;
  accessToken : string
};

const Pricing = () => {
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);

  // Fetch product on mount
  useEffect(() => {
    const fetchProduct = async () => {
      const { success, product, error } = await getProduct();
      if (!success) {
        console.error('Failed to fetch product:', error);
      } else {
        console.log('Fetched product:', product);
        setProduct(product);
      }
    };
    
    const getCart = async ()=>{
      await getCartDetails()
    }

    getCart()
    fetchProduct();
  }, []);

  // Update total price when product price or quantity changes
  useEffect(() => {
    // @ts-ignore
    if (product?.price) {
      // @ts-ignore
      setTotalPrice(product.price * quantity);
    }
  }, [product, quantity]);

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev));

  const handleBuyNow = async () => {
    try {
      await addToCart(quantity,product!.accessToken);
      setIsDrawerOpen(true);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    }
  };

  return (
    <>
      {/* Pricing */}
      <div className="py-4 text-center">
        <h5>
          <span className="line-through shadow-black-35">Rs.9,900.00$</span>{' '}
          <span className="font-semibold ms-3">
            ${totalPrice.toLocaleString()}
          </span>
        </h5>
      </div>

      {/* Review */}
      <div className="text-center">
        <i className="fa fa-star"></i>
        <i className="fa fa-star"></i>
        <i className="fa fa-star"></i>
        <i className="fa fa-star"></i>
        <i className="fa fa-star"></i>
        <span className="font-normal ms-2 text-gray">36 reviews</span>
      </div>

      {/* Buy Now */}
      <div className="py-3 d-flex justify-content-center align-items-center flex-column">
        {/* Quantity Selector */}
        <div className="quantity-selector">
          <button onClick={handleDecrement}>-</button>
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
