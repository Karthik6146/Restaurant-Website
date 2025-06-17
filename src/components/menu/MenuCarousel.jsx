import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../utils/firebase";
import LazyImage from "../common/LazyImage";

const fallbackMenuItems = [
  {
    id: 1,
    name: "Heirloom Beet Carpaccio",
    category: "appetizer",
    image: "/assets/images/pexels-chanwalrus-958545.jpg",
    desc: "Goat cheese, candied walnut, microgreens"
  },
  {
    id: 2,
    name: "Langoustine Bisque",
    category: "appetizer",
    image: "/assets/images/pexels-pixabay-260922.jpg",
    desc: "Saffron cream, chive oil, sourdough crisp"
  },
  {
    id: 3,
    name: "Juniper Smoked Venison",
    category: "main",
    image: "/assets/images/pexels-victorfreitas-744780.jpg",
    desc: "Parsnip purée, wild berry jus, charred leek"
  },
  {
    id: 4,
    name: "Sea Bream en Papillote",
    category: "main",
    image: "/assets/images/pexels-reneterp-1581384.jpg",
    desc: "Fennel, orange, dill, beurre blanc"
  },
  {
    id: 5,
    name: "Maracaibo Mille-Feuille",
    category: "dessert",
    image: "/assets/images/pexels-pixabay-262978.jpg",
    desc: "Green coffee, wild rose, triple wood caramel"
  },
  {
    id: 6,
    name: "Rhubarb & Woodruff",
    category: "dessert",
    image: "/assets/images/pexels-mali-64208.jpg",
    desc: "Wild rose, almond crumble, vanilla cream"
  },
];

function MenuCarousel({ filter }) {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "menu"));
        const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setMenuItems(items.length > 0 ? items : fallbackMenuItems);
      } catch {
        setMenuItems(fallbackMenuItems);
      } finally {
        setLoading(false);
      }
    };
    fetchMenuItems();
  }, []);

  const filteredItems = filter === "all" ? menuItems : menuItems.filter(item => item.category === filter);

  return (
    <div className="flex overflow-x-auto p-4 min-h-[300px]">
      {loading ? (
        <div className="w-full text-center text-gray-500 text-lg">Loading menu...</div>
      ) : filteredItems.length === 0 ? (
        <div className="w-full text-center text-gray-500 text-lg">No menu items found for this category.</div>
      ) : (
        filteredItems.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ scale: 1.05 }}
            className="flex-shrink-0 w-72 h-80 m-2 rounded-2xl overflow-hidden shadow-lg bg-white/90 dark:bg-gray-900/90 border border-secondary flex flex-col"
          >
            <LazyImage src={item.image} alt={item.name} className="w-full h-2/3 object-cover" />
            <div className="p-4 flex-1 flex flex-col justify-between">
              <h3 className="text-lg font-bold text-primary mb-1">{item.name}</h3>
              <p className="text-gray-700 dark:text-gray-200 text-sm mb-2">{item.desc}</p>
              <span className="inline-block px-3 py-1 rounded-full bg-secondary text-primary text-xs font-semibold self-start mt-auto">{item.category.charAt(0).toUpperCase() + item.category.slice(1)}</span>
            </div>
          </motion.div>
        ))
      )}
    </div>
  );
}

export default MenuCarousel; 