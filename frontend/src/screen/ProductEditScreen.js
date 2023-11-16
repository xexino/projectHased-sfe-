import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { listProductDetails, updateProduct } from "../actions/productActions";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

function ProductEditScreen() {
  let id = useParams();

  let eventID = id.id;
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [localisation, setLocalisation] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [dateShow, setDateShow] = useState("");
  const [uploading, setUploading] = useState(false);

  const history = useNavigate();

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { error, loading, event } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    error: errorUpdate,
    loading: loadingUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history(`/admin/productlist`);
    } else {
      if (!event.name || event._id !== Number(eventID)) {
        dispatch(listProductDetails(eventID));
      } else {
        setName(event.name);
        setPrice(event.price);
        setImage1(event.image1);
        setImage2(event.image2);
        setImage3(event.image3);
        setCategory(event.category);
        setLocalisation(event.localisation);
        setCountInStock(event.countInStock);
        setDescription(event.description);
        setDateShow(event.dateShow);
      }
    }
  }, [event, eventID, history, dispatch, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: eventID,
        name,
        price,
        image1,
        image2,
        image3,
        category,
        countInStock,
        localisation,
        description,
        dateShow,
      })
    );
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();

    formData.append("image", file);
    formData.append("product_id", eventID);

    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post(
        "/api/products/upload/",
        formData,
        config
      );

      setImage1(data);
      setUploading(false);
    } catch (error) {
      setUploading(false);
    }
  };

  const uploadFileHandler2 = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();

    formData.append("image", file);
    formData.append("product_id", eventID);

    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post(
        "/api/products/upload/",
        formData,
        config
      );

      setImage2(data);
      setUploading(false);
    } catch (error) {
      setUploading(false);
    }
  };
  const uploadFileHandler3 = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();

    formData.append("image", file);
    formData.append("product_id", eventID);

    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post(
        "/api/products/upload/",
        formData,
        config
      );

      setImage3(data);
      setUploading(false);
    } catch (error) {
      setUploading(false);
    }
  };


  return (
    <>
      <section className="page-header page-header--events">
        <div className="gradient-overlay"></div>
        <div className="row page-header__content">
          <div className="column">
            {" "}
            <h1>Edit Product </h1>
          </div>
        </div>
      </section>
      <section className="page-content">
        <div>
          <Link to="/admin/productlist">
            <Button className="m-4">Go Back</Button>{" "}
          </Link>
          <FormContainer>
            <h1>Edit Product </h1>
            {loadingUpdate && <Loader />}
            {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}

            {loading ? (
              <Loader />
            ) : error ? (
              <Message variant="danger">{error} </Message>
            ) : (
              <Form onSubmit={submitHandler}>
                <Form.Group controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="price">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="localisation">
                  <Form.Label>localisation</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter localisation"
                    value={localisation}
                    onChange={(e) => setLocalisation(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="image">
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter image"
                    value={image1}
                    onChange={(e) => setImage1(e.target.value)}
                  ></Form.Control>
                  <input
                    type="file"
                    id="image-file"
                    onChange={uploadFileHandler}
                  />
                </Form.Group>

                <Form.Group controlId="image2">
                  <Form.Label>Image 2</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter image"
                    value={image2}
                    onChange={(e) => setImage2(e.target.value)}
                  ></Form.Control>
                  <input
                    type="file"
                    id="image-file"
                    onChange={uploadFileHandler2}
                  />
                </Form.Group>

                <Form.Group controlId="image3">
                  <Form.Label>Image 3</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter image"
                    value={image3}
                    onChange={(e) => setImage3(e.target.value)}
                  ></Form.Control>
                  <input
                    type="file"
                    id="image-file"
                    onChange={uploadFileHandler3}
                  />
                  {uploading && <Loader />}
                </Form.Group>

                <Form.Group controlId="category">
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="countinstock">
                  <Form.Label>Stock</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter Stock "
                    value={countInStock}
                    onChange={(e) => setCountInStock(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="Description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <div className="m-2">
                  <label htmlFor="dateshow">Date show:</label>
                  <input
                    type="date"
                    id="dateshow"
                    name="trip-start"
                    value={dateShow}
                    onChange={(e) => setDateShow(e.target.value)}
                    className="bg-secondary"
                  />
                </div>

                <Button type="submit" variant="primary" className="m-4">
                  Update
                </Button>
              </Form>
            )}
          </FormContainer>
        </div>
      </section>
    </>
  );
}

export default ProductEditScreen;
