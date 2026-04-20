import React, {createContext, useContext, useState, useEffect} from "react";

const CharacterContext = createContext();

const SPELL_SLOTS_TABLE = {
    1: { slots: [2, 0, 0, 0, 0, 0, 0, 0, 0], cantrips: 2 },
    2: { slots: [3, 0, 0, 0, 0, 0, 0, 0, 0], cantrips: 2 },
    3: { slots: [4, 2, 0, 0, 0, 0, 0, 0, 0], cantrips: 2 },
    4: { slots: [4, 3, 0, 0, 0, 0, 0, 0, 0], cantrips: 3 },
    5: { slots: [4, 3, 2, 0, 0, 0, 0, 0, 0], cantrips: 3 },
};

export function CharacterProvider ({children}) {
    const [personaje, setPersonaje] = useState(() => {
        const guardado = localStorage.getItem('pocket_character');
        return guardado ? JSON.parse(guardado) : { nombre: '', clase: '', nivel: 1 };
    })

    useEffect(() => {
        localStorage.setItem('pocket_character', JSON.stringify(personaje));
    }, [personaje]);

    const obtenerRecursosActuales = () => {
        const datosNivel = SPELL_SLOTS_TABLE[personaje.nivel] || SPELL_SLOTS_TABLE[1];
        return {
            slots: datosNivel.slots,
            trucosConocidos: datosNivel.cantrips
        };
    };

    const actualizarPersonaje = (nuevosDatos) => {
        setPersonaje(prev => ({...prev, ...nuevosDatos}));
    };
    const value = {
        personaje,
        actualizarPersonaje,
        recursos: obtenerRecursosActuales(),
        estaConfigurado: !!personaje.clase
    };

    return (
        <CharacterContext.Provider value={value}>
            {children}
        </CharacterContext.Provider>
    );
}

export function useCharacter(){
    return useContext(CharacterContext);
}
