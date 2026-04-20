import React, {createContext, useContext, useState, useEffect} from 'react';

const CharacterContext = createContext();

export function CharacterProvider({children}) {
    const [personaje, setPersonaje] = useState(() => {
        try {
            const guardado = localStorage.getItem('pocket_character');
            return guardado ? JSON.parse(guardado) : {nombre: '', clase: '', nivel: '', recursos: null};
        } catch (error) {
            console.error("Error leyendo el personaje:", error);
            return {nombre: '', clase: '', nivel: '', recursos: null};
        }
    });
    useEffect(() => {
        localStorage.setItem('pocket_character', JSON.stringify(personaje));
    }, [personaje]);

    const actualizarPersonaje = (nuevosDatos) => {
        setPersonaje(prev => ({...prev, ...nuevosDatos}));
    };

    const borrarPersonaje = () => {
        setPersonaje({ nombre: '', clase: '', nivel: '', recursos: null });
    };
    
    const value = {
        personaje,
        actualizarPersonaje,
        borrarPersonaje,
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