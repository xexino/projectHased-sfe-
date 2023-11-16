import React, { useEffect, useState } from "react";
import { Button, Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { PayPalButton } from "react-paypal-button-v2";
import { Link, useNavigate, useParams } from "react-router-dom";
import Message from "../components/Message";
import { getOrderDetails, payOrder } from "../actions/orderActions";
import { ORDER_CREATE_RESET } from "../constants/orderConstant";
import Loader from "../components/Loader";
import { ORDER_PAY_RESET } from "../constants/orderConstant";

function OrderScreen() {
  let { id } = useParams();
  console.log(id);
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, error, loading } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  console.log(orderPay);
  console.log(orderDetails);

  const history = useNavigate();
  const [sdkReady, setSdkReady] = useState(false);

  const dispatch = useDispatch();
  if (!loading && !error) {
    order.itemsPrice = order.orderItems
      .reduce((acc, item) => acc + item.price * item.qty, 0)
      .toFixed(2);
  }

  //CLIENT ID :
  //AaC1QHAkwq1_lwbiF-ph-B9nMzE28QUta3rnw1dGyT4nWpiZEja--DIH7grn3Q6sw0sBmcWVDWrPAuWt

  const addPayPalScript = () => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
      "https://www.paypal.com/sdk/js?client-id=AaC1QHAkwq1_lwbiF-ph-B9nMzE28QUta3rnw1dGyT4nWpiZEja--DIH7grn3Q6sw0sBmcWVDWrPAuWt";
    script.async = true;
    script.onload = () => {
      setSdkReady(true);
    };
    document.body.appendChild(script);
  };

  useEffect(() => {
    if (!order || successPay || order._id !== Number(id)) {
      dispatch({ type: ORDER_PAY_RESET });

      dispatch(getOrderDetails(id));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [order, id, dispatch, successPay]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(id, paymentResult));
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <section className="page-header page-header--events">
        <div className="gradient-overlay"></div>
        <div className="row page-header__content">
          <div className="column">
            <h1>Order : {order._id}</h1>
          </div>
        </div>
      </section>
      <section className="page-content">
        <div>
          <Row>
            <Col md={8}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2 className="mb-2">Payment Method :</h2>
                  <p className="mb-3">
                    <strong>Method: </strong>
                    {order.paymentMethod}
                  </p>
                </ListGroup.Item>
                <ListGroup.Item>
                  <p className="mb-3">
                    <strong>Name : </strong>
                    {order.user.name}
                  </p>
                  <p className="mb-3">
                    <strong>Email : </strong>
                    <a href={`mailto:${order.user.email}`}>
                      {" "}
                      {order.user.email}
                    </a>
                  </p>
                  {order.isPaid ? (
                    <Message variant="success">
                      Paid on {order.paidAt.substring(0, 10)}
                    </Message>
                  ) : (
                    <Message variant="warning">Not paid </Message>
                  )}
                </ListGroup.Item>

                <ListGroup.Item>
                  <h2 className="m-3">Order Items</h2>
                  {order.orderItems.length === 0 ? (
                    <Message variant="info">Your order is empty</Message>
                  ) : (
                    <ListGroup variant="flush">
                      {order.orderItems.map((item, index) => (
                        <ListGroup.Item key={index}>
                          <Row>
                            <Col md={1}>
                              <Image
                                src={item.image}
                                alt={item.name}
                                fluid
                                rounded
                              />
                            </Col>

                            <Col>
                              <Link to={`/event/${item.product}`}>
                                {item.name}
                              </Link>
                            </Col>

                            <Col md={4}>
                              {item.qty} X {item.price} Dh=
                              {(item.qty * item.price).toFixed(2)} Dh
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>

            <Col md={4} className="mt-0">
              <Card className="m-3">
                <ListGroup variant="flush" className="text-center">
                  <ListGroup.Item>
                    <h2>Order Summary</h2>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Items:</Col>
                      <Col>{order.itemsPrice} Dh</Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Total:</Col>
                      <Col>{order.itemsPrice} Dh</Col>
                    </Row>
                  </ListGroup.Item>
                  {!order.isPaid && (
                    <ListGroup.Item className="text-center">
                      {loadingPay && <Loader />}
                      {!sdkReady ? (
                        <Loader />
                      ) : (
                        <PayPalButton
                          amount={order.itemsPrice}
                          onSuccess={successPaymentHandler}
                        />
                      )}
                    </ListGroup.Item>
                  )}
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </div>
      </section>
    </>
  );
}

export default OrderScreen;
