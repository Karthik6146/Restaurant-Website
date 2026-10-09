import React from "react";
import { Link } from "react-router-dom";
import BookingForm from "../components/booking/BookingForm";
import LazyImage from "../components/common/LazyImage";

export default function Booking() {
  return (
    <div className="container">
      <div className="page-heading">
        <p className="eyebrow">Your next good evening</p>
        <h1>A seat at our table.</h1>
        <p>
          Choose your preferred date and time. Reservation requests are subject
          to availability and confirmation by our team.
        </p>
      </div>
      <div className="booking-grid">
        <aside className="booking-aside">
          <LazyImage
            src="/assets/images/web/pexels-kaboompics-6267.jpg"
            alt="A welcoming dining room with wooden tables"
          />
          <h2>Make yourself at home.</h2>
          <p>
            Planning a celebration or joining us with a larger group? Discover
            our private dining concept.
          </p>
          <Link className="text-link" to="/group-dining">
            Private dining ↗
          </Link>
          <p>
            Sample hours: Mon–Thu 11am–10pm, Fri–Sat 11am–11pm, Sunday 10am–9pm.
            All times are interpreted in your device's local time until a
            restaurant location is configured.
          </p>
        </aside>
        <BookingForm />
      </div>
    </div>
  );
}
