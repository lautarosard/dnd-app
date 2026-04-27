import React from 'react';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import './Contact.css';
// Reutilizamos estilos de formularios
import '../components/Character/CharacterBuilder.css'; 

// Fix para el icono del marcador de Leaflet (a veces no carga en build)
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

export default function Contacto() {
    // Coordenadas de ejemplo (La Plata, como en tu imagen)
    const posicion = [-34.9214, -57.9546]; 

    return (
        <main className="contacto-page">
            <div className="cabecera-contacto">
                <Link to="/" className="btn-volver">← Volver al Grimorio</Link>
                <h2>Contactar con los Escribas</h2>
                <p>Envía un mensaje a través de los planos astrales (o usa el formulario).</p>
            </div>

            <div className="layout-contacto">
                {/* COLUMNA IZQ: Formulario */}
                <section className="seccion-formulario character-builder-container">
                    <form className="form-personaje">
                        <div className="form-grupo">
                            <label>Nombre o Alias</label>
                            <input type="text" placeholder="Ej: Mordenkainen" className="input-buscador" />
                        </div>
                        <div className="form-grupo">
                            <label>Gema de Contacto (Email)</label>
                            <input type="email" placeholder="tu@cristal.com" className="input-buscador" />
                        </div>
                        <div className="form-grupo">
                            <label>Tu Mensaje o Petición</label>
                            <textarea placeholder="Escribe tus runas aquí..." className="input-buscador" rows="5"></textarea>
                        </div>
                        <button type="submit" className="btn-agregar">
                            Enviar Misiva
                        </button>
                    </form>
                </section>

                {/* COLUMNA DER: Info y Mapa */}
                <section className="seccion-info">
                    <div className="info-box character-builder-container">
                        <h3>Ubicación de la Torre</h3>
                        <p>Calle Falsa 123, Plano Material</p>
                        <p>Horario: Lun a Vie, 9 solsticios a 18 solsticios</p>
                    </div>

                    {/* MAPA INTERACTIVO */}
                    <div className="mapa-container">
                        <MapContainer center={posicion} zoom={13} scrollWheelZoom={false} className="mapa-interactivo">
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker position={posicion}>
                                <Popup>
                                    ¡Aquí forjamos el Grimorio!
                                </Popup>
                            </Marker>
                        </MapContainer>
                    </div>
                </section>
            </div>
        </main>
    );
}