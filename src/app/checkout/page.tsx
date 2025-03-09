import React from 'react'
import CheckoutDetails from '@/components/Checkout/CheckoutDetails'
import SMSCodePending from '@/components/Checkout/sms-code-pending/sms-code-pending'
import Header from '@/components/common/Header'
import { Metadata } from 'next';
import Footer from '@/components/common/Footer';

export const metadata: Metadata = {
  title: 'Furfy | Checkout',
  description: 'Furfy Checkout',
}

const Checkout = () => {
  return (
    <>
      <Header />
      <CheckoutDetails />
      <SMSCodePending />
      <Footer />
    </>
  )
}

export default Checkout;
