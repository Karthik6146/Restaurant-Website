import React from "react";
import { Link } from "react-router-dom";

export default function Careers() {
  return (
    <div className="container">
      <div className="page-heading">
        <p className="eyebrow">People make the place</p>
        <h1>Bring your passion to the table.</h1>
        <p>
          Our vision is a team that cares about good food and thoughtful
          hospitality. Confirmed openings and application details will be listed
          here before launch.
        </p>
      </div>
      <div className="events-grid">
        <article className="info-card">
          <h2>In the dining room</h2>
          <p>
            Hosts, servers, and bar teams who make every welcome feel personal.
          </p>
          <p className="section-description">
            No open roles are currently advertised.
          </p>
        </article>
        <article className="info-card">
          <h2>In the kitchen</h2>
          <p>
            Chefs and kitchen teams who bring seasonal ingredients to life with
            skill and care.
          </p>
          <p className="section-description">
            No open roles are currently advertised.
          </p>
        </article>
      </div>
      <div className="centered-cta">
        <h2>Get to know our philosophy.</h2>
        <Link to="/about" className="button">
          Meet the Arevei concept ↗
        </Link>
      </div>
    </div>
  );
}
