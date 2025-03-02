import React from 'react';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import HeroSection from '@/components/Home/HeroSection';
import PetSection from '@/components/Home/PetSection';
import EffectiveSection from '@/components/Home/EffectiveSection';
import Description from '@/components/Home/Description';
import JudgemeReviews from '@/components/Home/JudgemeReviews';
import '@/styles/home/index.css'

const Home = () => {
  return (
    <>
      <Header />
      <HeroSection />
      <PetSection />
      <EffectiveSection />
      <Description />
      <JudgemeReviews />
      <Footer />
    </>
  );
};

export default Home;
