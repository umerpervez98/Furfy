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
      <Container className="my-3 page-width" >
        {/* Effective Section */}
        <Row>
          <div className="text-center pt-3 pb-5">
            <h4 className="rich-text__heading">FAST & EFFECTIVE</h4>
            <p className='rich-text'>
              You&apos;ve probably tried all types of pet hair and lint removal
              products from sticky roller tapes, to products that cannot be used
              time and time again. The furfy is the only pet hair removal device
              you will ever need, we guarantee it!
            </p>
          </div>
        </Row>
        {/* Simple to Use Section */}
        <Row className="my-5">
          <Col md={6}>
            <div className='p-3 video-container'>
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full"
                style={{ borderRadius: '39px', height: 'auto', marginRight: '20px' }}
                src="/images/simple-use.mp4"
              />
            </div>
          </Col>
          <Col md={6}>
            <div className="p-3 rich-text__container">
              <h4 className="rich-text__heading text-left">SIMPLE TO USE</h4>
              <h6 className="font-normal line-height-lg text-gray simple-use-text">
                By simply moving the pet hair roller back and forth, you
                immediately track and pick up cat and dog hair embedded deeply
                in all of your household furniture and fabric such as couches,
                beds, carpets, blankets, clothes and more.
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
          <Col sm={12} md={6}>
            <div className="text-center">
              <Image
                className="w-full h-full object-contain"
                style={{ borderRadius: '19px' }}
                src={FurfyInboxAustralia}
                alt="NO BATTERIES OR ADHESIVES REQUIRED"
              />
              <h3 className="text-lg font-bold py-5 mb-0">
                NO BATTERIES OR ADHESIVES REQUIRED
              </h3>
            </div>
          </Col>
          <Col sm={12} md={6}>
            <div className="text-center">
              <Image
                className="w-full h-full object-contain"
                style={{ borderRadius: '19px' }}
                src={FurfyAustralia}
                alt="ULTRA DURABLE ERGONOMIC DESIGN"
              />
              <h3 className="text-lg font-bold py-5 mb-0">
                ULTRA DURABLE ERGONOMIC DESIGN
              </h3>
            </div>
          </Col>
          <Col sm={12} md={6}>
            <div className="text-center">
              <Image
                className="w-full h-full object-contain"
                style={{ borderRadius: '19px' }}
                src={FurfyDetail}
                alt="PATENTED ELECTROSTATIC BRUSH"
              />
              <h3 className="text-lg font-bold py-5 mb-0">
                PATENTED ELECTROSTATIC BRUSH
              </h3>
            </div>
          </Col>
          <Col sm={12} md={6}>
            <div className="text-center">
              <Image
                className="w-full h-full object-contain"
                style={{ borderRadius: '19px' }}
                src={FurfyInboxAustralia}
                alt="NO FUSS NO MESS"
              />
              <h3 className="text-lg font-bold py-5 mb-0">NO FUSS NO MESS</h3>
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
        <Row className="my-5">
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
        <div className='page-width' style={{ marginBlock: '7rem!important', display: 'block' }}>
          <Row className="my-5 my-sm-5 icons-row">
            <Col xs={6} sm={6} md={3}>
              <div className="text-center icon-container">
                <p className="icon-text">
                  FAST, FREE DELIVERY IN AUSTRALIA & USA
                </p>
                <Image
                  className="icon-image"
                  src={IconFastDelivery}
                  alt="Bed"
                  style={{ marginBottom: '15px', height: '58px' }}
                />

              </div>
            </Col>
            <Col xs={6} sm={6} md={3}>
              <div className="text-center icon-container">
                <p className="icon-text">NO RISK, MONEY BACK GUARANTEE</p>
                <Image
                  className="icon-image"
                  src={IconMoneyBack}
                  alt="Shirt"
                  style={{ height: 100 }}
                />

              </div>
            </Col>
            <Col xs={6} sm={6} md={3}>
              <div className="text-center icon-container">
                <p className="icon-text">
                  THE CHAMPION OF PET HAIR REMOVERS
                </p>
                <Image
                  style={{ height: 98 }}
                  className="icon-image"
                  src={IconTrophy}
                  alt="Sofa"
                />

              </div>
            </Col>
            <Col xs={6} sm={6} md={3}>
              <div className="text-center icon-container">
                <p className="icon-text">AUSTRALIAN OWNED COMPANY</p>
                <Image
                  style={{ height: 88 }}
                  className="icon-image"
                  src={IconAustralia}
                  alt="Carpet"
                />
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
};

export default EffectiveSection;
