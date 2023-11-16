import React from "react";
import { Link } from "react-router-dom";

function HomeScreen() {
  return (
    <section className="s-hero" data-parallax="scroll" data-position-y="center">
      <div className="hero-left-bar"></div>

      <div className="row hero-content">
        <div className="column large-full hero-content__text">
          <h1>
            We Exist To <br />
            Honor God And <br />
            Make Disciples
          </h1>

          <div className="hero-content__buttons">
            <Link to="/event">
              <a className="btn btn--stroke shake-right">Upcoming Events</a>
            </Link>
            <a className="btn btn--stroke">About Us</a>
          </div>
        </div>
      </div>

      <ul className="hero-social">
        <li className="hero-social__title">Follow Us</li>
        <li>
          <a>Facebook</a>
        </li>
        <li>
          <a>YouTube</a>
        </li>
        <li>
          <a>Instagram</a>
        </li>
      </ul>

      <div className="hero-scroll">
        <a className="scroll-link smoothscroll"> Scroll For More </a>
      </div>
    </section>
  );
}

export default HomeScreen;
