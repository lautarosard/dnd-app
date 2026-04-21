import { useGrimorio } from "../hooks/useGrimorio";
import React from "react";
import './MiGrimorio.css';
import '../spells/SpellCard.css'; // Importamos el CSS de las cards
import { useCharacter } from "../hooks/useCharacter";
import SpellCard from "../spells/SpellCard";

export default function MiGrimorio({ modoPersonaje = false, preview = false }) {
  const { hechizosGuardados } = useGrimorio();
  const { personaje } = useCharacter();

  const listaHechizos = modoPersonaje ? personaje.hechizos : hechizosGuardados;

  if (listaHechizos.length === 0) {
    return (
      <div className="grimorio-vacio">
        <h2>{modoPersonaje ? `Grimorio de ${personaje.nombre}` : "Mi Grimorio"}</h2>
        <p>Las páginas están en blanco. Explora y añade hechizos a tu colección</p>
      </div>
    );
  }

  return (
    <div className={`grimorio-seccion ${preview ? 'modo-preview' : ''}`}>
      {!preview && <h2>{modoPersonaje ? `Grimorio de ${personaje.nombre}` : "Mi Grimorio"}</h2>}
      <p className="contador">Hechizos memorizados: {listaHechizos.length}</p>

      {/* Reutilizamos el contenedor de scroll horizontal */}
      <div className="horizontal-scroll">
        {listaHechizos.map((hechizo) => {
          // Normalizamos los datos porque la API y tu estado local tienen nombres distintos
          const nombre = modoPersonaje ? hechizo.name : hechizo.nombre;
          const nivel = modoPersonaje ? hechizo.level : hechizo.nivel;
          const url = modoPersonaje ? `/api/spells/${hechizo.index}` : hechizo.url;
          const key = modoPersonaje ? hechizo.index : hechizo.url;

          return (
            <SpellCard
              key={key}
              hechizo={hechizo}
              nombre={nombre}
              nivel={nivel}
              url={url}
              modoPersonaje={modoPersonaje}
              compact={true} // Forzamos el modo Netflix
            />
          );
        })}
      </div>
    </div>
  );
}
