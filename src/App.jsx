import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { CharacterProvider } from "./components/hooks/useCharacter";
import { GrimorioProvider } from "./components/hooks/useGrimorio";
import Layout from "./components/common/layout";

import Home from "./pages/Home";
import ForjaPersonaje from "./pages/ForjaPersonaje";
import Search from "./pages/Search";
import Detail from "./pages/Detail";
import Wishlist from "./pages/Wishlist";
import History from "./pages/History";
import Contact from "./pages/Contact";
import Explorar from './pages/Explorar';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // 👈 acá metemos el layout
    children: [
      { path: "/", element: <Home /> },
      { path: "/forja", element: <ForjaPersonaje /> },
      { path: "/search", element: <Search /> },
      { path: "/detail/:id", element: <Detail /> },
      { path: "/wishlist", element: <Wishlist /> },
      { path: "/history", element: <History /> },
      { path: "/contact", element: <Contact /> },
      { path: "/explorar", element: <Explorar/>}
    ],
  },
]);


export default function App() {
  return (
    <CharacterProvider>
      <GrimorioProvider>
        <RouterProvider router={router} />
      </GrimorioProvider>
    </CharacterProvider>
  );
}
