import { Container, Row, Col } from 'react-bootstrap';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

const About = () => {
  return (
    <>
      <Header />
      <Container className="page-width">
        <Row>
          <Col lg={2}></Col>
          <Col lg={8}>
            <div>
              <h5 className="font-bold text-center">About Us</h5>
              <img
                className="my-3 w-full h-full object-contain"
                style={{ borderRadius: '25px' }}
                src="/images/about.webp"
                alt="About Us Images"
              />
              <h5 className="font-meduim uppercase mt-3">About Us</h5>
              <p className="text-lg line-height-md">
                After a constant struggle with never-ending dog fur from my
                beloved Barney, and sick of cheaper imitation hair removal
                devices easily breaking or the need to regularly buy refills for
                them, we decided it was time to source the best and make it our
                own - the furfy!
              </p>
              <p className="text-lg line-height-md">
                This is not our first creation in the pet world. Back in 2013,
                Potty Plant Grass Dog Toilets was born, with a then 10-week-old
                Barney struggling to learn the ropes of toilet training in an
                apartment environment.
              </p>
              <p className="text-lg line-height-md">
                Puppy pads and fake grass simply didn’t work. We then tried
                using real grass on the balcony and realised we were on to
                something. However, we needed a setup which was secure, mess
                free and easy to change for fresh grass. Then came, Australia’s
                first real grass dog toilet and grass subscription service.
                Potty Plant has helped tens of thousands of dogs since then,
                young and old, become toilet trained and adapt to apartment
                living.
              </p>
              <p className="text-lg line-height-md">
                Five years later - Barney inspired another product to be
                launched - a new super supportive, easy to clean, premium
                quality, insta-worthy dog bed range. Barney Bed has now become
                Australia & USA&apos;s favourite dog bed. We&apos;re proud to hold a
                five-star rating on Google.
              </p>
              <p className="text-lg line-height-md">
                We can&apos;t wait for you to try our next product, furfy. We know you will love it, as pet fur becomes a thing of the past.
              </p>
            </div>
          </Col>
          <Col lg={2}></Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default About;
