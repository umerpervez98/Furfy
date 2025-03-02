'use client'
import React, {useState,useEffect} from 'react';
import { useRouter } from 'next/navigation'
import '@/styles/common/drawer.css';
import { getCartDetails } from '@services/api';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void; // Function that takes no arguments and returns void
}

const Drawer: React.FC<DrawerProps> = ({isOpen, onClose}) => {
    
    const router = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const product = {
    image: '/images/furfy_australia.webp',
    name: 'Furfy',
    description: 'Planet friendly poo bags 60 bags per box Every 4 weeks',
    price: 18.9,
    shipping: 9.5,
    total: 19.4,
  };

  useEffect(() => {
    fetchCart();
  }, [isOpen]);

  const fetchCart = async () => {
    // const data = await getCartDetails();
    // console.log("data===>",data)
  };

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
              src={product.image}
              alt={product.name}
            />
            <div className="item-info">
              <h5>{product.name}</h5>
              <p>{product.description}</p>

              {/* Cart Selector */}
              <div className="d-flex justify-content-between align-items-center">
                <div className="cart-quantity-selector">
                  <button>-</button>
                  <span>1</span>
                  <button>+</button>
                </div>
                <div>
                  <img
                    className="object-contain"
                    width={20}
                    height={20}
                    src="/images/repeat.svg"
                    alt="repeat icons"
                  />
                  <span className="item-price ms-2">${product.price}</span>
                </div>
              </div>
            </div>
          </div>
          {/* Pricing Details */}
          <div className="checkout-details">
            <div className="d-flex justify-content-between align-items-center">
              <p className="text-md font-medium mb-1">SUBTOTAL:</p>
              <p className="text-md font-medium mb-1">${product.price}</p>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <p className="text-md font-medium mb-1">SHIPPING:</p>
              <p className="text-md font-medium mb-1">${product.shipping}</p>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <p className="text-lg font-bold mb-1">TOTAL:</p>
              <p className="text-lg font-bold mb-1">${product.total}</p>
            </div>
          </div>
          {/* Checkout Button */}
          <div className='pt-5'>
          <button onClick={()=> router.push('/checkout')} className="primary-button w-full">CHECKOUT NOW</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
