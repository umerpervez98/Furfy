import React from 'react'
import { Container } from 'react-bootstrap'

const HeroSection = () => {
  return (
    <>
    <Container className='py-3 page-width'>
      <h5 className='text-center font-bold'>THE WORLD'S BEST PET HAIR REMOVER</h5>
      <img className='w-full h-full object-contain' src="/images/furonyellow.webp" alt="Banner" />
    </Container>
    </>
  )
}

export default HeroSection
