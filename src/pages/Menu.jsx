import React, { useState } from "react";
import { Link } from "react-router-dom";
import MenuCarousel from "../components/menu/MenuCarousel";
import FilterChips from "../components/menu/FilterChips";

export default function Menu() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [search, setSearch] = useState("");
  return (
    <div className="container">
      <div className="page-heading">
        <p className="eyebrow">Seasonal. Thoughtful. Delicious.</p>
        <h1>Something for every appetite.</h1>
        <p>
          A menu inspired by the season and the pleasure of sharing a meal. Find
          your next favorite below.
        </p>
      </div>
      <div className="menu-tools">
        <FilterChips
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />
        <div className="menu-search">
          <label className="field-label" htmlFor="menu-search">
            Find a dish
          </label>
          <input
            id="menu-search"
            type="search"
            className="search-input"
            placeholder="Search dishes or ingredients…"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
      </div>
      <MenuCarousel filter={activeFilter} search={search} />
      <div className="centered-cta">
        <h2>Come hungry. Leave happy.</h2>
        <p>
          Have an allergy or dietary requirement? Include it with your
          reservation request.
          <br />
          Our sample dishes do not carry verified allergen information.
        </p>
        <Link className="button" to="/reservation">
          Reserve a table ↗
        </Link>
      </div>
    </div>
  );
}
