export const menuItems = [
  {
    id: "pasta",
    name: "Garden herb pasta",
    category: "main",
    price: 32,
    image: "/assets/images/web/pexels-mali-64208.jpg",
    imageAlt: "Pasta with a fresh basil garnish",
    desc: "Fresh basil, seasonal vegetables, and a delicate house sauce.",
  },
  {
    id: "garden",
    name: "Seasonal garden plate",
    category: "appetizer",
    price: 18,
    image: "/assets/images/web/pexels-ella-olsson-572949-1640772.jpg",
    imageAlt: "Colorful vegetables and a fresh seasonal salad",
    desc: "Roasted vegetables, crisp greens, and a bright citrus dressing.",
  },
  {
    id: "sharing",
    name: "The sharing table",
    category: "main",
    price: 45,
    image: "/assets/images/web/pexels-chanwalrus-958545.jpg",
    imageAlt: "A selection of savory dishes and breads for sharing",
    desc: "A generous selection of house favorites, made for good company.",
  },
  {
    id: "starter",
    name: "Chef's opening plate",
    category: "appetizer",
    price: 22,
    image: "/assets/images/web/pexels-pixabay-262978.jpg",
    imageAlt:
      "Small restaurant plates with carefully arranged fresh ingredients",
    desc: "A changing selection of small bites inspired by the season.",
  },
  {
    id: "tasting",
    name: "Seasonal tasting menu",
    category: "main",
    price: 65,
    image: "/assets/images/web/pexels-vincent-ma-janssen-1310777.jpg",
    imageAlt: "An assortment of dishes on a shared dining table",
    desc: "A multi-course exploration of the kitchen's seasonal inspiration.",
  },
  {
    id: "dessert",
    name: "Pastry of the day",
    category: "dessert",
    price: 16,
    image: "",
    imageAlt: "Pastry of the day",
    desc: "A sweet finish selected by the kitchen. Ask about today's preparation.",
  },
];

export function filterMenu(items, category, search = "") {
  const query = search.trim().toLowerCase();
  return items.filter(
    (item) =>
      (category === "all" || item.category === category) &&
      `${item.name} ${item.desc}`.toLowerCase().includes(query),
  );
}

export function normalizeMenuItem(data, id) {
  if (
    !data ||
    typeof data.name !== "string" ||
    !data.name.trim() ||
    !["appetizer", "main", "dessert"].includes(data.category) ||
    typeof data.desc !== "string" ||
    typeof data.price !== "number" ||
    !Number.isFinite(data.price) ||
    data.price < 0
  )
    return null;
  const image =
    typeof data.image === "string" &&
    (/^\/assets\//.test(data.image) || /^https:\/\//.test(data.image))
      ? data.image
      : "";
  return {
    id,
    name: data.name,
    category: data.category,
    desc: data.desc,
    price: data.price,
    image,
    imageAlt: typeof data.imageAlt === "string" ? data.imageAlt : data.name,
  };
}
