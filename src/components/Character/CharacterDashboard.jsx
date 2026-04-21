import React from "react";
import { useCharacter } from "../hooks/useCharacter";
import SpellsDashboard from "../spells/SpellsDashboards";
import MiGrimorio from "../Grimorio/MiGrimorio";
import './CharacterDashboard.css'
import { useState } from "react";
import CharacterCard from "./CharacterCard";
export default function CharacterDashboard() {
  const { personaje, borrarPersonaje, actualizarPersonaje, descansoLargo } = useCharacter();

  const [cargandoNivel, setCargandoNivel] = useState(false);

  const cambiarNivel = async (nuevoNivel) => {
    if (nuevoNivel < 1 || nuevoNivel > 20) return;

    setCargandoNivel(true);

    try {
      const response = await fetch(`https://www.dnd5eapi.co/api/classes/${personaje.clase}/levels/${nuevoNivel}`);
      if (!response.ok) throw new Error("Error consultando los datos");

      const data = await response.json();
      const magia = data.spellcasting;

      const recursosMagicos = magia ? {
        cantrips: magia.cantrips_known || 0,
        slots: [
          magia.spell_slots_level_1 || 0,
          magia.spell_slots_level_2 || 0,
          magia.spell_slots_level_3 || 0,
          magia.spell_slots_level_4 || 0,
          magia.spell_slots_level_5 || 0,
          magia.spell_slots_level_6 || 0,
          magia.spell_slots_level_7 || 0,
          magia.spell_slots_level_8 || 0,
          magia.spell_slots_level_9 || 0
        ]
      } : { cantrips: 0, slots: [0, 0, 0, 0, 0, 0, 0, 0, 0] };

      //Actualizamos el contexto global
      actualizarPersonaje({
        nivel: nuevoNivel,
        recursos: recursosMagicos
      });
    } catch (error) {
      console.error("Fallo al actualizar nivel", error);
      alert("Hubo una perturbación mágica al intentar cambiar de nivel.");
    } finally {
      setCargandoNivel(false);
    }
  };
  return (
    <div className="character-dashboard-container">
      {/* CABECERA: Ficha del Personaje */}
      <div className="character-header">
        <div>
          <h2>{personaje.nombre}</h2>

          {/* Contenedor Flex para alinear la info y los botones de nivel */}
          <div className="character-info-row">
            <p>
              {personaje.clase} - Nivel {personaje.nivel}
            </p>

            {/* Controles de Nivel */}
            {cargandoNivel ? (
              <span className="loading-level-text">Transcribiendo...</span>
            ) : (
              <div className="level-controls">
                <button
                  className="btn-nivel"
                  onClick={() => cambiarNivel(personaje.nivel - 1)}
                  disabled={personaje.nivel <= 1}
                >
                  -
                </button>
                <button
                  className="btn-nivel"
                  onClick={() => cambiarNivel(personaje.nivel + 1)}
                  disabled={personaje.nivel >= 20}
                >
                  +
                </button>
              </div>
            )}
          </div>

          {/*ZONA DE SPELL SLOTS */}
          {personaje.recursos && (
            <div className="spell-slots-container">
              <h4 className="spell-slots-title">Espacios de Conjuro</h4>

              {/* Mapeamos los 9 niveles de magia */}
              {personaje.recursos.slots.map((maximo, index) => {
                if (maximo === 0) return null; // Si no tiene magia de nivel X, no la dibujamos

                const nivelSlot = index + 1;
                const gastados = personaje.slotsGastados[index] || 0;


                const circulitos = [];
                for (let i = 0; i < maximo; i++) {
                  const estaLleno = i >= gastados;
                  circulitos.push(
                    <span
                      key={i}
                      className={`spell-slot-circle ${estaLleno ? 'spell-slot-full' : 'spell-slot-empty'}`}
                    ></span>
                  );
                }

                return (
                  <div key={index} className="spell-level-row">
                    <span className="spell-level-label">Nivel {nivelSlot}</span>
                    <div>{circulitos}</div>
                  </div>
                );
              })}

              <button onClick={descansoLargo} className="btn-descanso-largo">
                Descanso Largo
              </button>
            </div>
          )}
        </div>

        <button
          onClick={borrarPersonaje}
          className="btn-jubilar"
        >
          Jubilar
        </button>
      </div>

      {/* CUERPO: Buscador y Grimorio */}
      <div className="layout-principal">
        <div id="seccion-grimorio">
          <MiGrimorio modoPersonaje={true} />
        </div>
        <div id="seccion-hechizos">
          <h3>Hechizos Disponibles</h3>
          <SpellsDashboard modoPersonaje={true} />
        </div>
      </div>
    </div>
  );
}
