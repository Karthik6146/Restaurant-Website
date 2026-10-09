import React from "react";
import { Link } from "react-router-dom";
import LazyImage from "../components/common/LazyImage";

export default function About() {
  return (
    <div className="container">
      <div className="page-heading">
        <p className="eyebrow">The spirit of Arevei</p>
        <h1>Good food brings us together.</h1>
        <p>
          A restaurant concept built around seasonal cooking, thoughtful
          service, and the joy of a shared table.
        </p>
      </div>
      <LazyImage
        className="wide-image"
        src="/assets/images/web/pexels-reneterp-2544829.jpg"
        alt="A chef at work in an open restaurant kitchen"
      />
      <section className="section story-grid">
        <div className="story-copy">
          <p className="eyebrow">Our philosophy</p>
          <h2>
            A little care.
            <br />A lot of heart.
          </h2>
        </div>
        <div className="story-copy">
          <p>
            Food is how we connect. Our vision for Arevei starts with good
            ingredients and gives them room to shine, with menus that reflect
            the season and plates that invite you to explore.
          </p>
          <p>
            We imagine a welcoming dining room where lunch can linger, dinner
            becomes an occasion, and everyone feels at home. This website
            presents that concept through sample dishes and illustrative
            photography.
          </p>
          <Link className="text-link" to="/menu">
            Discover the menu ↗
          </Link>
        </div>
      </section>
      <div className="info-grid">
        {[
          [
            "Seasonal inspiration",
            "Letting the season guide what goes on the plate.",
          ],
          [
            "Thoughtful hospitality",
            "Taking time to listen, welcome, and make people comfortable.",
          ],
          [
            "Shared moments",
            "Creating space for conversation, connection, and celebration.",
          ],
        ].map(([title, text]) => (
          <article className="info-card" key={title}>
            <h2>{title}</h2>
            <p>{text}</p>
          </article>
        ))}
      </div>
      <div className="centered-cta">
        <h2>Your next favorite evening.</h2>
        <p>Discover what a visit to Arevei could look like.</p>
        <Link className="button" to="/reservation">
          Plan your visit ↗
        </Link>
      </div>
    </div>
  );
}
