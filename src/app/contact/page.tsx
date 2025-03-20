import { Container, Row, Col } from 'react-bootstrap';
import ContactForm from '@/components/Contact/ContactForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Furfy | Contact',
  description: 'Furfy Contact',
}

const Contact = () => {
  return (
    <>
      <Container className="page-width my-3">
        <h5 className="font-bold text-center uppercase mb-5">Contact Us</h5>
        <Row>
          <Col lg={7} className='order-sm-2  order-lg-1'>
            <div>
              <h5 className='font-semibold my-3'>CONTACT FORM</h5>
              <ContactForm />
            </div>
          </Col>
          <Col lg={5} className='order-sm-1 order-lg-2'>
            <div className='p-lg-3 my-4'>
              <h6 className='font-bold  my-5'>The best way to get in touch with us is to fill out the contact form. </h6>
              <h6>If your enquiry is regarding an order, please include your order number ie. FF1001</h6>
              <h6 className='my-5'>You can also contact us by chat, phone or email.</h6>
              <h6 className='my-5'>Email: <a href="mailto:hello@furfy.com" className="text-gray">hello@furfy.com</a></h6>
              <h6 className='my-5'>Phone (Australia): <a href="tel:+61279087483">+61 (2) 7908 7483</a></h6>
              <h6 className='my-5'>Phone (USA): <a href="tel:+18886643124">+1 (888) 664-3124</a></h6>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Contact;
