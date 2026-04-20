import "./RecentSpell.css";

function RecentSpells() {
  const data = JSON.parse(localStorage.getItem("history")) || [];

  const recent = data.slice(0, 5); // últimos 5

  return (
    <section className="recent">
      <h2 className="recent-title">Últimos hechizos vistos</h2>

      <div className="recent-list">
        {recent.length === 0 ? (
          <p>No hay hechizos vistos todavía</p>
        ) : (
          recent.map((spell) => (
            <div key={spell.id} className="recent-card">
              <p>{spell.name}</p>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default RecentSpells;
