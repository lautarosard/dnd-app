import './SpellCard.css';
import { useState } from 'react';
import { Loader } from '../shares/loading';
import { useGrimorio } from '../hooks/useGrimorio';

// Extraemos la tarjeta a su propio componente para que el Dashboard quede limpio
export default function SpellCard({ nombre, nivel, url}) {
  // Acá podés poner lógica extra en el futuro, como determinar 
  // la escuela de magia para cambiarle el color dinámicamente
    const [expandido, setExpandido] = useState(false);
    const [cargando, setEstaCargando] = useState(false);
    const [detalles, setDetalles] = useState(false);
    const {agregarHechizo} = useGrimorio();

    const manejarTap = async () => {
        if (expandido) {
            setExpandido(false);
            return
        }
        setExpandido(true);
        if (detalles) return; //para no pegarle a la api si ya están guardados los detalles
        setEstaCargando(true);
        try {
            const myHeaders = new Headers();
            myHeaders.append("Accept", "application/json");
            const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
            };
            const respuesta = await fetch(`https://www.dnd5eapi.co${url}`);
            const data = await respuesta.json();
            setDetalles(data);
        }catch(error)
        {
            console.error("Error al leer el hechizo", error);
        }finally {
            setEstaCargando(false);
        }
    }
  return (
    <div className={`tarjeta-hechizo ${expandido ? 'abierta' : ''}`} onClick={manejarTap}>
      <div className="tarjeta-cabecera">
        <h3>{nombre}</h3>
        <div className='cabecera-derecha'>
            <span className="medalla-nivel">
                {nivel === 0 ? "Truco" : `Nivel ${nivel}`}
            </span>
            <span className="icono-desplegable">{expandido ? '▲' : '▼'}</span>
        </div>
        
      </div>
      
    {expandido && (
        <div className="tarjeta-cuerpo">
          
          {/* Pantalla de carga mientras trae el JSON */}
          {cargando ? (
            <Loader message= "Consultando el grimorio..."></Loader>
            
          ) : (
            /* Una vez que tenemos los detalles, los dibujamos */
            detalles && (
              <div className="info-detallada">
                <p><strong>Tiempo de Lanzamiento:</strong> {detalles.casting_time}</p>
                <p><strong>Rango:</strong> {detalles.range}</p>
                <p><strong>Duración:</strong> {detalles.duration}</p>
                
                {/* La API de D&D manda la descripción como un array de párrafos. Mostramos el primero. */}
                <p className="descripcion">
                  {detalles.desc && detalles.desc[0]}
                </p>

                {/* El botón para tu Grimorio (Para que no se active el tap de la tarjeta al tocar el botón, usamos e.stopPropagation()) */}
                <button 
                  className="btn-agregar"
                  onClick={(e) => {
                    e.stopPropagation(); // Evita que la tarjeta se cierre al hacer clic acá
                    agregarHechizo({nombre, nivel, url});
                    alert(`¡${nombre} añadido a tu Grimorio!`);
                  }}
                ><i className="animation"></i>
                  Añadir al Grimorio
                  <i className="animation"></i>
                </button>
              </div>
            )
          )}
          
        </div>
      )}
    </div>
  );
}