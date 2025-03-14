"use client"
import React from 'react'
import { Container, Row } from 'react-bootstrap';
import TestimonialCard from './TestimonialCard';

const testimonials = [
  {
    text: "Super quick and easy. Much better than using my vacuum each time - which my dog is scared of!",
    author: "Melanie - BRONTE, NSW",
  },
  {
    text: "I&apos;ve had cheap imitations in the past, but nothing compares to the durability of the Furfy, love it!",
    author: "Richard - PERTH, WA",
  },
  {
    text: "It works great. I was pleasantly surprised. With each passing it removes a lot of hair, and it&apos;s very easy to remove the accumulated hair from the collection compartment. Highly recommended",
    author: "Talia - WELLINGTON, NZ",
  },
  {
    text: "I couldn&apos;t be happier, this product saved me an unsalvageable chair, which now looks as good as new, with only two passes, I was able to remove hair stuck on the fabric so eaasily…",
    author: "Jordan - ST KILDA, VIC",
  },
  {
    text: "Great value for money, and so easy to use. Having two Pomeranians that shed a lot of fur, the Furfy really helps to keep my furniture and clothes clean with no fuss. It&apos;s very quick and stress free.",
    author: "Claudia - PADDINGTON, QLD",
  },
  {
    text: "I have two long haired ragdoll cats, bluey and charlie, who tend to leave hair everywhere, even after de-furminating! The Furfy is fantastic for removing cat hair from my upholstery, blankets, chairs, carpet and clothing. I don&apos;t know how I coped so long without it! Highly recommend",
    author: "Linda - DEAKIN, ACT",
  }
];

const Testimonial = () => {
  return (
    <>
      <Container className='page-width'>
        <Row className='my-3 my-lg-5'>
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.author} testimonial={testimonial} />
          ))}
        </Row>
      </Container>
    </>
  )
}

export default Testimonial
