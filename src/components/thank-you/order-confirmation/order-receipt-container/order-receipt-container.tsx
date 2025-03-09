import { useEffect, type ReactNode } from 'react';
import { useCart } from '@/contexts/CartContext';
import {
  GreenTick,
  RedCross,
} from '@/components/Checkout/index.checkout';
import {
  CartContainer,
  HeadingSecondary,
} from '@/components/shared/index.shared';
import {
  PaymentInfoBox,
  GoogleMapContainer,
  StatusBox,
} from '@/components/thank-you/index.thank-you';
import OrderInnerContainer from '../order-inner-container/order-inner-container';
import { formatPrice } from '@/utils/format-price';
import { covertUTCToLocalTime } from '@/utils/convert-utc-local-time';
import refundCardImg from '../../../../../public/images/thank-you/refund-card.svg';
import styles from './order-receipt-container.module.scss';
import innerContainerStyles from '../order-inner-container/order-inner-container.module.scss';
import { type TOrderConfirmation } from '@/types/index.types';

type OrderReceiptContainerProps = {
  orderConfirmation: TOrderConfirmation;
  pastOrderId?: string;
};

const OrderReceiptContainer = ({
  orderConfirmation,
  pastOrderId,
}: OrderReceiptContainerProps) => {


  const {
    id,
    dateCreated,
    amountBeforeDiscount,
    price,
    couponCode,
    firstName,
    lastName,
    phone,
    email,
    addressLine1,
    addressLine2,
    city,
    state,
    country,
    orderItems,
    paymentMethod,
    shippingFee,
    orderStatus,
    orderPaymentStatus,
    manualDiscounts,
    discountAmount,
    couponRedemption,
  } = orderConfirmation;

  const { orderPlaced, updateOrderPlaced } = useCart();

  const statusArr: { name: string;[key: string]: unknown }[] = [
    orderPaymentStatus,
    orderStatus,
  ];

  useEffect(() => {
    if (!orderPlaced) {
      updateOrderPlaced?.(true);
    }
  }, []);

  const localTimeString = covertUTCToLocalTime(dateCreated);

  const name = `${firstName} ${lastName}`;
  const localAddress = `${addressLine1} ${addressLine2} ${city} ${state} ${country}`;


  const orderQtyTotal = orderItems.reduce(
    (acc, item) => acc + item.qty,
    0
  );
  const orderPrice = orderItems.reduce(
    (acc, item) => acc + item.price,
    0
  );

  let heading = 'Thank you for your order!';
  let subHeading: string | ReactNode = (
    <>
      A confirmation has been sent to your email address.
      <br />
      You will receive tracking updates via email and text.
    </>
  );

  if (orderStatus.name === 'cancelled') {
    heading = 'Your order was cancelled.';
    subHeading = 'A confirmation has been sent to your email address.';
  } else if (
    orderPaymentStatus.name === 'refunded' ||
    orderPaymentStatus.name === 'partially-refunded'
  ) {
    heading = `You have been ${orderPaymentStatus.name.replace('-', ' ')}.`;
    subHeading =
      'Please note it can take up-to a week for the funds to appear in your nominated account.';
  } else if (pastOrderId) {
    heading = 'Your Order Receipt';
    subHeading = '';
  }

  return (
    <div className={styles.div}>
      <OrderInnerContainer className={'top-container'}>
        {orderStatus.name === 'cancelled' ? (
          <RedCross
            style={{
              position: 'absolute',
              top: '-2.5rem',
              left: '50%',
              fontSize: '3rem',
              color: '#fff',
              width: '5rem',
              height: '5rem',
              border: '3px solid #fff',
              transform: 'translateX(-50%)',
            }}
          />
        ) : (
          <GreenTick
            style={{
              position: 'absolute',
              top: '-2.5rem',
              left: '50%',
              fontSize: '9rem',
              width: '5rem',
              height: '5rem',
              border: '3px solid #fff',
              transform: 'translateX(-50%)',
              backgroundColor: '#000',
            }}
            imgSrc={
              orderPaymentStatus.name === 'refunded' ||
                orderPaymentStatus.name === 'partially-refunded'
                ? refundCardImg
                : ''
            }
          />
        )}
        <article>
          <h2 className={innerContainerStyles.heading}>{heading}</h2>
          <h3>{subHeading}</h3>
          <ul className={styles['top-inner-container']}>
            <li className={innerContainerStyles.order}>
              <h3>order number</h3>
              <HeadingSecondary>{id}</HeadingSecondary>
            </li>
            <li>
              <h3>order date</h3>
              <HeadingSecondary>{localTimeString}</HeadingSecondary>
            </li>
            <li className={innerContainerStyles.total}>
              <h3>order total</h3>
              <HeadingSecondary>
                {formatPrice(price + shippingFee)}
              </HeadingSecondary>
            </li>
          </ul>
        </article>
      </OrderInnerContainer>
      <div className={styles['middle-container']}>
        <article>
          <OrderInnerContainer heading="your details">
            <p className={styles.name}>{name}</p>
            <p className={styles.contact}>Phone: {phone}</p>
            <p className={styles.contact}>Email: {email}</p>
          </OrderInnerContainer>
          <OrderInnerContainer heading="delivery address">
            <p className={styles.address}>{localAddress}</p>
            <GoogleMapContainer address={localAddress} />
          </OrderInnerContainer>
        </article>
        <div>
          <OrderInnerContainer
            heading="your order"
            style={{ padding: '3.5rem', borderRadius: '7px 7px 0 0' }}
          >
            <div
              style={{
                height: '95%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <CartContainer
                price={amountBeforeDiscount}
                totalFromConfirmation={amountBeforeDiscount}
                couponCode={couponCode}
                orderReceiptCouponRedemption={couponRedemption}
                manualDiscounts={manualDiscounts}
                visible={false}
                aside={true}
                items={orderItems}
                confirmation={true}
                processingPayment={false}
                evaluatePayVisible={false}
                shippingFeeProp={shippingFee}
                isNewOrder={false}
                orderQtyTotal={orderQtyTotal}
                orderPrice={orderPrice}
                style={{
                  border: 'none',
                  padding: '0',
                  marginTop: '0',
                  marginBottom: '3rem',
                }}
                discountAmount={discountAmount || 0}
              />
              <StatusBox statusArr={statusArr} />
              <PaymentInfoBox {...paymentMethod} />
            </div>
          </OrderInnerContainer>
        </div>
      </div>
    </div>
  );
};

export default OrderReceiptContainer;
