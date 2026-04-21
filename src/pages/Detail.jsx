import { useParams } from 'react-router-dom';
import { useHistory } from "../components/hooks/useHistory"; // Verifica que la ruta sea correcta
import { useEffect, useState } from 'react';

// CLAVE: Añadimos 'export default' aquí
export default function SpellDetail() {
  const { id } = useParams();
  const [spell, setSpell] = useState(null);
  const { addToHistory } = useHistory();

  useEffect(() => {
    // 1. Buscamos los datos del hechizo
    fetch(`https://www.dnd5eapi.co/api/spells/${id}`)
      .then(res => res.json())
      .then(data => {
        setSpell(data);
        // 2. Lo agregamos al historial una vez cargado
        if (data && data.name) {
          addToHistory(data);
        }
      })
      .catch(err => console.error("Error al cargar detalle:", err));
  }, [id, addToHistory]);

  if (!spell) return (
    <div className="contenedor-loader">
      <p>Consultando las runas del tiempo...</p>
    </div>
  );

  return (
    <div className="detail-view" style={{ padding: '20px', color: 'var(--color-text-primary)' }}>
      <h1 style={{ color: 'var(--color-gold)' }}>{spell.name}</h1>

      <div className="info-box" style={{ background: 'var(--color-surface)', padding: '15px', borderRadius: '10px' }}>
        <p><strong>Nivel:</strong> {spell.level === 0 ? "Truco" : `Nivel ${spell.level}`}</p>
        <p><strong>Escuela:</strong> {spell.school?.name}</p>
        <p><strong>Tiempo de lanzamiento:</strong> {spell.casting_time}</p>
        <p><strong>Rango:</strong> {spell.range}</p>
        <p><strong>Duración:</strong> {spell.duration}</p>

        <hr style={{ borderColor: 'var(--color-card)', margin: '15px 0' }} />

        <p className="descripcion">
          {spell.desc?.join(' ')}
        </p>
      </div>
    </div>
  );
}
