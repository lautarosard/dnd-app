import { useEffect } from "react";
import { useState } from "react";

export function useSpells() {
    const [spells, setSpells] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSpells = async () => {
            const query = `
                query GetAllSpellsWithClasses {
                    spells {
                        index
                        name
                        level
                        school {
                            name
                        }
                        classes {
                            index
                            name
                        }
                    }
                }            
            `;
            try {
                const response = await fetch('https://www.dnd5eapi.co/graphql', {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify({query}),
                });
                if (!response.ok) throw new Error('Error de red al consultar la API');
                const result = await response.json();
                setSpells(result.data.spells);
            }catch (err){
                setError (err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchSpells();
    }, []);
    return {spells, loading, error};
}