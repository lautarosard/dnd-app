import './SpellCard.css';
import './MagicSchools.css';
import { useState } from 'react';
import { Loader } from '../shares/loading';
import { useGrimorio } from '../hooks/useGrimorio';
import { useCharacter } from '../hooks/useCharacter';
import { useHistory } from "../hooks/useHistory"; // Asegúrate de tener este import
import { useNavigate } from 'react-router-dom';


export default function SpellCard({ hechizo, nombre, nivel, url, modoPersonaje, compact }) {
  const [expandido, setExpandido] = useState(false);
  const [cargando, setEstaCargando] = useState(false);
  const [detalles, setDetalles] = useState(null);

  const { agregarHechizo: agregarAlGrimorioGeneral, eliminarHechizo: eliminarAlGrimorioGeneral, hechizosGuardados } = useGrimorio();
  const { aprenderHechizo: agregarAlPersonaje, olvidarHechizo: olvidarAlPersonaje, personaje } = useCharacter();
  const { addToHistory } = useHistory();
  const navigate = useNavigate();

  
  const estaGuardado = hechizosGuardados?.some(h => h.url === url);
  const estaAprendido = personaje?.hechizos?.some(h => h.index === hechizo.index);
  const yaLoTiene = modoPersonaje ? estaAprendido : estaGuardado;

  const fetchSpellDetail = async () => {
    const res = await fetch(`https://www.dnd5eapi.co${url}`);
    return await res.json();
  };

  const manejarTap = async () => {
    if (expandido) {
      setExpandido(false);
      return;
    }
    setExpandido(true);

    // 1. Guardar en historial al expandir
    if (addToHistory) addToHistory(hechizo);

    if (detalles) return;

    setEstaCargando(true);
    try {
      const data = await fetchSpellDetail();
      setDetalles(data);
    } catch (error) {
      console.error("Error al leer el hechizo", error);
    } finally {
      setEstaCargando(false);
    }
  };

  const manejarAccion = (e) => {
    e.stopPropagation(); // Evita que se cierre la carta al clickear el botón

    if (modoPersonaje) {
      if (estaAprendido) {
        olvidarAlPersonaje(hechizo.index);
      } else {
        agregarAlPersonaje(hechizo);
      }
    } else {
      if (estaGuardado) {
        eliminarAlGrimorioGeneral(url);
      } else {
        agregarAlGrimorioGeneral({ nombre, nivel, url });
        alert(`¡${nombre} añadido al Grimorio Global!`);
      }
    }
  };

  const manejarClickAgregar = (e) => {
    e.stopPropagation();
    if (modoPersonaje) {
      agregarAlPersonaje(hechizo);
    } else {
      agregarAlGrimorioGeneral({ nombre, nivel, url });
      alert(`¡${nombre} añadido al Grimorio Global!`);
    }
  };

  // --- CONTENIDO DETALLADO (REUTILIZABLE) ---
  const contenidoExpandido = (
    <div className="tarjeta-cuerpo">
      {cargando ? (
        <Loader message="Consultando el grimorio..." />
      ) : (
        detalles && (
          <div className="info-detallada">
            <p><strong>Tiempo:</strong> {detalles.casting_time}</p>
            <p><strong>Rango:</strong> {detalles.range}</p>
            <p><strong>Duración:</strong> {detalles.duration}</p>
            <p className="descripcion">{detalles.desc?.[0]}</p>
            <div className="acciones">
              <button 
                className="btn-agregar" 
                onClick={manejarAccion}
                style={yaLoTiene ? { backgroundColor: '#c0392b' } : {}} // Se vuelve rojo si ya lo tiene
              >
                {modoPersonaje 
                  ? (estaAprendido ? "Olvidar" : "Aprender") 
                  : (estaGuardado ? "Eliminar" : "Guardar")}
              </button>
            </div>
          </div>
        )
      )}
    </div>
  );
  const escuelaClase = hechizo?.school?.index ? `carta-bg-${hechizo.school.index}` : 'bg-default';

  // --- RENDERIZADO ---
  return (
    <div
      className={compact
        ? `card-compact ${expandido ? 'compact-expandida' : ''} ${escuelaClase}`
        : `tarjeta-hechizo ${expandido ? 'abierta' : ''} ${escuelaClase}`
      }
      onClick={manejarTap}
    >
      {/* Cabecera para ambos modos */}
      <div className={compact ? "card-header-compact" : "tarjeta-cabecera"}>
        {compact ? (
          <>
            {/*<div className="card-icon">{icono}</div>*/}
            <p className="card-title">{nombre}</p>
            <span className="card-level">{nivel === 0 ? "Truco" : `Nivel ${nivel}`}</span>
          </>
        ) : (
          <>
            <h3>{/*icono*/} {nombre}</h3>
            <div className='cabecera-derecha'>
              <span className="medalla-nivel">{nivel === 0 ? "Truco" : `Nivel ${nivel}`}</span>
              <span className="icono-desplegable">{expandido ? '▲' : '▼'}</span>
            </div>
          </>
        )}
      </div>

      {/* Si está expandido, mostramos el mismo cuerpo detallado en ambos casos */}
      {expandido && contenidoExpandido}
    </div>
  );
}
