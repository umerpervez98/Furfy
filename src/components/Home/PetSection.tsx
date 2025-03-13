import React from "react";

const PetSection = () => {
  return (
    <div className="page-width position-relative z-2">
      <div className="animals d-flex justify-content-evenly align-items-end flex-row page-width">
        <img
          src="/images/rabit.avif"
          alt="Rabbit"
          style={{ width: "17%", marginBottom: "7%" }}
        />
        <img
          src="/images/cat.webp"
          alt="Cat"
          style={{ width: "30%", marginBottom: "7%" }}
        />
        <img
          src="/images/dog.webp"
          alt="Dog"
          style={{ width: "50%" }}
        />
      </div>
    </div>
  );
};

export default PetSection;