import React, { useEffect } from "react";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addTocart, removeFromCart } from "../actions/cartActions";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import Message from "../components/Message";

function CartScreen() {
  const history = useNavigate();
  let { id } = useParams();
  const qty = useLocation();
  const qtiy = qty.search ? Number(qty.search.split("=")[1]) : 1;
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (id) {
      dispatch(addTocart(id, qtiy));
    }
  }, [dispatch, id, qtiy]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };
  const checkoutHandler = () => {
    history(`/payment`);
  };
  return (
    <>
      <section className="page-header page-header--events">
        <div className="gradient-overlay"></div>
        <div className="row page-header__content">
          <div className="column"></div>
          <h2>Your Shooping Cart</h2>
        </div>
      </section>
      <section className="page-content">
        <ListGroup.Item>
          <Row>
            <Col md={8}>
              {cartItems.length === 0 ? (
                <Message>
                  Your Cart is empty <Link to="/">Go Back</Link>
                </Message>
              ) : (
                <ListGroup>
                  {cartItems.map((item) => (
                    <ListGroup.Item key={item.product}>
                      <Row>
                        <Col md={2} className="m-4">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col md={3}>
                          <Link to={`/event/${item.product}`}>{item.name}</Link>
                        </Col>
                        <Col md={2}>{item.price} DH</Col>
                        <Col md={2}>
                          <Form.Control
                            as="select"
                            value={item.qty}
                            onChange={(e) =>
                              dispatch(
                                addTocart(item.product, Number(e.target.value))
                              )
                            }
                          >
                            {[...Array(item.countInStock).keys()].map((x) => (
                              <option value={x + 1} key={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </Form.Control>
                        </Col>
                        <Col md={2}>
                          <Button
                            type="button"
                            variant="light"
                            onClick={() => removeFromCartHandler(item.product)}
                          >
                            <i className="fas fa-trash"></i>
                          </Button>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </Col>
            <Col md={4}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h2 className="m-3">
                      Subtotal (
                      {cartItems.reduce((acc, item) => acc + item.qty, 0)})
                      items
                    </h2>
                    {cartItems
                      .reduce((acc, item) => acc + item.qty * item.price, 0)
                      .toFixed(2)}{" "}
                    DH
                  </ListGroup.Item>
                </ListGroup>
                <ListGroup.Item>
                  <Button
                    type="button"
                    className="btn-block m-2"
                    disabled={cartItems.length === 0}
                    onClick={checkoutHandler}
                  >
                    PROCEED TO CHECKOUT
                  </Button>
                </ListGroup.Item>
              </Card>
            </Col>
          </Row>
        </ListGroup.Item>
      </section>
    </>
  );
}

export default CartScreen;
