import React from "react";
import { Link } from "react-router-dom";
import LazyImage from "../components/common/LazyImage";

export default function GroupDining() {
  return (
    <div className="container">
      <div className="page-heading">
        <p className="eyebrow">Better, together</p>
        <h1>Your people. Your occasion.</h1>
        <p>
          From a birthday dinner to a long-overdue reunion, imagine an evening
          built around your favorite people.
        </p>
      </div>
      <LazyImage
        className="wide-image"
        src="/assets/images/web/pexels-reneterp-1581384.jpg"
        alt="An inviting restaurant dining room with tables for groups"
      />
      <div className="info-grid">
        {[
          [
            "Celebrations",
            "Birthdays, anniversaries, and the moments you want to share.",
          ],
          [
            "Work & connection",
            "A welcoming setting for team dinners and conversations.",
          ],
          [
            "A shared table",
            "Discover a sample menu with plates made for good company.",
          ],
        ].map(([title, description]) => (
          <article className="info-card" key={title}>
            <h2>{title}</h2>
            <p>{description}</p>
          </article>
        ))}
      </div>
      <div className="centered-cta">
        <h2>Let's make a little room.</h2>
        <p>
          Private event inquiries will open when venue capacity and contact
          details are verified.
          <br />
          For groups of up to 10, explore the reservation request form.
        </p>
        <Link className="button" to="/reservation">
          Plan a group visit ↗
        </Link>
      </div>
    </div>
  );
}
