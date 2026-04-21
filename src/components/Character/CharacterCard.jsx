import React from 'react';
import { useCharacter } from '../hooks/useCharacter';
import './CharacterCard.css';

// Reutilizamos las imágenes épicas que ya definió tu compañero
const INFO_CLASES = {
  barbarian: {
    img: 'https://i.pinimg.com/736x/15/f7/6a/15f76ae48b1067ed91c96393d2dd2327.jpg',
    desc: 'El feroz guerrero primitivo'
  },
  bard: {
    img: 'https://i.pinimg.com/736x/99/f2/d2/99f2d264cac3b963038aec4853bf5bc5.jpg',
    desc: 'Un artista mágico elocuente.'
  },
  cleric: {
    img: 'https://i.pinimg.com/1200x/42/2f/0a/422f0a933e581ad0b022049d1b6f3412.jpg',
    desc: 'El campeón sacerdotal'
  },
  druid: {
    img: 'https://i.pinimg.com/736x/5a/55/c5/5a55c5e070c6805a92ae67d5097a62bd.jpg',
    desc: 'El guardián de la naturaleza.'
  },
  fighter: {
    img: 'https://i.pinimg.com/736x/b4/72/bb/b472bba4bc086094204a2dd98c055714.jpg',
    desc: 'El maestro del combate'
  },
  monk: {
    img: 'https://i.pinimg.com/736x/55/4a/89/554a8999ceb42a8c733fb0ed6cf35db9.jpg',
    desc: 'El artista marcial'
  },
  paladin: {
    img: 'https://i.pinimg.com/webp70/1200x/5e/97/ee/5e97ee14ac4f09e06c4fa661e5f0e530.webp',
    desc: 'El guerrero sagrado '
  },
  ranger: {
    img: 'https://i.pinimg.com/1200x/94/3b/f1/943bf1b79dcab3d2b529e904c15a76c9.jpg',
    desc: 'El rastreador y cazador'
  },
  rogue: {
    img: 'https://i.pinimg.com/736x/ba/bb/c5/babbc59a56b9787ea2066fd33d0309b0.jpg',
    desc: 'El rufian sigiloso'
  },
  sorcerer: {
    img: 'https://i.pinimg.com/736x/58/da/24/58da24080a1287ca4a7a2c0549702670.jpg',
    desc: 'El conjurador innato'
  },
  warlock: {
    img: 'https://i.pinimg.com/736x/ab/3e/a3/ab3ea3ec155a89a133d449ad5e311367.jpg',
    desc: 'El mistico bajo pacto'
  },
  wizard: {
    img: 'https://i.pinimg.com/736x/6d/ef/3f/6def3f7143f8abe39e2bcb394e80b6d9.jpg',
    desc: 'El erudito de la magia'
  }
};


export default function CharacterCard() {
  const { personaje } = useCharacter();

  if (!personaje) return null;

  const claseId = personaje.clase?.toLowerCase();
  const imagenUrl = INFO_CLASES[claseId]?.img || 'https://via.placeholder.com/400x600?text=Heroe';

  return (
    <div className="hero-card">
      <div className="hero-image-container">
        {/* Agregamos key para que React fuerce la carga si cambia el personaje */}
        <img
          key={imagenUrl}
          src={imagenUrl}
          alt={personaje.nombre}
          className="hero-image"
        />
        <div className="hero-overlay"></div>
        <div className="hero-badge">{personaje.nivel}</div>
      </div>
      <div className="hero-info">
        <h3>{personaje.nombre}</h3>
        <p className="hero-class-name">{personaje.clase}</p>

        <div className="hero-stats-row">
          <div className="stat-item">
            <span className="stat-value">{personaje.recursosMagicos?.cantrips || 0}</span>
            <span className="stat-label">Trucos</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{personaje.hechizos?.length || 0}</span>
            <span className="stat-label">Hechizos</span>
          </div>
        </div>
      </div>
    </div>
  );

}
