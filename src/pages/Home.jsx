import "./Home.css";
import Hero from "../components/Hero/Hero";
import SpellsRow from "../components/spells/SpellsRow";
import MiGrimorio from "../components/Grimorio/MiGrimorio";
import RecentlyViewed from "../components/history/RecentlyViewed";



function Home() {
  return (
    <main className="home">

      <Hero />

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
