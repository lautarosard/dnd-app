import { useEffect } from "react";
import { useState } from "react";

export const useGrimorio = () => {
    const [hechizosGuardados, setHechizosGuardados] = useState(() => {
        try {
            const item = window.localStorage.getItem('pocket_grimoire_spells');
            return item ? JSON.parse(item) : [];
        } catch (error) {
            console.error("Error al leer localStorage", error);
            return [];
        }
        
    });

    useEffect(() => {
        try {
            window.localStorage.setItem('pocket_grimoire_spells', JSON.stringify(hechizosGuardados));
        } catch(error) {
            console.error("Error al guardar en localStorage", error);
        }

    }, [hechizosGuardados]);
    const agregarHechizo = (hechizo) => {
            setHechizosGuardados((prev) => {
                const yaExiste = prev.find(h => h.url === hechizo.url);
                if (yaExiste){
                    alert("Este hechizo ya está en tu grimorio!"); //cambiar por algun componente copado
                    return prev;
                }
                return [...prev, hechizo];
            });
        }

    const eliminarHechizo = (url) => {
        setHechizosGuardados((prev) => prev.filter(h => h.url !== url))
    };
    return {hechizosGuardados, agregarHechizo, eliminarHechizo};
};