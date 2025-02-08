import React from 'react';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import HeroSection from '@/components/Home/HeroSection';
import PetSection from '@/components/Home/PetSection';
import EffectiveSection from '@/components/Home/EffectiveSection';
import Description from '@/components/Home/Description';
import ReviewSection from '@/components/Home/ReviewSection';
import '@/styles/home/index.css'

const Home = () => {
  return (
    <>
      <Header />
      <HeroSection />
      <PetSection />
      <EffectiveSection />
      <Description />
      <ReviewSection />
      <Footer />
    </>
  );
};

export default Home;
