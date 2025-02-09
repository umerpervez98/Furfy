import React from 'react'
import {Container, Row, Col} from 'react-bootstrap';
const Testimonial = () => {
  return (
    <>
      <Container className='page-width'>
        <Row className='my-3 my-lg-5'>
            <Col sm={6}>
                <div className='text-center mb-3 mb-md-5'>
                <h5 className='italic font-normal line-height-md'>“Super quick and easy. Much better than using my vacuum each time - which my dog is scared of!”</h5>
                <p className='my-3 font-bold text-md'>Melanie - BRONTE, NSW</p>
                </div>
            </Col>
            <Col sm={6}>
            <div className='text-center mb-3 mb-md-5'>
                <h5 className='italic font-normal line-height-md'>“I've had cheap imitations in the past, but nothing compares to the durability of the Furfy, love it!”</h5>
                <p className='my-3 font-bold text-md'>Richard - PERTH, WA</p>
                </div>
            </Col>
            <Col sm={6}>
                <div className='text-center mb-3 mb-md-5'>
                <h5 className='italic font-normal line-height-md'>It works great. I was pleasantly surprised. With each passing it removes a lot of hair, and it's very easy to remove the accumulated hair from the collection compartment. Highly recommended”</h5>
                <p className='my-3 font-bold text-md'>Talia - WELLINGTON, NZ</p>
                </div>
            </Col>
            <Col sm={6}>
            <div className='text-center mb-3 mb-md-5'>
                <h5 className='italic font-normal line-height-md'>“I couldn't be happier, this product saved me an unsalvageable chair, which now looks as good as new, with only two passes, I was able to remove hair stuck on the fabric so eaasily…”</h5>
                <p className='my-3 font-bold text-md'>Jordan - ST KILDA, VIC</p>
                </div>
            </Col>
            <Col sm={6}>
                <div className='text-center mb-3 mb-md-5'>
                <h5 className='italic font-normal line-height-md'>“Great value for money, and so easy to use. Having two Pomeranians that shed a lot of fur, the Furfy really helps to keep my furniture and clothes clean with no fuss. It's very quick and stress free.”</h5>
                <p className='my-3 font-bold text-md'>Claudia - PADDINGTON, QLD</p>
                </div>
            </Col>
            <Col sm={6}>
            <div className='text-center mb-3 mb-md-5'>
                <h5 className='italic font-normal line-height-md'>“I have two long haired ragdoll cats, bluey and charlie, who tend to leave hair everywhere, even after de-furminating! The Furfy is fantastic for removing cat hair from my upholstery, blankets, chairs, carpet and clothing. I don't know how I coped so long without it! Highly recommend”</h5>
                <p className='my-3 font-bold text-md'>Linda - DEAKIN, ACT</p>
                </div>
            </Col>
        </Row>
      </Container>
    </>
  )
}

export default Testimonial
