import "./Hero.css";
import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/search");
  };

  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">Grimorio de Hechizos</h1>
        <p className="hero-subtitle">
          Explorá y guardá hechizos de D&D 5e para tus partidas
        </p>

        <button className="hero-button" onClick={handleClick}>
          Explorar hechizos
        </button>
      </div>
    </section>
  );
}

export default Hero;
