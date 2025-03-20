import React from 'react'
import CheckoutDetails from '@/components/Checkout/CheckoutDetails'
import SMSCodePending from '@/components/Checkout/sms-code-pending/sms-code-pending'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Furfy | Checkout',
  description: 'Furfy Checkout',
}

const Checkout = () => {
  return (
    <>
      <CheckoutDetails />
      <SMSCodePending />
    </>
  )
}

export default Checkout;
