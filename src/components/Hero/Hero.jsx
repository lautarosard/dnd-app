import "./Hero.css";
import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();

  const irAExplorar = () => {
    navigate("/explorar");
  };

  const irAForja = () => {
    navigate("/forja");
  }

  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">Grimorio de Hechizos</h1>
        <p className="hero-subtitle">
          Explorá y guardá hechizos de D&D 5e para tus partidas
        </p>
        <div className="hero-buttons-section">
          <button className="hero-button" onClick={irAForja} style={{ backgroundColor: '#FF6500', color: 'white'}}>
            Forjar Personaje
          </button>
          <button className="hero-button" onClick={irAExplorar}>
            Explorar hechizos
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
