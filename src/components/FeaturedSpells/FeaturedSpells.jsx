import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FeaturedSpells.css";

function FeaturedSpells() {
  const [spells, setSpells] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://www.dnd5eapi.co/api/spells")
      .then(res => res.json())
      .then(data => {
        setSpells(data.results.slice(0, 6));
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <section className="featured">

      <div className="featured-header">
        <h2>Hechizos</h2>
        <button onClick={() => navigate("/search")}>
          Ver más →
        </button>
      </div>

      <div className="featured-list">
        {spells.map((spell) => (
          <div key={spell.index} className="featured-card">
            <p>{spell.name}</p>
          </div>
        ))}
      </div>

    </section>
  );
}

export default FeaturedSpells;
