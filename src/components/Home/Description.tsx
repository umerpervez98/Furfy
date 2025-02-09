import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';

const Description = () => {
  return (
    <>
      <Container fluid className="seconday-background py-3 py-lg-5">
        <Container className='page-width'>
          <Row >
            <Col sm={6}>
              <div>
                <h5 className="font-bold">Perfect for all pet hair</h5>
                <h6 className="mt-3 line-height-lg font-normal">
                  As much as we love our furry friends, we don’t love it when
                  they shed hair and fur all over the house, in our car or on
                  our clothes. The furfy has been designed to solve this
                  problem, making what is usually a difficult and slow task,
                  fast, efficient and extremely effective compared to any other
                  alternative. No matter the size of your fluffy friend, furfy
                  has you covered.
                </h6>
              </div>
              <div className="my-3">
                <h5 className="font-bold">
                  The world’s best pet hair remover
                </h5>
                <h6 className="mt-3 line-height-lg font-normal">
                  With its world wide patented electrostatic technology, there
                  is no other portable pet hair remover that comes close to the
                  quality of furfy. The electrostatic charge created by friction
                  attracts the unwanted hairs with ease. Simply roll furfy back
                  and forth in short strokes to trap the pet hair into the
                  chamber. Pet hair, lint, dust and dander can simply be removed
                  from the dust receptacle.
                </h6>
              </div>
              <div className="my-3">
                <h5 className="font-bold">
                  Fast, free delivery in Australia & USA
                </h5>
                <h6 className="mt-3 line-height-lg font-normal">
                  A lot of the time you buy something online, it either takes a
                  lot longer than expected or worse, it doesn't show up at all.
                  We have our own, dedicated warehouse in Sydney, Australia and
                  Atlanta, USA and we are fully stocked with furfys! Your order
                  is processed immediately and dispatched either the same or
                  next business day, so no extended waiting for your product.
                  Shipping is free within Australia & USA, with a low flat rate
                  to other countries.
                </h6>
              </div>
            </Col>
            <Col sm={6}>
              <div>
                <h5 className="font-bold">No Risk, Money Back Guarantee</h5>
                <h6 className="mt-3 line-height-lg font-normal">
                  If you’re not totally satisfied with the performance of furfy,
                  simply return your product (undamaged) to us within 30 days of
                  purchase and we will provide a full refund.
                </h6>
              </div>
              <div className="mt-3">
                <h5 className="font-bold">Good for the environment?</h5>
                <h6 className="mt-3 line-height-lg font-normal">
                  Let’s face it, it’s impossible to be totally environmentally
                  neutral, producing any product uses energy and potentially
                  creates waste. However, furfy is built to last and 100%
                  reusable so far less likely to end up in landfill. The furfy
                  also uses BPA-free plastic, making it safer for our pets and
                  their humans!
                </h6>
              </div>
              <div className="mt-3">
                <h5 className="font-bold">
                  No batteries or adhesives required
                </h5>
                <h6 className="mt-3 line-height-lg font-normal">
                  Unlike other pet hair removal products, the furfy is
                  completely self-contained, ready to go and reusable. The
                  furfy’s patented design uses an electrostatic charge generated
                  by the back and forth action and efficiently collects pet
                  hair. No power source, batteries, adhesives or sticky tape
                  required! The furfy is ready to use straight out of the box,
                  and there’s no need to replace any components.
                </h6>
              </div>
              <div className="mt-3">
                <h5 className="font-bold">Fast, simple and easy to clean</h5>
                <h6 className="mt-3 line-height-lg font-normal">
                  The furfy works on couches, carpet, beds, blankets, clothes
                  and more. Simply roll furfy back and forth in short strokes to
                  trap the pet hair into the chamber. Pet hair, lint, dust and
                  dander can simply be removed from the dust receptacle.
                </h6>
              </div>
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  );
};

export default Description;
