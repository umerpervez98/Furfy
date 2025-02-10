import {Container, Row, Col} from 'react-bootstrap';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import FAQComponent from '@/components/Faq/FAQComponent';
import {faqs} from '../../../utils/faqsData';

const Faq = () => {
  return (
    <>
      <Header />
      <Container className="page-width">
        <Row>
        <Col lg={2}></Col>
          <Col lg={8}>
            <div>
              <h5 className="font-bold text-center">FREQUENTLY ASKED QUESTIONS</h5>
              <h6 className="font-bold">
                Answers to our most-asked questions are covered below. If you
                can’t find the answer you’re looking for, please contact us and
                we will happily assist.
              </h6>
            </div>
            <FAQComponent faqs={faqs} />
          </Col>
          <Col lg={2}></Col>
        </Row>
        
      </Container>
      <Footer />
    </>
  );
}

export default Faq;
