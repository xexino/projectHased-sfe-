import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
function ProductScreen() {
  const history = useNavigate();
  const [qty, setQty] = useState(1);
  let { id } = useParams();
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  let { loading, error, event } = productDetails;

  const date1 = new Date();
  const time = Date.parse(event.dateShow) - Date.parse(date1) < 900000;

  useEffect(() => {
    dispatch(listProductDetails(id));
  }, []);

  const addToCartt = () => {
    history(`/cart/${id}?qty=${qty}`);
  };
  const myStyle = {
    backgroundImage: `url(${event?.image2})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  return (
    <>
      <section
        className="page-header myStyle"
        style={myStyle}
        sizes="(max-width: 2000px) 100vw, 2000px"
      >
        <div className="gradient-overlay"></div>
        <div className="row page-header__content">
          <div className="column">
            <h1 className="tracking-in-expand">Upcoming Events</h1>
            <h2 className="text-pop-up-top">{event?.name}</h2>
          </div>
        </div>
      </section>
      {/* <section className="pag e-content"> */}
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Loader />
        </div>
      ) : error ? (
        <h3 style={{ color: "rgb(165, 42, 42)" }} className="text-center">
          <Message className={"alert alert-danger"}>{error}</Message>
        </h3>
      ) : (
        <>
          <div className="row contents">
            {/* <div className="column"> */}
            <div className="newdes">
              <div className="media-wrap event-thumb">
                <img
                  src={event?.image3}
                  width={1000}
                  height={1000}
                  // sizes="(max-width: 2000px) 100vw, 2000px"
                  alt={event.name}
                />
              </div>
              <div className="event-content">
                <div className="event-title">
                  <h2 className="display-1">{event?.name}</h2>
                </div>
                <p>{event?.description}</p>
                <ul className="event-meta">
                  <li>
                    <strong>Age</strong>7-12 Years Old
                  </li>
                  <li>
                    <strong>Cost</strong>
                    {event?.price} Dh
                  </li>
                  <li>
                    <strong>Date</strong>
                    {time ? "Deja" : "A venir"}
                  </li>
                  <li>
                    <strong>Time</strong>
                    {event?.dateShow}
                  </li>
                  <li>
                    <strong>Place</strong>
                    {event?.localisation}
                  </li>
                  <li>
                    <strong>Status</strong>
                    {event?.countInStock > 0 ? "in Stock" : "Out Of Stock"}
                  </li>
                  {event.countInStock > 0 && (
                    <li>
                      <strong>Quantity</strong>
                      <select
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                      >
                        {[...Array(event.countInStock).keys()].map((x) => (
                          <option value={x + 1} key={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </li>
                  )}
                </ul>
                <div>
                  <button
                    onClick={addToCartt}
                    className="btn12"
                    disabled={event.countInStock === 0 || time ? true : false}
                    type="button"
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* </section> */}
    </>
  );
}

export default ProductScreen;
