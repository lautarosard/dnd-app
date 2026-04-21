import "./Home.css";
import Hero from "../components/Hero/Hero";
import SpellsRow from "../components/spells/SpellsRow";
import MiGrimorio from "../components/Grimorio/MiGrimorio";
import RecentlyViewed from "../components/history/RecentlyViewed";
import CharacterCard from "../components/Character/CharacterCard"; // Importamos la card
import { useCharacter } from "../components/hooks/useCharacter";
import { useNavigate } from "react-router-dom";

function Home() {

  const { estaConfigurado } = useCharacter();
  const navigate = useNavigate();

  return (
    <main className="home">

      <Hero />
      {/* --- NUEVA SECCIÓN: TU HÉROE --- */}
      {estaConfigurado && (
        <section className="home-section hero-home-section" style={{ marginBottom: '40px' }}>
          <div className="section-header">
            <h2>Tu Personaje</h2>
            <span onClick={() => navigate("/forja")}>Ir a la Forja →</span>
          </div>
          <div onClick={() => navigate("/forja")} style={{ cursor: 'pointer' }}>
            <CharacterCard />
          </div>
        </section>
      )}

      {/* VISTOS RECIENTEMENTE*/}

      <section className="home-section">
        <div className="section-header">
          <h2>Vistos recientemente</h2>
        </div>

        <RecentlyViewed />
      </section>

      {/* HECHIZOS */}
      <section className="home-section">
        <div className="section-header">
          <h2>Hechizos</h2>
          <span onClick={() => navigate("/search")}>
            Ver más →
          </span>

        </div>

        <SpellsRow title="" />
      </section>

      {/* WISHLIST */}
      <section className="home-section">
        <div className="section-header">
          <h2>Mi Grimorio</h2>
          <span>Ver más →</span>
        </div>

        <MiGrimorio preview />
      </section>

      
    </main>
  );
}

export default Home;
