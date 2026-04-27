import React, {useState} from "react";
import { useEffect } from "react";
import { Loader } from '../shares/loading';
import { useCharacter } from '../hooks/useCharacter';
import './CharacterBuilder.css';
import ClassCarousel from "./ClassCarousel";
import Toast from "../shares/Toast";

export default function CharacterBuilder(){
    const [nombre, setNombre] = useState('');
    const [clase, setClase] = useState('');
    const [nivel, setNivel] = useState('');
    
    const [mensajeToast, setMensajeToast] = useState("");

    const {actualizarPersonaje} = useCharacter();

    const [paso, setPaso] = useState(1);
    
    const [matrizClase, setMatrizClase] = useState([]);
    const [cargandoClase, setCargandoClase] = useState(false);

    useEffect(() => {
        if (!clase) {
            setMatrizClase([]);
            return;
        }

        const fetchClassLevels = async() => {
            setCargandoClase(true);

            const query = `
                query {
                    class(index: "${clase}") {
                    class_levels {
                        level
                        spellcasting {
                        cantrips_known
                        spell_slots_level_1
                        spell_slots_level_2
                        spell_slots_level_3
                        spell_slots_level_4
                        spell_slots_level_5
                        spell_slots_level_6
                        spell_slots_level_7
                        spell_slots_level_8
                        spell_slots_level_9
                        }
                    }
                    }
                }
            `;
            try {
                const response = await fetch('https://www.dnd5eapi.co/graphql', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json'},
                    body: JSON.stringify({ query }),
                });
                if (!response.ok) throw new Error("Error consultando los archivos arcanos");
                const result = await response.json();
                setMatrizClase(result.data.class.class_levels);
            } catch(error){
                console.error("Fallo al traer la progresión", error);
            } finally {
                setCargandoClase(false);
            }
        };
        fetchClassLevels();
    }, [clase]);

    const manejarClaseSeleccionada = (claseIndex) => {
        setClase(claseIndex);
        setPaso(2);
    };

    const manejarGuardado = (e) => {
        e.preventDefault(); //que no se recargue la pagina por dios
        if (!nombre || !clase || !nivel) {
            setMensajeToast("Faltan datos en tu hoja de personaje.");
            return;
        }
        const nivelNum = parseInt(nivel);
        const datosDelNivel = matrizClase.find(l => l.level === nivelNum);

        // extraer los slots si es que la clase tiene magia, porque depende de la clase
        const magia = datosDelNivel?.spellcasting;
        const recursosMagicos = magia ? {
            cantrips: magia.cantrips_known || 0,
            slots: [
                magia.spell_slots_level_1 || 0,
                magia.spell_slots_level_2 || 0,
                magia.spell_slots_level_3 || 0,
                magia.spell_slots_level_4 || 0,
                magia.spell_slots_level_5 || 0,
                magia.spell_slots_level_6 || 0,
                magia.spell_slots_level_7 || 0,
                magia.spell_slots_level_8 || 0,
                magia.spell_slots_level_9 || 0
            ]
        } : {cantrips: 0, slots: [0,0,0,0,0,0,0,0,0]};
        actualizarPersonaje({
            nombre: nombre,
            clase: clase,
            nivel: nivelNum,
            recursos: recursosMagicos
        });
    };

    return (
        <div className="character-builder-container">
            {paso === 1 && (
                <ClassCarousel onClaseSeleccionada={manejarClaseSeleccionada} />
            )}

            {paso === 2 && (
                <div className="paso-animado" style={{ animation: 'fadeIn 0.5s' }}>
                    <button onClick={() => setPaso(1)} style={{ background: 'none', border: 'none', color: '#95a5a6', cursor: 'pointer', marginBottom: '20px' }}>
                        ← Cambiar Clase
                    </button>
                    
                    <h2>Forjar Personaje</h2>
                    <p style={{ textTransform: 'capitalize' }}>Clase seleccionada: <strong>{clase}</strong></p>

                    <form onSubmit={manejarGuardado} className="form-personaje">
                        <div className="form-grupo">
                            <label>Nombre del Aventurero</label>
                            <input 
                                type="text" value={nombre} 
                                onChange={(e) => setNombre(e.target.value)} 
                                placeholder="Ej: Eldor el Sabio" className="input-buscador" 
                            />
                        </div>

                        {cargandoClase ? (<Loader message="Consultando tomos..."/>) : (
                            <div className="form-grupo">
                                <label>Nivel Total</label>
                                <input 
                                    type="number" min="1" max="20" value={nivel} 
                                    onChange={(e) => setNivel(e.target.value)} 
                                    placeholder="Nivel (1 - 20)" className="input-buscador"
                                />
                            </div>
                        )}

                        <button type="submit" className="btn-agregar" style={{ marginTop: '15px', width: '100%' }} disabled={cargandoClase}>
                            Concluir Creación
                        </button>
                        <Toast mensaje={mensajeToast} onClose={() => setMensajeToast("")} />
                    </form>
                </div>
            )}
        </div>
    );
    
}