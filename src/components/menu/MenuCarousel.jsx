import React, { useEffect, useState } from "react";
import { db } from "../../utils/firebase";
import {
  filterMenu,
  menuItems as sampleMenu,
  normalizeMenuItem,
} from "../../utils/menu";
import LazyImage from "../common/LazyImage";

export default function MenuCarousel({ filter = "all", search = "" }) {
  const [items, setItems] = useState(sampleMenu);
  const [source, setSource] = useState(db ? "loading" : "sample");
  useEffect(() => {
    if (!db) return;
    let active = true;
    import("firebase/firestore")
      .then(({ collection, getDocs }) => getDocs(collection(db, "menu")))
      .then((snapshot) => {
        const loaded = snapshot.docs
          .map((doc) => normalizeMenuItem(doc.data(), doc.id))
          .filter(Boolean);
        if (active) {
          setItems(loaded.length ? loaded : sampleMenu);
          setSource(loaded.length ? "live" : "sample");
        }
      })
      .catch(() => {
        if (active) setSource("fallback");
      });
    return () => {
      active = false;
    };
  }, []);
  const filtered = filterMenu(items, filter, search);
  return (
    <section className="menu-results" aria-label="Menu dishes">
      <p className="form-note" role="status">
        {source === "loading"
          ? "Showing our sample menu while the latest dishes load."
          : source === "live"
            ? "Latest menu · Prices in USD."
            : source === "fallback"
              ? "The live menu is temporarily unavailable. Showing sample dishes and prices in USD."
              : "Sample menu · Illustrative photography and prices in USD."}{" "}
        {filtered.length} {filtered.length === 1 ? "dish" : "dishes"} shown.
      </p>
      {filtered.length ? (
        <div className="dish-grid">
          {filtered.map((item) => (
            <article className="dish-card" key={item.id}>
              <LazyImage
                src={item.image}
                alt={item.imageAlt}
                className="dish-image"
              />
              <p className="eyebrow">
                {
                  {
                    appetizer: "To begin",
                    main: "From the kitchen",
                    dessert: "A sweet finish",
                  }[item.category]
                }
              </p>
              <div className="dish-heading">
                <h3>{item.name}</h3>
                <span>${item.price.toFixed(2)}</span>
              </div>
              <p>{item.desc}</p>
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h2>No dishes found.</h2>
          <p>Try another ingredient or choose a different category.</p>
        </div>
      )}
    </section>
  );
}
