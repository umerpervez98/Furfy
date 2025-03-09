'use client';

import { useState, useEffect } from 'react';
import { notFound, useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import { useGetOrdersQuery } from '@/utils/react-query-custom-hooks';
import ProcessingStepsContainer from './processing-steps-container/processing-steps-container';
import OrderReceiptContainer from './order-receipt-container/order-receipt-container';
import styles from './order-confirmation.module.scss';
import { SubmitState } from '@/types/index.types';

type OrderConfirmationProps = {
  pastOrderId?: string;
};

const OrderConfirmation = ({ pastOrderId }: OrderConfirmationProps) => {
  const [showReceipt, setShowReceipt] = useState(false);
  const [stepList, setStepList] = useState([
    { show: true, success: false, text: 'Connecting to Payment Provider' },
    { show: false, success: false, text: 'Processing your Payment' },
    {
      show: false,
      success: false,
      text: 'Payment Accepted',
      error: {
        title: 'Payment Issue',
        details: 'Your Bank Responded with:”Insufficient Funds”',
      },
    },
    { show: false, success: false, text: 'Scheduling Order Items' },
    { show: false, success: false, text: 'Success, please wait...' },
  ]);
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();
  const { order, orderPlaced, userId } = useCart();
  const { orderConfirmation, submitState, error } = order ?? {};
  const { orders, isPending } = useGetOrdersQuery(userId ?? '');

  let currentOrder;
  if (pastOrderId && userId) {
    currentOrder = orders?.filter(
      (order) => order.accessToken === pastOrderId
    )[0];

    if (!currentOrder && !isPending) {
      notFound();
    }
  }



  useEffect(() => {
    if (!pastOrderId) {
      const handleBackButton = () => {
        router.push('/checkout');
      };
      // Push a new state to the history stack so that the first back action triggers the handleBackButton
      window.history.pushState(null, '', window.location.href);
      window.addEventListener('popstate', handleBackButton);

      return () => {
        window.removeEventListener('popstate', handleBackButton);
      };
    }
  }, [router]);

  const resetProcess = () => {
    setStepList([
      { show: true, success: false, text: 'Connecting to Payment Provider' },
      { show: false, success: false, text: 'Processing your Payment' },
      {
        show: false,
        success: false,
        text: 'Payment Accepted',
      },
      { show: false, success: false, text: 'Scheduling Order Items' },
      { show: false, success: false, text: 'Success, please wait...' },
    ]);
    setCurrentStep(0);
  };

  useEffect(() => {
    if (!pastOrderId && !orderConfirmation && submitState !== 'processing') {
      router.push('/checkout');
      return;
    }
  }, []);

  return (
    <div className={`container ${styles.div}`}>
      <div className={styles.container}>
        {((!showReceipt && !orderPlaced && !pastOrderId) ||
          submitState === 'fail') && (
            <ProcessingStepsContainer
              error={error ?? null}
              submitState={submitState as SubmitState}
              resetProcess={resetProcess}
              setShowReceipt={setShowReceipt}
              stepList={stepList}
              setStepList={setStepList}
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
            />
          )}
        {((submitState === 'success' && showReceipt) ||
          orderPlaced ||
          pastOrderId) &&
          userId &&
          submitState !== 'fail' && (
            <>
              <OrderReceiptContainer
                pastOrderId={pastOrderId}
                orderConfirmation={
                  pastOrderId ? currentOrder : orderConfirmation
                }
              />
            </>
          )}
      </div>
    </div>
  );
};

export default OrderConfirmation;
