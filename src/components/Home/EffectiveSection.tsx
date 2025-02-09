import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import Pricing from '../common/Pricing';
import Table from '../common/Table';
import Testimonial from './Testimonial';
import {tableHeaders, tableData} from '../../../utils/tableData';

const EffectiveSection = () => {
  return (
    <>
      <Container className="my-3 page-width">
        {/* Effective Section */}
        <Row>
          <div className="text-center py-3">
            <h4 className="font-bold">FAST & EFFECTIVE</h4>
            <h5 className='font-normal line-height-lg'>
              You've probably tried all types of pet hair and lint removal
              products from sticky roller tapes, to products that cannot be used
              time and time again. The furfy is the only pet hair removal device
              you will ever need, we guarantee it!
            </h5>
          </div>
        </Row>
        {/* Simple to Use Section */}
        <Row className="my-3">
          <Col lg={6}>
            <div className='p-3'>
            <video
              autoPlay
              loop
              muted
              playsInline
              controls
              className="w-full"
              style={{borderRadius: '39px', height: 'auto'}}
              src="/images/simple-use.mp4"
            />
            </div>
          </Col>
          <Col lg={6}>
            <div className="p-3">
              <h4 className="font-bold">SIMPLE TO USE</h4>
              <h6 className="font-normal line-height-lg text-gray">
                By simply moving the pet hair roller back and forth, you
                immediately track and pick up cat and dog hair embedded deeply
                in all of your household furniture and fabric such as couches,
                beds, carpets, blankets, clothes and more.
              </h6>
              {/* Icons */}
              <div className="d-flex justify-content-around aligns-items-center py-3">
                <img
                  className="pe-3"
                  src="/icons/bed.svg"
                  alt="Bed"
                  width={70}
                  height={70}
                />
                <img
                  className="pe-3"
                  src="/icons/shirt.svg"
                  alt="Shirt"
                  width={70}
                  height={70}
                />
                <img
                  className="pe-3"
                  src="/icons/sofa.svg"
                  alt="Sofa"
                  width={70}
                  height={70}
                />
                <img
                  className="pe-3"
                  src="/icons/carpet.svg"
                  alt="Carpet"
                  width={70}
                  height={70}
                />
              </div>
              {/* Pricing */}
              <Pricing />
            </div>
          </Col>
        </Row>
        {/* Product Images */}
        <Row className="my-3">
          <Col sm={6}>
            <div className="text-center">
              <img
                className="w-full h-full object-contain"
                style={{borderRadius: '19px'}}
                src="/images/furfyinbox_australia.webp"
                alt="NO BATTERIES OR ADHESIVES REQUIRED"
              />
              <p className="text-md font-bold py-4">
                NO BATTERIES OR ADHESIVES REQUIRED
              </p>
            </div>
          </Col>
          <Col sm={6}>
            <div className="text-center">
              <img
                className="w-full h-full object-contain"
                style={{borderRadius: '19px'}}
                src="/images/furfy_australia.webp"
                alt="ULTRA DURABLE ERGONOMIC DESIGN"
              />
              <p className="text-md font-bold py-4">
                ULTRA DURABLE ERGONOMIC DESIGN
              </p>
            </div>
          </Col>
          <Col sm={6}>
            <div className="text-center">
              <img
                className="w-full h-full object-contain"
                style={{borderRadius: '19px'}}
                src="/images/furfy_detail.webp"
                alt="PATENTED ELECTROSTATIC BRUSH"
              />
              <p className="text-md font-bold py-4">
                PATENTED ELECTROSTATIC BRUSH
              </p>
            </div>
          </Col>
          <Col sm={6}>
            <div className="text-center">
              <img
                className="w-full h-full object-contain"
                style={{borderRadius: '19px'}}
                src="/images/furfyinbox_australia.webp"
                alt="NO FUSS NO MESS"
              />
              <p className="text-md font-bold py-4">NO FUSS NO MESS</p>
            </div>
          </Col>
        </Row>
        {/* Table */}
        <Row className="my-3">
          <Col>
            <Table tableHeaders={tableHeaders} tableData={tableData} />
          </Col>
        </Row>
        {/* Pricing */}
        <Row className="my-sm-4 my-3">
          <Col md={2} lg={3}></Col>
          <Col md={8} lg={6}>
            <Pricing />
          </Col>
          <Col md={2} lg={3}></Col>
        </Row>
        {/* Testimonial */}
        <Testimonial />
        {/* Products Section */}
        <Row className="my-3">
          <Col sm={6}>
            <div className='py-4 py-lg-0'>
              <img
                className="w-full h-full object-contain"
                style={{borderRadius: '19px'}}
                src="/images/furfy-product.webp"
                alt="Furfy"
              />
            </div>
          </Col>
          <Col sm={6}>
            <Pricing />
          </Col>
        </Row>
        {/* Products Feature */}
        {/* Icons */}
        <Row className="my-3 my-sm-5">
          <Col xs={3} sm={3}>
            <div className="text-center">
              <img
                className="icon-image"
                src="/icons/fast_delivery.svg"
                alt="Bed"
              />
              <p className="icon-text my-3">
                FAST, FREE DELIVERY IN AUSTRALIA & USA
              </p>
            </div>
          </Col>
          <Col xs={3} sm={3}>
            <div className="text-center">
              <img
                className="icon-image"
                src="/icons/moneyback.svg"
                alt="Shirt"
              />
              <p className="icon-text my-3">NO RISK, MONEY BACK GUARANTEE</p>
            </div>
          </Col>
          <Col xs={3} sm={3}>
            <div className="text-center">
              <img className="icon-image" src="/icons/trophy.svg" alt="Sofa" />
              <p className="icon-text my-3">
                THE CHAMPION OF PET HAIR REMOVERS
              </p>
            </div>
          </Col>
          <Col xs={3} sm={3}>
            <div className="text-center">
              <img
                className="icon-image"
                src="/icons/australia.svg"
                alt="Carpet"
              />
              <p className="icon-text my-3">AUSTRALIAN OWNED COMPANY</p>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default EffectiveSection;
