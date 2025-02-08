import React from 'react';
import Script from 'next/script';
import Head from 'next/head';
import { Work_Sans } from 'next/font/google';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/globals.css';

// Load Work Sans using Next.js font optimization
const workSans = Work_Sans({
  subsets: ['latin'],
  display: 'swap',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <Head>
        {/* Other metadata or scripts if needed */}
      </Head>
      <body className={workSans.className}>
        {/* Font Awesome Script */}
        <Script
          src="https://kit.fontawesome.com/10c5c1c14f.js"
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />
        {children}
      </body>
    </html>
  );
};

export default Layout;
