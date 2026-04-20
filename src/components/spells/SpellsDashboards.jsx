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
              <SpellCard key = {hechizo.index} nombre={hechizo.name} nivel={hechizo.level} url = {`/api/spells/${hechizo.index}`}/>
            ))
          )
        )}
      </div>
    </div>
  );
}
/*
export default function SpellsDashboard() {
  //Parametros de filtrado y busqueda
  const [textoBusqueda, setTextoBusqueda] = useState("");
  const [nivelSeleccionado, setNivelSeleccionado] = useState("");
  const [escuelaSeleccionada, setEscuelaSeleccionada] = useState("");

  //Estados de datos
  const [hechizosDesdeAPI, setHechizosDesdeAPI] = useState([]);
  const [estaCargando, setEstaCargando] = useState(true);

  useEffect(() => {
    const invocarMagia = async () => {
      setEstaCargando(true);
      try {
        const params = new URLSearchParams();

        if (nivelSeleccionado !== "") {
          params.append("level", nivelSeleccionado);
        }
        if (escuelaSeleccionada !== ""){
          params.append("school", escuelaSeleccionada);
        }
        const baseUrl = "https://www.dnd5eapi.co/api/2014/spells";
        const query = params.toString();
        const urlFinal = query ? `${baseUrl}?${query}` : baseUrl;

        const respuesta = await fetch(urlFinal, {
          headers: { "Accept": "application/json" }
        });
        if (!respuesta.ok) throw new Error('Error en Servidor API');
        const datos = await respuesta.json();
        setHechizosDesdeAPI(datos.results);
      } catch (err) {
        console.error("Pifia Arcana:", err);
      } finally {
        setEstaCargando(false);
      }
    };
    invocarMagia();
  }, [nivelSeleccionado, escuelaSeleccionada]);

  const hechizosFinales = hechizosDesdeAPI.filter(h => 
    h.name.toLowerCase().includes(textoBusqueda.toLowerCase())
  );

  return (
    <div className="dashboard-arcano">
      
      
      <div className="zona-filtros">
        <input 
          type="text" 
          className="input-buscador"
          placeholder="Buscar hechizo por nombre..." 
          value={textoBusqueda}
          onChange={(e) => setTextoBusqueda(e.target.value)}
        />

        
        <select 
          className="select-nivel"
          value={nivelSeleccionado}
          onChange={(e) => setNivelSeleccionado(e.target.value)}
        >
          <option value="">Nivel</option>
          <option value="0">Trucos (Cantrips)</option>
          <option value="1">Nivel 1</option>
          <option value="2">Nivel 2</option>
          <option value="3">Nivel 3</option>
          <option value="4">Nivel 4</option>
          <option value="5">Nivel 5</option>
          <option value="6">Nivel 6</option>
          <option value="7">Nivel 7</option>
          <option value="8">Nivel 8</option>
          <option value="9">Nivel 9</option>
        </select>
        */{/*selector de escuela de magia */}
        /*
        <select 
          className="select-nivel"
          value={escuelaSeleccionada}
          onChange={(e) => setEscuelaSeleccionada(e.target.value)}
        >
          <option value="">Todas las escuelas</option>
          <option value="abjuration">Abjuración</option>
          <option value="conjuration">Conjuración</option>
          <option value="divination">Adivinación</option>
          <option value="enchantment">Encantamiento</option>
          <option value="evocation">Evocación</option>
          <option value="illusion">Ilusión</option>
          <option value="necromancy">Nigromancia</option>
          <option value="transmutation">Transmutación</option>
        </select>
      </div>
      
      <div className="contenedor-lista">
        {estaCargando ? (
          <Loader message='Cargando hechizos...'></Loader>
        ) : (
          hechizosFinales.length === 0 ? (
            <p style={{ color: 'gray' }}>No hay hechizos que coincidan con tu búsqueda.</p>
          ) : (
            
            hechizosFinales.map((hechizo) => (
              <SpellCard 
                key={hechizo.index}
                nombre={hechizo.name}
                nivel={hechizo.level}
                url={hechizo.url}
              />
            ))
          )
        )}
      </div>
      
    </div>
  );
}*/