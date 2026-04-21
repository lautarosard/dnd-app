import SpellCard from "../spells/SpellCard";
import { useHistory } from "../hooks/useHistory";

export default function RecentlyViewed() {
  const { history } = useHistory();

  if (!history || history.length === 0) return null;

  return (
    <div className="horizontal-scroll">
      {history.map((spell) => (
        <SpellCard
          key={spell.index}
          hechizo={spell}
          nombre={spell.name || spell.nombre}
          nivel={spell.level ?? spell.nivel}
          url={spell.url || `/api/spells/${spell.index}`}
          compact={true} // Esto le da el estilo de las otras filas
        />
      ))}
    </div>
  );
}
