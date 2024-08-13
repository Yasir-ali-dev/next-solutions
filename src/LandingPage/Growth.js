import React from "react";
import "../index.css";

const Growth = () => {
  return (
    <div className="roboto">
      <h1 className="display-1 p-5 mt-2 mb-5  text-center cursive-fonts">
        Unleash <br />
        your <span className="light-purple-color"> growth potential</span>
      </h1>
      <div className="text-center d-flex flex-column justify-content-center align-items-center pt-5 ">
        <button
          className="btn-custom"
          style={{ width: "250px", padding: "10px 0" }}
        >
          Start now - It's free
        </button>
        <span style={{ color: "#3c49ff", fontSize: "3.5rem" }}>&#8593;</span>
      </div>
      <div className="text-center">
        <p className="text-secondary">
          No credit card required <br /> Instant access
        </p>
      </div>
    </div>
  );
};
export default Growth;
