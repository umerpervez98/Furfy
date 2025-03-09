import React from 'react';
import { Container, Row, Col, ProgressBar } from 'react-bootstrap';
import { reviews, reviewsData } from '../../utils/reviewData';

const ReviewSection = () => {
  return (
    <>
      <Container className="py-4 page-width">
        <h5 className="text-center font-medium mb-4">Customer Reviews</h5>
        <Row>
          <Col lg={4}>
            <div className="d-flex justify-content-center flex-column align-items-center h-full py-3">
              <p className="mb-0">
                {[...Array(5)].map((_, i) => (
                  <i key={i} className="fa fa-star"></i>
                ))}
                <span className="text-md text-gray ps-2 mb-0">
                  4.81 out of 5
                </span>
              </p>
              <p className="mb-0 text-md text-gray">Based on 36 reviews</p>
              <p className="underline mb-0">collected by Judge.me</p>
            </div>
          </Col>
          <Col lg={4}>
            <div
              className="py-3"
              style={{
                borderLeft: '1px solid #3399991a',
                borderRight: '1px solid #3399991a',
                borderColor: '#0000001a',
              }}
            >
              {reviewsData.map(({ rating, frequency, percentage }) => (
                <div
                  key={rating}
                  className="d-flex justify-content-evenly align-items-baseline"
                >
                  <div>
                    {[...Array(5)].map((_, i) =>
                      i < rating ? (
                        <i key={i} className="fa fa-star text-sm"></i>
                      ) : (
                        <i key={i} className="fa-regular fa-star text-sm"></i>
                      )
                    )}
                  </div>
                  <div>
                    <ProgressBar
                      variant="dark"
                      style={{
                        width: 200,
                        borderRadius: 0,
                        background: '#F6D35C',
                        color: '#000',
                      }}
                      now={percentage}
                    />
                  </div>
                  <div>
                    <p className="shadow-black-35 text-xs mb-0">{frequency}</p>
                  </div>
                </div>
              ))}
              <p className="mb-0 text-sm underline text-center">
                See All the reviews
              </p>
            </div>
          </Col>
          <Col lg={4}>
            <div className="d-flex justify-content-center flex-column align-items-center h-full py-3">
              <button className="seconday-button">Write a Review</button>
            </div>
          </Col>
        </Row>
        <hr className="my-4 border-black" />
        {/* Recent Filter */}
        <div className="flex items-center">
          <select className="text-sm bg-transparent border-0 outline-none cursor-pointer">
            <option value="most_recent">Most Recent</option>
            <option value="highest_rating">Highest Rating</option>
            <option value="lowest_rating">Lowest Rating</option>
          </select>
        </div>
        <hr className="my-4 border-black" />
        {/* Review Comments */}
        <div>
          {reviews.map((review, index) => (
            <div key={index}>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <i key={i} className="fa fa-star text-sm"></i>
                ))}
              </div>
              <div className="d-flex justify-content-between align-items-center mt-2">
                <div>
                  <i className="fa fa-user me-2"></i>
                  <span className="text-lg">{review.name}</span>
                  <span className="ms-2 bg-black text-white text-xs line-height-xs p-1">
                    Verified
                  </span>
                </div>
                <div>
                  <p className="shadow-black-35 text-sm">{review.date}</p>
                </div>
              </div>
              {review.title && (
                <p className="font-bold mt-2 text-gray">{review.title}</p>
              )}
              <p className="mt-2 text-gray">{review.review}</p>
              {review.reply && (
                <div className="light-yellow text-gray p-3 mt-4">
                  <strong>Furfy</strong> replied:
                  <p>{review.reply}</p>
                </div>
              )}
              <hr className="my-4 border-black" />
            </div>
          ))}
        </div>
        {/* Pagination */}
        <div className="text-center">
          <i className="fa-solid fa-backward text-gray pe-2"></i>
          <i className="fa-solid fa-chevron-left text-gray pe-2"></i>
          <span className="pe-2">1</span>
          <span className="pe-2 text-gray">2</span>
          <span className="pe-2 text-gray">3</span>
          <i className="fa-solid fa-chevron-right text-gray pe-2"></i>
          <i className="fa-solid fa-forward text-gray"></i>
        </div>
      </Container>
    </>
  );
};

export default ReviewSection;
