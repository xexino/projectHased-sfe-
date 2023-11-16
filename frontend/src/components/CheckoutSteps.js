import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

function CheckoutSteps({ step1, step2, step3 }) {
  return (
    <Nav className="justify-content-center mb-4">
      <Nav.Item>
        {step1 ? (
          <Link to="/login" className="m-5 text-secondary">Login</Link>
        ) : (
          <Link to="/login" aria-disabled className="m-5 text-secondary">
            Login
          </Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step2 ? (
          <Link to="/payment" className="m-5 text-secondary">Payment</Link>
        ) : (
          <Link to="/payment" aria-disabled className="m-5 text-secondary">
            Payment
          </Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step3 ? (
          <Link to="/placeorder" className="m-5 text-secondary">Place Order</Link>
        ) : (
          <Link to="/placeorder" aria-disabled className="m-5 text-secondary">
            Place Order
          </Link>
        )}
      </Nav.Item>
    </Nav>
  );
}

export default CheckoutSteps;
