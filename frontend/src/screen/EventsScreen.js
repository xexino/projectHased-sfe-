import React, { useState, useEffect } from "react";
import Event from "../components/Event";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

function EventsScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { error, loading, products } = productList;
  useEffect(() => {
    dispatch(listProducts());
  }, []);

  return (
    <>
      <section className="page-header page-header--events">
        <div className="gradient-overlay"></div>
        <div className="row page-header__content">
          <div className="column">
            <h1>Upcoming Events</h1>
          </div>
        </div>
      </section>
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
        <h3 style={{ color: "rgb(165, 42, 42)" }}>
          <Message danger={"alert alert-danger"}>{error}</Message>
        </h3>
      ) : (
        <section className="page-content">
          <div className="row wide block-large-1-2 block-900-full events-list">
            {products?.map((p) => (
              <Event event={p} key={p._id} />
            ))}
          </div>

          <div className="row">
            <div className="column large-full">
              <nav className="pgn">
                <ul>
                  <li>
                    <a className="pgn__prev">Prev</a>
                  </li>
                  <li>
                    <a className="pgn__num">1</a>
                  </li>
                  <li>
                    <span className="pgn__num current">2</span>
                  </li>
                  <li>
                    <a className="pgn__num">3</a>
                  </li>
                  <li>
                    <a className="pgn__num">4</a>
                  </li>
                  <li>
                    <a className="pgn__num">5</a>
                  </li>
                  <li>
                    <span className="pgn__num dots">…</span>
                  </li>
                  <li>
                    <a className="pgn__num">8</a>
                  </li>
                  <li>
                    <a className="pgn__nex6t">Next</a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default EventsScreen;
