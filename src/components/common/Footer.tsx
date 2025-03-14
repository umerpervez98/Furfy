import React from "react";
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
  return (
    <>
      <Container fluid className="footer-background py-5">
        <Row>
          <Col className="text-center">
            <img className=" w-full object-contain" src="/icons/footer-logo.svg" alt="Footer Logo" height={70} />
            <p className="text-white-50 text-lg mt-3">© 2025 Furfy</p>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Footer;