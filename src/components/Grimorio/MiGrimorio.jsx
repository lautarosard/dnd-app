import { useGrimorio } from "../hooks/useGrimorio";
import React from "react";
import './MiGrimorio.css';
import { useCharacter } from "../hooks/useCharacter";

export default function MiGrimorio({modoPersonaje = false}) {
    const {hechizosGuardados, eliminarHechizo} = useGrimorio();
    const {personaje, olvidarHechizo} = useCharacter();

    const listaHechizos = modoPersonaje ? personaje.hechizos : hechizosGuardados;

    const manejarBorrado = (hechizo) => {
        if (modoPersonaje) {
            olvidarHechizo(hechizo.index);
        } else {
            eliminarHechizo(hechizo.url);
        }
    };

    if (listaHechizos.length === 0) {
        return (
            <div className="grimorio-vacio">
                <h2>{modoPersonaje ? `Grimorio de ${personaje.nombre}` : "Mi Grimorio"}</h2>
                <p>Las páginas están en blanco. Explora y añade hechizos a tu colección</p>
            </div>
        );
    }
    return (
        <div className="grimorio-container">
            <h2>{modoPersonaje ? `Grimorio de ${personaje.nombre}` : "Mi Grimorio"}</h2>
            <p className="contador">Hechizos memorizados: {listaHechizos.length}</p>

            <ul className="lista-hechizos">
                {listaHechizos.map((hechizo) => { //hice todo este chorizo porque escribi lo mio en español pero la api esta en ingles y no puedo filtrar
                    const nombreMostrar = modoPersonaje ? hechizo.name : hechizo.nombre;
                    const nivelMostrar = modoPersonaje ? hechizo.level : hechizo.nivel;
                    const keyUnica = modoPersonaje ? hechizo.index : hechizo.url;

                    return (
                        <li key={keyUnica} className="hechizo-item">
                            <div className="hechizo-info">
                                <h4>{nombreMostrar}</h4>
                                <span className="medalla-nivel">
                                    {nivelMostrar === 0 ? "Truco" : `Nivel ${nivelMostrar}`}
                                </span>
                            </div>
                            
                            {/* Pasamos el objeto completo a la función para que ella decida qué extraer */}
                            <button className="btn-olvidar" onClick={() => manejarBorrado(hechizo)}>
                                Olvidar
                            </button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}