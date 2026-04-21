import { useSpells } from "../hooks/useSpells";
import SpellCard from "./SpellCard";
import { Loader } from "../shares/loading";

function SpellsRow({ title, limit = 10 }) {
  const { spells, loading, error } = useSpells();

  if (loading) return <Loader message="Cargando hechizos..." />;
  if (error) return <p>Error: {error}</p>;

  const randomSpells = [...spells]
    .sort(() => 0.5 - Math.random())
    .slice(0, limit);

  return (
    <section className="home-section">
      <h2>{title}</h2>

      {/* El contenedor con scroll horizontal */}
      <div className="horizontal-scroll">
        {randomSpells.map((spell) => (
          <SpellCard
            key={spell.index}
            hechizo={spell}
            nombre={spell.name}
            nivel={spell.level}
            url={`/api/spells/${spell.index}`}
            // CLAVE: Activamos el diseño de tarjeta pequeña
            compact={true}
          />
        ))}
      </div>
    </section>
  );
}

export default SpellsRow;
