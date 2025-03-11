import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Pricing from '../common/Pricing';
import Table from '../common/Table';
import Testimonial from './Testimonial';
import { tableHeaders, tableData } from '../../utils/tableData';
import Image from 'next/image';

import FurfyInboxAustralia from '../../../public/images/furfyinbox_australia.webp';
import FurfyAustralia from '../../../public/images/furfy_australia.webp';
import FurfyDetail from '../../../public/images/furfy_detail.webp';
import FurfyProduct from '../../../public/images/furfy-product.webp';
import IconBed from '../../../public/icons/bed.svg';
import IconShirt from '../../../public/icons/shirt.svg';
import IconSofa from '../../../public/icons/sofa.svg';
import IconCarpet from '../../../public/icons/carpet.svg';
import IconFastDelivery from '../../../public/icons/fast_delivery.svg';
import IconMoneyBack from '../../../public/icons/moneyback.svg';
import IconTrophy from '../../../public/icons/trophy.svg';
import IconAustralia from '../../../public/icons/australia.svg';

const EffectiveSection = () => {

  return (
    <>
      <Container className="my-3 page-width">
        {/* Effective Section */}
        <Row>
          <div className="text-center pt-3 pb-4">
            <h4 className="font-bold">FAST & EFFECTIVE</h4>
            <h5 className='font-normal line-height-lg'>
              You&apos;ve probably tried all types of pet hair and lint removal
              products from sticky roller tapes, to products that cannot be used
              time and time again. The furfy is the only pet hair removal device
              you will ever need, we guarantee it!
            </h5>
          </div>
        </Row>
        {/* Simple to Use Section */}
        <Row className="my-5">
          <Col lg={6}>
            <div className='p-3'>
              <video
                autoPlay
                loop
                muted
                playsInline
                controls
                className="w-full"
                style={{ borderRadius: '39px', height: 'auto' }}
                src="/images/simple-use.mp4"
              />
            </div>
          </Col>
          <Col lg={6}>
            <div className="p-3">
              <h4 className="font-bold">SIMPLE TO USE</h4>
              <h6 className="font-normal line-height-lg text-gray simple-use-text">
                By simply moving the pet hair roller back<br />and forth, you
                immediately track and<br />pick up cat and dog hair embedded<br />deeply
                in all of your household furniture<br />and fabric such as couches,
                beds,<br />carpets, blankets, clothes and more.
              </h6>
              {/* Icons */}
              <div className="d-flex justify-content-around align-items-center py-3">
                <Image
                  className="pe-3"
                  src={IconBed}
                  alt="Bed"
                  width={70}
                  height={70}
                />
                <Image
                  className="pe-3"
                  src={IconShirt}
                  alt="Shirt"
                  width={60}
                  height={40}
                />
                <Image
                  className="pe-3"
                  src={IconSofa}
                  alt="Sofa"
                  width={70}
                  height={70}
                />
                <Image
                  className="pe-3"
                  src={IconCarpet}
                  alt="Carpet"
                  width={70}
                  height={70}
                />
              </div>
              <Pricing />
            </div>
          </Col>
        </Row>
        {/* Product Images */}
        <Row className="my-5">
          <Col sm={6}>
            <div className="text-center">
              <Image
                className="w-full h-full object-contain"
                style={{ borderRadius: '19px' }}
                src={FurfyInboxAustralia}
                alt="NO BATTERIES OR ADHESIVES REQUIRED"
              />
              <p className="text-md font-bold py-4">
                NO BATTERIES OR ADHESIVES REQUIRED
              </p>
            </div>
          </Col>
          <Col sm={6}>
            <div className="text-center">
              <Image
                className="w-full h-full object-contain"
                style={{ borderRadius: '19px' }}
                src={FurfyAustralia}
                alt="ULTRA DURABLE ERGONOMIC DESIGN"
              />
              <p className="text-md font-bold py-4">
                ULTRA DURABLE ERGONOMIC DESIGN
              </p>
            </div>
          </Col>
          <Col sm={6}>
            <div className="text-center">
              <Image
                className="w-full h-full object-contain"
                style={{ borderRadius: '19px' }}
                src={FurfyDetail}
                alt="PATENTED ELECTROSTATIC BRUSH"
              />
              <p className="text-md font-bold py-4">
                PATENTED ELECTROSTATIC BRUSH
              </p>
            </div>
          </Col>
          <Col sm={6}>
            <div className="text-center">
              <Image
                className="w-full h-full object-contain"
                style={{ borderRadius: '19px' }}
                src={FurfyInboxAustralia}
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
              <Image
                className="w-full h-full object-contain"
                style={{ borderRadius: '19px' }}
                src={FurfyProduct}
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
              <Image
                className="icon-image"
                src={IconFastDelivery}
                alt="Bed"
              />
              <p className="icon-text my-3">
                FAST, FREE DELIVERY IN AUSTRALIA & USA
              </p>
            </div>
          </Col>
          <Col xs={3} sm={3}>
            <div className="text-center">
              <Image
                className="icon-image"
                src={IconMoneyBack}
                alt="Shirt"
              />
              <p className="icon-text my-3">NO RISK, MONEY BACK GUARANTEE</p>
            </div>
          </Col>
          <Col xs={3} sm={3}>
            <div className="text-center">
              <Image className="icon-image" src={IconTrophy} alt="Sofa" />
              <p className="icon-text my-3">
                THE CHAMPION OF PET HAIR REMOVERS
              </p>
            </div>
          </Col>
          <Col xs={3} sm={3}>
            <div className="text-center">
              <Image
                className="icon-image"
                src={IconAustralia}
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
