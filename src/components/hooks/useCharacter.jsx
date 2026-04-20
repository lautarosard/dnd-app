import React, {createContext, useContext, useState, useEffect} from 'react';

const CharacterContext = createContext();

export function CharacterProvider({children}) {
    const [personaje, setPersonaje] = useState(() => {
        try {
            const guardado = localStorage.getItem('pocket_character');
            if (guardado) {
                const pj = JSON.parse(guardado);
                return {
                    ...pj,
                    hechizos: pj.hechizos || [],
                    // MAGIA DE MIGRACIÓN: Si el personaje es viejo, le inyectamos los slots vacíos
                    slotsGastados: pj.slotsGastados || [0,0,0,0,0,0,0,0,0] 
                };
            }
            return { nombre: '', clase: '', nivel: '', recursos: null, hechizos: [], slotsGastados: [0,0,0,0,0,0,0,0,0] };
        } catch (error) {
            console.error("Error leyendo el personaje:", error);
            return { nombre: '', clase: '', nivel: '', recursos: null, hechizos: [], slotsGastados: [0,0,0,0,0,0,0,0,0] };
        }
    });

    useEffect(() => {
        localStorage.setItem('pocket_character', JSON.stringify(personaje));
    }, [personaje]);

    const actualizarPersonaje = (nuevosDatos) => {
        setPersonaje(prev => ({...prev, ...nuevosDatos}));
    };

    const borrarPersonaje = () => {
        setPersonaje({ nombre: '', clase: '', nivel: '', recursos: null, hechizos: [] });
    };

    const aprenderHechizo = (hechizo) => {
        if (personaje.hechizos.some(h => h.index === hechizo.index)){
            alert("Tu personaje ya conoce este hechizo");
            return;
        }
        if (hechizo.level === 0){
            const trucosActuales = personaje.hechizos.filter(h => h.level === 0).length;
            const tructosMaximos = personaje.recursos?.cantrips || 0;

            if (trucosActuales >= trucosMaximos) {
                alert(`Tu clase solo te permite conocer ${trucosMaximos} trucos en este nivel.`);
                return;
            }
        }
        setPersonaje(prev => ({
            ...prev,
            hechizos: [...prev.hechizos, hechizo]
        }));
    };
    const olvidarHechizo = (hechizoIndex) => {
        setPersonaje(prev => ({
            ...prev,
            hechizos: prev.hechizos.filter(h => h.index !== hechizoIndex)
        }));
    };

    const lanzarHechizo = (nivelHechizo) => {
        if (nivelHechizo === 0) return; //los trucos no gastan slots

        const indice = nivelHechizo -1;
        setPersonaje(prev => {
            const nuevosGastados = [...prev.slotsGastados];
            nuevosGastados[indice] += 1; //Aumentamos el contador de gastados
            return {...prev, slotsGastados: nuevosGastados};
        });
    };

    const descansoLargo = () => {
        setPersonaje(prev => ({...prev, slotsGastados: [0,0,0,0,0,0,0,0,0]}));
        alert("El descanso te ha devuelto tu vitalidad mágica.");
    };
    
    const value = {
        personaje,
        actualizarPersonaje,
        borrarPersonaje,
        aprenderHechizo,
        olvidarHechizo,
        lanzarHechizo,
        descansoLargo,
        estaConfigurado: !!personaje.clase
    };
    return (
        <CharacterContext.Provider value={value}>
            {children}
        </CharacterContext.Provider>
    );
}

export function useCharacter() {
    const context = useContext(CharacterContext);
    if (!context) {
        throw new Error("useCharacter debe usarse dentro de un CharacterProvider");
    }
    return context;
}