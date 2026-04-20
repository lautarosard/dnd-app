import React, {createContext, useContext, useState, useEffect} from 'react';

const CharacterContext = createContext();

export function CharacterProvider({children}) {
    const [personaje, setPersonaje] = useState(() => {
        try {
            const guardado = localStorage.getItem('pocket_character');
            return guardado ? JSON.parse(guardado) : {nombre: '', clase: '', nivel: '', recursos: null, hechizos: []};
        } catch (error) {
            console.error("Error leyendo el personaje:", error);
            return {nombre: '', clase: '', nivel: '', recursos: null, hechizos: []};
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
    
    const value = {
        personaje,
        actualizarPersonaje,
        borrarPersonaje,
        aprenderHechizo,
        olvidarHechizo,
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