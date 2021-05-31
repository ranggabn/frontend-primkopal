import React from "react";
import { Card } from "react-bootstrap";

const Footer = () => {
  return (
    <Card className="text-center sticky-bottom mt-5">
      <Card.Footer className="text-muted">
        &copy;{new Date().getFullYear()} PRIMKOPAL AAL
      </Card.Footer>
    </Card>
  );
};

export default Footer;
