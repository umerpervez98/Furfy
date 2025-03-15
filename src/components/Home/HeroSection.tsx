'use client';

import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap'

const HeroSection = () => {
  const [customText, setCustomText] = useState('');
  const [customLocation, setCustomLocation] = useState('');

  useEffect(() => {
    const fixBannerHeight = () => {
      const container = document.getElementById('furfy-banner-container');
      if (container) {
        const properties = container.getBoundingClientRect();
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
      fetch('https://ipinfo.io/json')
        .then((res) => res.json())
        .then((response) => {
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

    return () => {
      console.log('script', document.body.contains(script));
      window.removeEventListener('resize', fixBannerHeight);
      document.body.removeChild(script);
      console.log('script', document.body.contains(script));
    }
  }, []);

  return (
    <>
      <Container className='py-1 page-width'>
        <h2 className='text-center font-bold hero-title'>THE WORLD&apos;S BEST PET HAIR REMOVER</h2>
        <div id="furfy-banner-container" className="furfybanner" style={{ zIndex: 1, height: '690.75px' }}>
          <div id="furfybanner6_hype_container" className="HYPE_document" />

          {/* Hidden SEO Content */}
          <div style={{ display: 'none' }} aria-hidden="true">
            <div>ORIGINAL PATENTED JAPANESE DESIGN</div>
            <div>{customText}</div>
            <div>{customLocation}</div>
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
