import React from "react";
import { Link } from "react-router-dom";
import LazyImage from "../components/common/LazyImage";

export default function Specials() {
  return (
    <div className="container">
      <div className="page-heading">
        <p className="eyebrow">Make room for something special</p>
        <h1>A reason to gather.</h1>
        <p>
          Explore our dining concepts. Dates, pricing, and availability will be
          announced once the restaurant details are confirmed.
        </p>
      </div>
      <div className="events-grid">
        <article className="event-card">
          <LazyImage
            src="/assets/images/web/pexels-pixabay-262978.jpg"
            alt="Fresh small plates served by restaurant staff"
          />
          <div className="event-copy">
            <p className="eyebrow">Seasonal concept</p>
            <h3>The tasting experience</h3>
            <p>
              A multi-course menu inspired by what the season brings to the
              kitchen.
            </p>
          </div>
        </article>
        <article className="event-card">
          <LazyImage
            src="/assets/images/web/pexels-elevate-1269025.jpg"
            alt="Friends sharing drinks and a toast"
          />
          <div className="event-copy">
            <p className="eyebrow">Gathering concept</p>
            <h3>Good company, great pairings</h3>
            <p>
              An evening to explore complementary flavors and celebrate the
              table.
            </p>
          </div>
        </article>
      </div>
      <div className="centered-cta">
        <h2>Make it your occasion.</h2>
        <p>Explore the menu or learn about gathering with a larger group.</p>
        <Link className="button" to="/group-dining">
          Explore private dining ↗
        </Link>
      </div>
    </div>
  );
}
