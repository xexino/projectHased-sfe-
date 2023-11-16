import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Table, Button, Tab, Row, CarouselItem, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {
  deleteProduct,
  listProducts,
  createProduct,
} from "../actions/productActions";
import { PRODUCT_CREATE_RESET } from "../constants/productConstants";

function ProductListScreen() {
  let id = useParams();
  const dispatch = useDispatch();
  const history = useNavigate();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: succesCreate,
    product: createdProduct,
  } = productCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });

    if (!userInfo.isAdmin) {
      history(`/login`);
    }
    if (succesCreate) {
      history(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listProducts());
    }
  }, [dispatch, history, userInfo, successDelete, succesCreate, createdProduct]);

  const deletHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this product")) {
      dispatch(deleteProduct(id));
    }
  };

  const createProductHandler = () => {
    dispatch(createProduct())

    };
  return (
    <>
      <section className="page-header page-header--events">
        <div className="gradient-overlay"></div>
        <div className="row page-header__content">
          <div className="column">
            <h2>PRODUCT LIST</h2>
          </div>
        </div>
      </section>
      <section className="page-content">
        <div className="w-75 mx-auto">
          <Row className="align-items-center">
            <Col>
              <h1 className="m-3">PRODUTS : </h1>
            </Col>
            <Col className="text-right m-3">
              <Button className="my-3" onClick={createProductHandler}>
                <i className="fas fa-plus"></i> Create Product{" "}
              </Button>
            </Col>
          </Row>
          {loadingDelete && <Loader />}
          {errorDelete && <Message variant="danger">{errorDelete}</Message>}

          {loadingCreate && <Loader />}
          {errorCreate && <Message variant="danger">{errorCreate}</Message>}
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <Table striped bordered hover className="table-sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>PRICE</th>
                  <th>CATEGORY</th>
                  <th>localisation</th>
                  <th>DATE</th>
                  <th>stock</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td className="m-3">{product._id}</td>
                    <td>{product.name}</td>
                    <td>{product.price} Dh</td>
                    <td>{product.category}</td>
                    <td>{product.localisation}</td>
                    <td>{product.dateShow?.substring(0, 10)}</td>
                    <td>{product.countInStock}</td>
                    <td className="text-center">
                      <Link to={`/admin/product/${product._id}/edit`}>
                        <Button
                          variant="light"
                          className="bttnpers bg-secondary"
                        >
                          <i className="fas fa-edit"></i>
                        </Button>
                      </Link>
                      <Button
                        variant="danger"
                        className="bttnpers bg-danger"
                        onClick={() => deletHandler(product._id)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </div>
      </section>
    </>
  );
}

export default ProductListScreen;
