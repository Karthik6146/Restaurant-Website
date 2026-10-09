import React from "react";
import { Link } from "react-router-dom";
import NewsletterSignup from "../components/engagement/NewsletterSignup";
import LazyImage from "../components/common/LazyImage";
import AtmosphereSlider from "../components/common/AtmosphereSlider";
import { menuItems } from "../utils/menu";

export default function Home() {
  return (
    <>
      <section className="container hero">
        <div className="hero-copy">
          <p className="eyebrow">A place to come together</p>
          <h1>
            Seasonal food.
            <br />
            <em>Lasting</em>
            <br />
            memories.
          </h1>
          <p className="hero-description">
            Thoughtfully prepared plates, a welcoming table, and the simple joy
            of sharing something good.
          </p>
          <div className="hero-buttons">
            <Link to="/reservation" className="button">
              Reserve a table <span aria-hidden="true">↗</span>
            </Link>
            <Link to="/menu" className="button button-outline">
              Explore the menu
            </Link>
          </div>
          <div className="hero-note">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path d="M16 3v26M3 16h26M7 7l18 18M7 25L25 7" />
              <circle cx="16" cy="16" r="11" />
            </svg>
            <span>Made with care. Best enjoyed together.</span>
          </div>
        </div>
        <AtmosphereSlider />
      </section>
      <div className="values-strip">
        <div className="container values-inner">
          <span>
            <b aria-hidden="true">✳</b> Inspired by the season
          </span>
          <span>
            <b aria-hidden="true">✳</b> Prepared with care
          </span>
          <span>
            <b aria-hidden="true">✳</b> Shared with good company
          </span>
          <span>
            <b aria-hidden="true">✳</b> A warm welcome
          </span>
        </div>
      </div>
      <section className="container section">
        <div className="section-header">
          <div>
            <p className="eyebrow">A taste of Arevei</p>
            <h2>Fresh from our kitchen.</h2>
            <p className="section-description">
              A little inspiration for your next visit. Explore our sample
              seasonal menu.
            </p>
          </div>
          <Link to="/menu" className="text-link">
            View the full menu <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <div className="dish-grid">
          {menuItems.slice(0, 3).map((item) => (
            <article className="dish-card" key={item.id}>
              <LazyImage
                src={item.image}
                alt={item.imageAlt}
                className="dish-image"
              />
              <p className="eyebrow">
                {item.category === "main" ? "From the kitchen" : "To begin"}
              </p>
              <div className="dish-heading">
                <h3>{item.name}</h3>
                <span>${item.price}</span>
              </div>
              <p>{item.desc}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="story-section section">
        <div className="container story-grid">
          <figure className="restaurant-film">
            <video
              controls
              playsInline
              muted
              preload="none"
              poster="/assets/videos/restaurant-poster.jpg"
              width="1280"
              height="720"
              aria-label="A moment at the table: steaming food, tea, and a carefully arranged place setting"
            >
              <source
                src="/assets/videos/restaurant-film.mp4"
                type="video/mp4"
              />
              <a href="/assets/videos/restaurant-film.mp4">
                Watch the restaurant film
              </a>
            </video>
            <figcaption>
              A moment at the table — a steaming dish and tea, ready to share.
              Silent film.
            </figcaption>
          </figure>
          <div className="story-copy">
            <p className="eyebrow">Food with a little soul</p>
            <h2>
              Simple ingredients.
              <br />
              Extraordinary moments.
            </h2>
            <p>
              We believe a great meal is about more than what is on the plate.
              It is the conversation, the care, and the feeling that you belong.
              Our concept brings seasonal cooking and unhurried hospitality to
              the same table.
            </p>
            <Link to="/about" className="text-link">
              Get to know us <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </section>
      <section className="container section">
        <div className="section-header">
          <div>
            <p className="eyebrow">Something to look forward to</p>
            <h2>Make an occasion of it.</h2>
          </div>
          <Link to="/specials" className="text-link">
            Discover what's on <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <div className="events-grid">
          <Link to="/specials" className="event-card">
            <LazyImage
              src="/assets/images/web/pexels-pixabay-262978.jpg"
              alt="Freshly prepared plates being served at a restaurant"
            />
            <div className="event-copy">
              <p className="eyebrow">Seasonal inspiration</p>
              <h3>The tasting experience ↗</h3>
              <p>A thoughtful journey through the flavors of the season.</p>
            </div>
          </Link>
          <Link to="/group-dining" className="event-card">
            <LazyImage
              src="/assets/images/web/pexels-elevate-1269025.jpg"
              alt="Friends raising a toast over dinner"
            />
            <div className="event-copy">
              <p className="eyebrow">Gather your favorite people</p>
              <h3>A table for your occasion ↗</h3>
              <p>Birthdays, reunions, and the moments worth celebrating.</p>
            </div>
          </Link>
        </div>
      </section>
      <section id="visit" className="story-section section">
        <div className="container visit-grid">
          <div className="visit-copy">
            <p className="eyebrow">We'll save you a seat</p>
            <h2>Stay a little longer.</h2>
            <p>
              Come for a leisurely lunch, a dinner to remember, or just good
              company.
            </p>
            <p className="form-note">
              Sample opening hours. Our verified address and contact information
              will appear here before launch.
            </p>
            <dl className="hours">
              <div>
                <dt>Monday – Thursday</dt>
                <dd>11am – 10pm</dd>
              </div>
              <div>
                <dt>Friday – Saturday</dt>
                <dd>11am – 11pm</dd>
              </div>
              <div>
                <dt>Sunday</dt>
                <dd>10am – 9pm</dd>
              </div>
            </dl>
            <Link className="button" to="/reservation">
              Plan your evening <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <NewsletterSignup />
        </div>
      </section>
    </>
  );
}
