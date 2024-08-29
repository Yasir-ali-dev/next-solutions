import React from "react";
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";

const BackButton = ({ to }) => {
  return (
    <div className="py-2 mx-4">
      <Link
        to={`/${to}`}
        className="my-1 py-2 mt-2"
        style={{ textDecoration: "none" }}
      >
        <Image src="/hr/back-arrow.png" width="40px" />
      </Link>
    </div>
  );
};

export default BackButton;
