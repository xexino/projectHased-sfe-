import React from "react";
import { Link } from "react-router-dom";

function Event({ event }) {
  return (
    <div className="column events-list__item">
      <Link to={`/event/${event._id}`}>
        <h3 className="display-1 events-list__item-title">
          <img src={event.image} className="image" alt={event.image} />
          <a >{event.name}</a>
        </h3>

        <p>{event.description.substring(0, 110)} ...</p>
      </Link>
      <ul className="events-list__meta">
        <li className="lis1"><i className="fa-solid fa-money-bill-1-wave"></i>{event.price} Dh</li>
        <li className="events-list__meta-date">{event.dateShow}</li>
        <li className="events-list__meta-location">{event.localisation}</li>
      </ul>
    </div>
  );
}

export default Event;
