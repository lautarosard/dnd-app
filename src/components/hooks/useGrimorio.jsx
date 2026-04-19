import React, { createContext, useContext, useState, useEffect } from 'react';

const GrimorioContext = createContext();

export function GrimorioProvider({children}) {
    const [hechizosGuardados, setHechizosGuardados] = useState(() => {
            try {
                const item = localStorage.getItem('pocket_grimoire_spells');
                return item ? JSON.parse(item) : [];
            } catch (error) {
                console.error("Error leyendo el grimorio:", error);
                return [];
            }
    });
    useEffect(() => {
        localStorage.setItem('pocket_grimoire_spells', JSON.stringify(hechizosGuardados));
    }, [hechizosGuardados]);
    const agregarHechizo = (nuevoHechizo) => {
        setHechizosGuardados((prev) => {
            // Evitamos duplicados
            const yaExiste = prev.some(h => h.url === nuevoHechizo.url);
            if (yaExiste) return prev;
            return [...prev, nuevoHechizo];
        });
    };
    const eliminarHechizo = (url) => {
        setHechizosGuardados((prev) => prev.filter(h => h.url !== url));
    };
    return (
        <GrimorioContext.Provider value={{ hechizosGuardados, agregarHechizo, eliminarHechizo }}>
            {children}
        </GrimorioContext.Provider>
    );
};
export function useGrimorio() {
    const context = useContext(GrimorioContext);
    if (!context) {
        throw new Error("useGrimorio debe usarse dentro de un GrimorioProvider")
    }
    return context;
}