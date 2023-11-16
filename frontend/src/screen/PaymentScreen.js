import React, { useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { savePaymentMethod } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";
import FormContainer from "../components/FormContainer";

function PaymentScreen() {
  const history = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history("/placeolder");
  };
  return (
    <>
      <section className="page-header page-header--events">
        <div className="gradient-overlay"></div>
        <div className="row page-header__content">
          <div className="column">
            <h1>Payment</h1>
          </div>
        </div>
      </section>
      <section className="page-content">
        <FormContainer>
          <CheckoutSteps step1 step2 step3 />
          <Form onSubmit={submitHandler}>
            <Form.Group>
              <Form.Label as="legend">
                <h3 className="text-center">Select Method :</h3>
              </Form.Label>
              <Col>
                <div className="d-flex justify-content-center align-items-center">
                  <input
                    type="radio"
                    checked
                    className="m-2"
                    name="paymentMethod"
                    id="paypal"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <label htmlFor="paypal" className="m-2">
                    Paypal or Credit Card
                  </label>
                </div>
              </Col>
            </Form.Group>
            <div className="text-center">
              <Button type="submit" variant="primary" className="text-center">
                Continue
              </Button>
            </div>
          </Form>
        </FormContainer>
      </section>
    </>
  );
}

export default PaymentScreen;
