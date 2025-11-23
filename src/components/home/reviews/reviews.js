import React from "react";
import { Carousel, Container } from "react-bootstrap";
import reviews from "./reviewsData.json";
import "./reviews.css";

const ReviewCarousel = () => {
  return (
    <div className="grain-bg ch-100 grain-bg d-flex align-items-center">
      <Container className="text-center py-5 position-relative">
        {/* Title */}
        <div className="review-title fs-4">THEY SAY</div>

        {/* Carousel */}
        <Carousel indicators className="review-carousel" interval={60000}>
          {reviews.map((item, i) => (
            <Carousel.Item key={i} className="review-slide">
              <div className="h-100 d-flex align-items-center">
                <img src={item.image} alt="frog" className="froggy-bg" />

                <div>
                  <p className="review-quote text-center mx-auto">"{item.quote}"</p>

                  <p className="review-author mt-5 fs-1"> — {item.author}</p>
                </div>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>
    </div>
  );
};

export default ReviewCarousel;
