import React from 'react';
import { useState } from 'react';
import './SpellsDashboard.css';
import SpellCard from './SpellCard'; 
import { useEffect } from 'react';
import { Loader } from '../shares/loading';
import { useSpells } from '../hooks/useSpells';
import { useCharacter } from '../hooks/useCharacter';

// se puede optimizar más el uso del internet si utilizamos una query de graphql para poder
// traer los spells específicos de una clase si es que está en modo personaje
export default function SpellsDashboard({modoPersonaje = false}){
  const [textoBusqueda, setTextoBusqueda] = useState("");
  const [nivelSeleccionado, setNivelSeleccionado] = useState("");
  const [escuelaSeleccionada, setEscuelaSeleccionada] = useState("");
  const [claseSeleccionada, setClaseSeleccionada] = useState("");

  const {spells, loading, error} = useSpells();
  const {personaje, estaConfigurado} = useCharacter();

  const hechizosFinales = spells.filter(h => {
    const coincideNombre = h.name.toLowerCase().includes(textoBusqueda.toLowerCase());
    const coincideEscuela = escuelaSeleccionada === "" || h.school.index === escuelaSeleccionada;

    let coincideClase;
    let coincideNivel;

    if (modoPersonaje && estaConfigurado){
      coincideClase = h.classes.some(c => c.index === personaje.clase);
      const indiceMaxSlot = personaje.recursos.slots.findLastIndex(slot => slot > 0); 
      //con esto fijamos hasta qué nivel puede aprender hechizo si esta en modo personaje
      const nivelMaximoMagia = indiceMaxSlot !== -1 ? indiceMaxSlot + 1 : 0;
      if (nivelMaximoMagia === 0 && personaje.recursos.cantrips === 0) {
        coincideNivel = false; 
      } else {
        coincideNivel = h.level <= nivelMaximoMagia;
      }
    } else { // modo normal (el buscador global)
      coincideClase = claseSeleccionada === "" || h.classes.some(c => c.index === claseSeleccionada);
      coincideNivel = nivelSeleccionado === "" || h.level === parseInt(nivelSeleccionado);
    }
    
    return coincideNombre && coincideNivel && coincideEscuela && coincideClase;
  });
  if (error) return <p>Error Arcano: {error}</p>;

  return (
    <div className='dashboard-arcano'>
      <div className='zona-filtros'>
        {/*1er filtro: nombre del hechizo */}
        <input type="text" 
               className='input-buscador'
               placeholder='Buscar hechizo...'
               value={textoBusqueda}
               onChange={(e) => setTextoBusqueda(e.target.value)}/>

        {/*2do filtro: escuela de magia */}
        <select value={escuelaSeleccionada} onChange={(e) => setEscuelaSeleccionada(e.target.value)}>
          <option value="">Escuela</option>
          <option value="abjuration">Abjuración</option>
          <option value="conjuration">Conjuración</option>
          <option value="divination">Adivinación</option>
          <option value="enchantment">Encantamiento</option>
          <option value="evocation">Evocación</option>
          <option value="illusion">Ilusión</option>
          <option value="necromancy">Nigromancia</option>
          <option value="transmutation">Transmutación</option>
        </select>

        {!modoPersonaje && ( 
          <>
          {/*3er filtro: nivel */}
          <select value = {nivelSeleccionado} onChange={(e) => setNivelSeleccionado(e.target.value)}>
            <option value="">Nivel</option>
              {[0,1,2,3,4,5,6,7,8,9].map(n => (
            <option key={n} value={n}>{n === 0 ? "Trucos" : `Nivel ${n}`}</option>
            ))}
          </select>
          {/*4to filtro: clase */}
          <select value={claseSeleccionada} onChange={(e) => setClaseSeleccionada(e.target.value)}>
            <option value="">Clase</option>
            <option value="wizard">Mago</option>
            <option value="sorcerer">Hechicero</option>
            <option value="cleric">Clérigo</option>
            <option value="paladin">Paladín</option>
            <option value="bard">Bardo</option>
            <option value="druid">Druida</option>
            <option value="warlock">Brujo</option>
            <option value="ranger">Explorador</option>
          </select>
          </>
        )}
      </div>

      <div className='contenedor-lista'>
        {loading ? (<Loader message='Cargando hechizos...'/>) : (
          hechizosFinales.length === 0 ? (
            <p>No hay hechizos que coincidan</p>
          ) : (
            hechizosFinales.map((hechizo) => (
              <SpellCard 
                key = {hechizo.index} 
                hechizo={hechizo} 
                nombre={hechizo.name} 
                nivel={hechizo.level} 
                url = {`/api/spells/${hechizo.index}`} 
                modoPersonaje={modoPersonaje}
              />
            ))
          )
        )}
      </div>
    </div>
  );
}