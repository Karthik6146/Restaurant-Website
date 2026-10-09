import React from "react";
import { Link } from "react-router-dom";

export default function GiftCards() {
  return (
    <div className="container">
      <div className="page-heading">
        <p className="eyebrow">Give a little togetherness</p>
        <h1>A delicious way to say thank you.</h1>
        <p>
          The gift of a shared meal. Our gift card service is planned for
          launch; purchases and payments are not available yet.
        </p>
      </div>
      <div className="events-grid">
        <article className="info-card">
          <p className="eyebrow">A thoughtful surprise</p>
          <h2>Digital gift cards</h2>
          <p>
            A future option for sending a dining experience with a personal
            message.
          </p>
          <button type="button" className="button" disabled>
            Coming soon
          </button>
        </article>
        <article className="info-card">
          <p className="eyebrow">Something to hold on to</p>
          <h2>Physical gift cards</h2>
          <p>
            A future option for a beautifully presented invitation to the table.
          </p>
          <button type="button" className="button" disabled>
            Coming soon
          </button>
        </article>
      </div>
      <div className="centered-cta">
        <h2>Find a little inspiration.</h2>
        <p>Get to know the food behind the experience.</p>
        <Link className="button" to="/menu">
          Explore the menu ↗
        </Link>
      </div>
    </div>
  );
}
