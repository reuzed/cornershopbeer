import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./styles/fonts.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BeersMenu from "./pages/BeersMenu";
import ShopsMenu from "./pages/ShopsMenu";
import Beers from "./pages/Beers";
import BeersAddMenu from "./pages/BeersAddMenu";
import Shops from "./pages/Shops";
import ShopsAddMenu from "./pages/ShopsAddMenu";
import BeersAdd from "./pages/BeersAdd";
import BeersReview from "./pages/BeersReview";
import ShopsAdd from "./pages/ShopsAdd";
import ShopsInventory from "./pages/ShopsInventory";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/beers-menu" element={<BeersMenu />} />
        <Route path="/beers" element={<Beers />} />
        <Route path="/beers-add-menu" element={<BeersAddMenu />} />
        <Route path="/beers-new" element={<BeersAdd />} />
        <Route path="/beers-review" element={<BeersReview />} />
        <Route path="/shops-menu" element={<ShopsMenu />} />
        <Route path="/shops" element={<Shops />} />
        <Route path="/shops-add-menu" element={<ShopsAddMenu />} />
        <Route path="/shops-new" element={<ShopsAdd />} />
        <Route path="/shops-inventory" element={<ShopsInventory />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
