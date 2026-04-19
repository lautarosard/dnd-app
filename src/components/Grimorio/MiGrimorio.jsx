import { useGrimorio } from "../hooks/useGrimorio";
import React from "react";
import './MiGrimorio.css';

export default function MiGrimorio() {
    const {hechizosGuardados, eliminarHechizo} = useGrimorio();

    if (hechizosGuardados.length === 0) {
        return (
            <div className="grimorio-vacio">
                <h2>Mi Grimorio</h2>
                <p>Las páginas están en blanco. Explora y añade hechizos a tu colección</p>
            </div>
        );
    }
    return (
        <div className="grimorio-container">
            <h2>Mi Grimorio</h2>
            <p className="contador">Hechizos memorizados: {hechizosGuardados.length}</p>

            <ul className="lista-hechizos">
                {hechizosGuardados.map((hechizo) => (
                    <li key={hechizo.url} className="hechizo-item">
                        <div className="hechizo-info">
                            <h4>{hechizo.nombre}</h4>
                            <span className="medalla-nivel">
                                {hechizo.nivel === 0 ? "Truco" : `Nivel ${hechizo.nivel}`}
                            </span>
                        </div>
                        <button className="btn-olvidar" onClick={() => eliminarHechizo(hechizo.url)}>
                            Olvidar
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}