import React from "react";
import { Container } from "react-bootstrap";

 const PetSection = () => {
  return (
    <Container className="page-width">
      <div className="d-flex justify-content-evenly align-items-end flex-row w-full">
        <img
          src="/images/rabit.avif"
          alt="Rabbit"
          style={{ width: "17%", marginBottom: "7%", paddingRight: "2%" }}
        />
        <img
          src="/images/cat.webp"
          alt="Cat"
          style={{ width: "30%", marginBottom: "7%" }}
        />
        <img
          src="/images/dog.webp"
          alt="Dog"
          style={{ width: "40%" }}
        />
      </div>
    </Container>
  );
};

export default PetSection;