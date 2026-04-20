import React, {useState, useEffect} from "react";
import {Loader} from '../shares/loading';
import './ClassCarousel.css';

const IMAGENES_CLASES = {
    barbarian: 'https://i.pinimg.com/736x/15/f7/6a/15f76ae48b1067ed91c96393d2dd2327.jpg',
    bard: 'https://i.pinimg.com/736x/99/f2/d2/99f2d264cac3b963038aec4853bf5bc5.jpg',
    cleric: 'https://i.pinimg.com/1200x/42/2f/0a/422f0a933e581ad0b022049d1b6f3412.jpg',
    druid: 'https://i.pinimg.com/736x/5a/55/c5/5a55c5e070c6805a92ae67d5097a62bd.jpg',
    fighter: 'https://i.pinimg.com/736x/b4/72/bb/b472bba4bc086094204a2dd98c055714.jpg',
    monk: 'https://i.pinimg.com/736x/55/4a/89/554a8999ceb42a8c733fb0ed6cf35db9.jpg',
    paladin: 'https://i.pinimg.com/webp70/1200x/5e/97/ee/5e97ee14ac4f09e06c4fa661e5f0e530.webp',
    ranger: 'https://i.pinimg.com/1200x/94/3b/f1/943bf1b79dcab3d2b529e904c15a76c9.jpg',
    rogue: 'https://i.pinimg.com/736x/ba/bb/c5/babbc59a56b9787ea2066fd33d0309b0.jpg',
    sorcerer: 'https://i.pinimg.com/736x/58/da/24/58da24080a1287ca4a7a2c0549702670.jpg',
    warlock: 'https://i.pinimg.com/736x/ab/3e/a3/ab3ea3ec155a89a133d449ad5e311367.jpg',
    wizard: 'https://i.pinimg.com/736x/6d/ef/3f/6def3f7143f8abe39e2bcb394e80b6d9.jpg'
};

export default function ClassCarousel({onClaseSeleccionada}) {
    const [clases, setClases] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const fetchClasses = async () => {
            const query = `
                query {
                    classes {
                        index
                        name
                        hit_die
                        saving_throws {
                            name
                        }
                    }
                }
            `;

            try {
                const response = await fetch('https://www.dnd5eapi.co/graphql', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ query }),
                });
                if (!response.ok) throw new Error("Error consultando el compendio de clases");
                const result = await response.json();

                setClases(result.data.classes);
                setActiveIndex(Math.floor(result.data.classes.length / 2));
            } catch (error) {
                console.error(error);
            } finally {
                setCargando(false);
            }
        };
        fetchClasses();
    }, []);

    const nextSlide = () => setActiveIndex(prev => (prev + 1 < clases.length ? prev +1 : prev));
    const prevSlide = () => setActiveIndex(prev => (prev - 1 >= 0 ? prev -1 : prev));

    const calcularEstilosTarjeta = (index) => {
        const dif = index - activeIndex;
        if (dif === 0) return { transform: 'none', zIndex: 10, filter: 'none', opacity: 1 };
        if (dif > 0) {
            return {
                transform: `translateX(${140 * dif}px) scale(${1 - 0.2 * dif}) perspective(16px) rotateY(-1deg)`,
                zIndex: 10 - dif, 
                filter: 'blur(3px)', 
                opacity: dif > 2 ? 0 : 1 - (0.3 * dif)
            };
        }
        const absDif = Math.abs(dif);
        return {
            transform: `translateX(${-140 * absDif}px) scale(${1 - 0.2 * absDif}) perspective(16px) rotateY(1deg)`, 
            zIndex: 10 - absDif, 
            filter: 'blur(3px)', 
            opacity: absDif > 2 ? 0 : 1 - (0.3 * absDif)
        };
    };
    if (cargando) return <Loader message="Invocando arquetipos..."/>;
    return  (
        <div className="carousel-wrapper">
            <h2 className="carousel.title">Elige tu Clase</h2>
            <div className="slider-container">
                {clases.map((clase, index) => (
                    <div
                        key={clase.index} 
                        className="pokemon-card" 
                        style={calcularEstilosTarjeta(index)}
                        onClick={() => setActiveIndex(index)}
                    >
                        {/* IMAGEN DE LA CARTA */}
                        <div className="card-image-container">
                            {/* Si no encuentra la imagen, pone un div gris de fallback */}
                            <img 
                                src={IMAGENES_CLASES[clase.index] || 'https://via.placeholder.com/250x150/2c3e50/ffffff?text=???'} 
                                alt={clase.name} 
                                className="card-image"
                            />
                        </div>

                        <div className="card-body">
                            <h3 className="card-name">{clase.name}</h3>

                            <div className="card-stats">
                                <div className="stat-row">
                                    <span className="stat-label">Dado de Golpe:</span>
                                    <span className="stat-value">d{clase.hit_die}</span>
                                </div>
                                <div className="stat-row">
                                    <span className="stat-label">Salvaciones:</span>
                                    <span className="stat-value">
                                        {clase.saving_throws.map(st => st.name).join(', ')}
                                    </span>
                                </div>
                            </div>
                        </div>    
                    </div>
                ))}
            </div>
            <div className="slider-controles">
                <button onClick={prevSlide} className="btn-circular" disabled={activeIndex === 0}>←</button>
                <button
                    onClick={() => onClaseSeleccionada(clases[activeIndex].index)} 
                    className="btn-agregar" 
                    style={{ width: '250px' }}
                >
                    Elegir {clases[activeIndex]?.name}
                </button>
                <button onClick={nextSlide} className="btn-circular" disabled={activeIndex === clases.length - 1}>→</button>
            </div>
        </div>
    );
}