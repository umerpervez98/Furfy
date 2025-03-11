import React from 'react';
import Script from 'next/script';
import { Work_Sans } from 'next/font/google';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/globals.css';
import { CartProvider } from "@/contexts/CartContext";
import ReactQueryProvider from '@/contexts/react-query-context/react-query-context';
import type { Metadata } from 'next';

// Load Work Sans using Next.js font optimization
const workSans = Work_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: 'Furfy | Home',
  description: 'Furfy Home',
}

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">

      <body className={workSans.className}>
        {/* Font Awesome Script */}
        <Script
          src="https://kit.fontawesome.com/10c5c1c14f.js"
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />
        {/* Judge.me Script */}
        <Script
          id="judge-me-script"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              jdgm = window.jdgm || {};
              jdgm.SHOP_DOMAIN = 'furfypet.myshopify.com';
              jdgm.PLATFORM = 'shopify';
              jdgm.PUBLIC_TOKEN = 'PL3qbMzIVkxDDkszGFgb082N6wY';
            `,
          }}
        />
        <Script
          src="https://cdn.judge.me/widget_preloader.js"
          strategy="lazyOnload"
          data-cfasync="false"
        />
        {/* Wrap children with CartProvider */}
        <ReactQueryProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
};

export default Layout;
