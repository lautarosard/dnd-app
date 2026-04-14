import { useState } from 'react';
import './SpellsDashboard.css'; // <-- Importamos nuestro CSS separado
import SpellCard from './SpellCard'; // <-- Importamos la tarjeta individual

export default function SpellsDashboard({ listaBase }) {
  const [textoBusqueda, setTextoBusqueda] = useState("");
  const [nivelSeleccionado, setNivelSeleccionado] = useState("Todos");

  

  const hechizosFiltrados = listaBase.filter(hechizo => {
    
    const coincideTexto = hechizo.name.toLowerCase().includes(textoBusqueda.toLowerCase());
    
    const coincideNivel = 
      nivelSeleccionado === "Todos" ||  hechizo.level.toString() === nivelSeleccionado;
    return coincideTexto && coincideNivel;
  });

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
          <option value="Todos">Nivel</option>
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
      </div>
      
      <div className="contenedor-lista">
        {hechizosFiltrados.length === 0 ? (
          <p style={{ color: 'gray' }}>No hay hechizos que coincidan con tu búsqueda.</p>
        ) : (
          
          hechizosFiltrados.map((hechizo) => (
            <SpellCard 
              key={hechizo.index}
              nombre={hechizo.name}
              nivel={hechizo.level}
              url={hechizo.url}
            />
          ))
        )}
      </div>

    </div>
  );
}