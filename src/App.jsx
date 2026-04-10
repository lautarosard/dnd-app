import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Search from "./pages/Search";
import Detail from "./pages/Detail";
import Wishlist from "./pages/Wishlist";
import History from "./pages/History";
import Contact from "./pages/Contact";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="/detail/:id" element={<Detail />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/history" element={<History />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
}

export default App;
