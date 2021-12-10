import React from "react";
import { Card } from "react-bootstrap";

const Footer = () => {
  return (
    <Card className="footer-fix">
      <Card.Footer className="text-muted kritik-footer">
        &copy;{new Date().getFullYear()} PRIMKOPAL AAL
      </Card.Footer>
    </Card>
  );
};

export default Footer;
