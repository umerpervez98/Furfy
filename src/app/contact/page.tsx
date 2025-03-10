import {Container, Row, Col} from 'react-bootstrap';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import ContactForm from '@/components/Contact/ContactForm';

const Contact = () => {
  return (
    <>
      <Header />
      <Container className="page-width my-3">
        <Row>
          <Col lg={7}>
            <div>
            <h5 className='font-semibold my-3'>CONTACT FORM</h5>
            <ContactForm />
            </div>
          </Col>
          <Col lg={5}>
            <div className='p-lg-3'>
            <h6 className='font-semibold  my-3'>The best way to get in touch with us is to fill out the contact form. </h6>
            <h6 className=''>If your enquiry is regarding an order, please include your order number ie. FF1001</h6>
            <h6 className='my-3'>You can also contact us by chat, phone or email.</h6>
            <h6 className='my-3'>Email: <a href="mailto:hello@furfy.com" className="text-gray">hello@furfy.com</a></h6>
            <h6 className='my-3'>Phone (Australia): <a href="tel:+61279087483">+61 (2) 7908 7483</a></h6>
            <h6 className='my-3'>Phone (USA): <a href="tel:+18886643124">+1 (888) 664-3124</a></h6>
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default Contact;
