import React from 'react';

const Pricing = () => {
  return (
    <>
      {/* Pricing */}
      <div className="py-4 text-center">
        <h5>
          <span className="line-through shadow-black-35">Rs.9,900.00 PKR</span>{' '}
          <span className="font-semibold ms-3">Rs.9,000.00 PKR</span>
        </h5>
      </div>
      {/* Review  */}
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
        <div className="quantity-selector">
          <button>-</button>
          <span>1</span>
          <button>+</button>
        </div>
        <button className="primary-button my-3">BUY NOW</button>
        <p className="text-center px-sm-5 py-sm-3 text-sm mb-0 font-normal uppercase">
          Free Shipping in Australia & USA LOW RATE SHIPPING TO OTHER COUNTRIES
          30-DAY MONEY-BACK GUARANTEE
        </p>
      </div>
    </>
  );
};

export default Pricing;
