import React from "react";
import { Container } from "react-bootstrap";
import "../index.css";
const Description = () => {
  return (
    <Container className="text-center py-5 roboto">
      <div style={{ fontSize: "1.125rem" }}>
        <h2 className="fs-3 fw-light mb-5 roboto">
          <strong>
            Imagine a vast collection of business apps at your disposal.
          </strong>{" "}
          Got something to improve? There is an app for that. No complexity, no
          cost, just a one-click install.
        </h2>
      </div>
      <div className="mb-5" style={{ fontSize: "1.125rem" }}>
        <p className="fs-3 fw-light py-2 roboto">
          Each app simplifies a process and empowers more people. Imagine the
          impact when everyone gets the right tool for the job, with perfect
          integration.
        </p>
      </div>
      <div className="d-flex mt-5 roboto">
        <div className="ms-auto p-3 bg-color" style={{ color: "white" }}>
          <h3 className="fs-5">
            If you simplify everything, you can do anything!
          </h3>
          <p className="text-left fs-6" style={{ color: "white" }}>
            - Bill McDermott, former CEO of SAP
          </p>
        </div>
      </div>
    </Container>
  );
};

export default Description;
