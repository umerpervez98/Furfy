import { Container, Row, Col } from 'react-bootstrap';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import Image from 'next/image';
import { Metadata } from 'next';
import AboutImage from '../../../public/images/about.webp';

export const metadata: Metadata = {
  title: 'Furfy | About',
  description: 'Furfy About',
}

const About = () => {
  return (
    <>
      <Header />
      <Container className="page-width mb-4">
        <Row>
          <Col lg={2}></Col>
          <Col lg={8}>
            <div className='mb-5'>
              <h5 className="font-bold text-center uppercase mb-2">About Us</h5>
              <Image
                className="my-4 w-full h-full object-contain"
                style={{ borderRadius: '25px' }}
                src={AboutImage}
                alt="About Us Images"
              />
              <h5 className="font-meduim uppercase mt-5">About Us</h5>
              <p className="text-lg line-height-md">
                After a constant struggle with never-ending dog fur from my
                beloved Barney, and sick of cheaper imitation hair removal
                devices easily breaking or the need to regularly buy refills for
                them, we decided it was time to source the best and make it our
                own - the furfy!<br /><br />
              </p>
              <p className="text-lg line-height-md">
                This is not our first creation in the pet world. Back in 2013,
                Potty Plant Grass Dog Toilets was born, with a then 10-week-old
                Barney struggling to learn the ropes of toilet training in an
                apartment environment.<br /><br />
              </p>
              <p className="text-lg line-height-md">
                Puppy pads and fake grass simply didn&apos;t work. We then tried
                using real grass on the balcony and realised we were on to
                something. However, we needed a setup which was secure, mess
                free and easy to change for fresh grass. Then came, Australia&apos;s
                first real grass dog toilet and grass subscription service.
                Potty Plant has helped tens of thousands of dogs since then,
                young and old, become toilet trained and adapt to apartment
                living.<br /><br />
              </p>
              <p className="text-lg line-height-md">
                Five years later - Barney inspired another product to be
                launched - a new super supportive, easy to clean, premium
                quality, insta-worthy dog bed range. Barney Bed has now become
                Australia & USA&apos;s favourite dog bed. We&apos;re proud to hold a
                five-star rating on Google.<br /><br />
              </p>
              <p className="text-lg line-height-md">
                We can&apos;t wait for you to try our next product, furfy. We know you will love it, as pet fur becomes a thing of the past.<br /><br />
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
