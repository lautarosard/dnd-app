import React, {useState, useEffect} from "react";
import {Loader} from '../shares/loading';
import './ClassCarousel.css';

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

export default function ClassCarousel({onClaseSeleccionada}) {
    const [clases, setClases] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [activeIndex, setActiveIndex] = useState(0);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);
    const [swipeOffset, setSwipeOffset] = useState(0);

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

    //logica del swipe
    const minSwipeDistance = 50;

    const onTouchStart = (e) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
        setSwipeOffset(0);
    };

    const onTouchMove = (e) => {
        const currentTouch = e.targetTouches[0].clientX;
        setTouchEnd(currentTouch);
        
        // Calculamos en vivo cuántos píxeles se movió el dedo respecto al inicio
        if (touchStart) {
            setSwipeOffset(currentTouch - touchStart);
        }
    };

    const onTouchEnd = (e) => {
        if (!touchStart || !touchEnd) {
            setSwipeOffset(0); // Si fue solo un tap, reseteamos
            return;
        }

        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        // Avanzamos o retrocedemos (con validación para no salirnos de los límites)
        if (isLeftSwipe && activeIndex < clases.length - 1) {
            nextSlide();
        } 
        if (isRightSwipe && activeIndex > 0) {
            prevSlide();
        }

        
        setTouchStart(null);
        setTouchEnd(null);
        setSwipeOffset(0);
    };

    const calcularEstilosTarjeta = (index) => {
        const transicionDinamica = swipeOffset !== 0 ? 'none' : 'all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)';
        const dif = index - activeIndex;
        if (dif === 0){
            return {
                transform: `translateX(${swipeOffset}px)`, 
           //     transform: 'none', el viejo transform
                zIndex: 10, 
                filter: 'none', 
                opacity: 1,
                transition: transicionDinamica 
            };
        } 
        if (dif > 0) {
            return {
                transform: `translateX(${(140 * dif) + swipeOffset}px) scale(${1 - 0.2 * dif}) perspective(16px) rotateY(-1deg)`,
        //        transform: `translateX(${140 * dif}px) scale(${1 - 0.2 * dif}) perspective(16px) rotateY(-1deg)`, el viejo transform
                zIndex: 10 - dif, 
                filter: 'blur(3px)', 
                opacity: dif > 2 ? 0 : 1 - (0.3 * dif),
                transition: transicionDinamica
            };
        }

        const absDif = Math.abs(dif);
        return {
            transform: `translateX(${(-140 * absDif) + swipeOffset}px) scale(${1 - 0.2 * absDif}) perspective(16px) rotateY(1deg)`,
      //      transform: `translateX(${-140 * absDif}px) scale(${1 - 0.2 * absDif}) perspective(16px) rotateY(1deg)`, 
            zIndex: 10 - absDif, 
            filter: 'blur(3px)', 
            opacity: absDif > 2 ? 0 : 1 - (0.3 * absDif),
            transition: transicionDinamica
        };
    };
    if (cargando) return <Loader message="Invocando arquetipos..."/>;
    const leftBtn = "<";
    const rightBtn = ">";
    return  (
        <div className="carousel-wrapper">
            <h2 className="carousel-title">Elige tu Clase</h2>
            <div className="slider-container"
            onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
                {clases.map((clase, index) => (
                    <div 
                        key={clase.index} 
                        className="dnd-tab-card" 
                        style={calcularEstilosTarjeta(index)}
                        onClick={() => setActiveIndex(index)}
                    >
                        {/* SECCIÓN SUPERIOR: Imagen con el recorte */}
                        <div 
                            className="top-section" 
                            style={{ 
                                backgroundImage: `url(${INFO_CLASES[clase.index]?.img || 'https://via.placeholder.com/250'})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'top center'
                            }}
                        >
                            <div className="border" />
                            {/* Iconos de redes sociales eliminados */}
                        </div>

                        {/* SECCIÓN INFERIOR: Stats y Textos */}
                        <div className="bottom-section">
                            <span className="title">{clase.name}</span>
                            
                            <p className="card-description">
                                {INFO_CLASES[clase.index]?.desc || "Una misteriosa clase de la que poco se sabe..."}
                            </p>

                            <div className="row row1">
                                <div className="item">
                                    <span className="big-text">d{clase.hit_die}</span>
                                    <span className="regular-text">Dado de Golpe</span>
                                </div>
                                <div className="item">
                                    <span className="big-text">
                                        {clase.saving_throws.map(st => st.name).join(', ')}
                                    </span>
                                    <span className="regular-text">Salvaciones</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="slider-controles">
                <button onClick={prevSlide} className="btn-prev" disabled={activeIndex === 0}>{leftBtn}</button>
                <button
                    onClick={() => onClaseSeleccionada(clases[activeIndex].index)} 
                    className="btn-agregar" 
                >
                    Elegir {clases[activeIndex]?.name}
                </button>
                <button onClick={nextSlide} className="btn-next" disabled={activeIndex === clases.length - 1}>{rightBtn}</button>
            </div>
        </div>
    );
}