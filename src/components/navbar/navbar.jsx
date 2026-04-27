import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./navbar.css";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  //BLoquea el scroll cuando abre el menu
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);
  const goTo = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>

        <div className="navbar-title" onClick={() => goTo("/")}>
          Grimorio
        </div>
        <div
          className={`navbar-hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>

      {/* Overlay */}
      <div
        className={`overlay ${menuOpen ? "active" : ""}`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Side Menu */}
      <div className={`side-menu ${menuOpen ? "open" : ""}`}>

        <p onClick={() => goTo("/")}>Home</p>
        <p onClick={() => goTo("/explorar")}>Spells</p>
        <p onClick={() => goTo("/forja")}>Personaje</p>
      </div>
    </>
  );
}

export default Navbar;
