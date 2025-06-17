import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Menu from "../pages/Menu";
import Booking from "../pages/Booking";
import About from "../pages/About";
import Specials from "../pages/Specials";
import GiftCards from "../pages/GiftCards";
import Careers from "../pages/Careers";
import GroupDining from "../pages/GroupDining";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/reservation" element={<Booking />} />
      <Route path="/about" element={<About />} />
      <Route path="/specials" element={<Specials />} />
      <Route path="/giftcards" element={<GiftCards />} />
      <Route path="/careers" element={<Careers />} />
      <Route path="/group-dining" element={<GroupDining />} />
    </Routes>
  );
}

export default AppRouter; 