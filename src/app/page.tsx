import React from 'react';
import HeroSection from '@/components/Home/HeroSection';
import PetSection from '@/components/Home/PetSection';
import EffectiveSection from '@/components/Home/EffectiveSection';
import Description from '@/components/Home/Description';
import JudgemeReviews from '@/components/Home/JudgemeReviews';
import '@/styles/home/index.css'
import DiscountPopup from '@/components/Home/discount-popup/discount-popup';

const Home = async () => {
  return (
    <>
      <DiscountPopup />
      <HeroSection />
      <PetSection />
      <EffectiveSection />
      <Description />
      <JudgemeReviews />
    </>
  );
};

export default Home;
