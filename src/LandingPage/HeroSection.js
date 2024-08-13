import React from "react";
import { Container } from "react-bootstrap";

const HeroSection = () => {
  return (
    <Container className="roboto">
      <h1 className="display-2 p-5 mt-2 mb-3  text-center cursive-fonts">
        <span className="highlighted-blue-text">Next Solutions </span> solution
        to all the
        <br />
        <span className="medium-purple-color"> businesses </span>
      </h1>
      <div className="d-flex gap-2 pt-1 pb-3 mb-3 justify-content-center">
        <button className="btn-custom">Start Now - It's free </button>
        <button className="btn-custom-light">Schedule a demo</button>
      </div>
    </Container>
  );
};

export default HeroSection;
