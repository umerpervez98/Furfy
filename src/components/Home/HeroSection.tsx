'use client';

import React, { useEffect, useState } from 'react';
import Script from 'next/script';
import { Container } from 'react-bootstrap'

const HeroSection = () => {
  const [customText, setCustomText] = useState('');
  const [customLocation, setCustomLocation] = useState('');

  useEffect(() => {
    const fixBannerHeight = () => {
      const container = document.getElementById('furfy-banner-container');
      if (container) {
        let properties = container.getBoundingClientRect();
        container.style.height = `${properties.width * 0.5625}px`;
      }
    };

    window.addEventListener('resize', fixBannerHeight);
    fixBannerHeight();

    // Dynamically load the banner script
    const script = document.createElement('script');
    script.src = '/furfybanner.js';
    script.type = 'text/javascript';
    script.async = true;
    document.body.appendChild(script);

    // Fetch IP Info
    setTimeout(() => {
      fetch('https://ipinfo.io')
        .then((res) => res.json())
        .then((response) => {
          console.log(response.city, response.country);
          if (response.timezone.includes('Asia')) {
            setCustomText('TEST');
          } else if (response.country === 'US') {
            setCustomText('FREE DELIVERY<br> IN THE US<br>');
            setCustomLocation('ATLANTA <br>WAREHOUSE<br>FAST DELIVERY<br>');
          } else if (response.country === 'AU') {
            setCustomText('FREE DELIVERY<br> IN AUSTRALIA<br>');
            setCustomLocation('SYDNEY <br>WAREHOUSE<br>FAST DELIVERY<br>');
          }
        })
        .catch((error) => console.log('Error fetching IP info:', error));
    }, 3000);

    return () => window.removeEventListener('resize', fixBannerHeight);
  }, []);

  return (
    <>
    <Container className='py-3 page-width'>
    <h5 className='text-center font-bold'>THE WORLD'S BEST PET HAIR REMOVER</h5>
    <div id="furfy-banner-container" className="furfybanner" style={{zIndex:1,height:'690.75px'}}>
      <div id="furfybanner6_hype_container" className="HYPE_document">
        <Script src="/furfybanner.js" strategy="afterInteractive" />
      </div>

      {/* Hidden SEO Content */}
      <div style={{ display: 'none' }} aria-hidden="true">
        <div>ORIGINAL PATENTED JAPANESE DESIGN</div>
        <div>FREE DELIVERY IN AUSTRALIA</div>
        <div>SYDNEY WAREHOUSE FAST DELIVERY</div>
        <div>NO HAIR ANYWHERE</div>
        <div>BE FUR-FREE WITH FURFY</div>
      </div>

      {/* Dynamic Content */}
      <div id="customTxt" dangerouslySetInnerHTML={{ __html: customText }} />
      <div id="customLoc" dangerouslySetInnerHTML={{ __html: customLocation }} />
    </div>
    </Container>
    </>
  );
};

export default HeroSection;
