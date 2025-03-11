import React from 'react';
import { Container } from 'react-bootstrap';

const JudgemeReviews = () => {
  const productId = process.env.NEXT_PUBLIC_JUDGE_ME_PRODUCT_ID;
  const productTitle = process.env.NEXT_PUBLIC_PRODUCT_NAME;

  return (
    <>
      <Container className="py-4 page-width review-section">
        <div
          className="jdgm-widget jdgm-review-widget jdgm-outside-widget"
          data-id={productId}
          data-product-title={productTitle}
        ></div>
      </Container>
    </>
  );
};

export default JudgemeReviews;