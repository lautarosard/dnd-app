import React from "react";
import CharacterBuilder from "../components/Character/CharacterBuilder";
import { Link } from "react-router-dom";

export default function ForjaPersonaje() {
    return(
        <main style={{ padding: '20px', minHeight: '100dvh', backgroundColor: '#1a1a1a', color: 'white' }}>
            <div style={{ marginBottom: '20px' }}>
                <Link to="/" style={{ color: '#f39c12', textDecoration: 'none', fontWeight: 'bold' }}>
                    Volver al Grimorio
                </Link>
            </div>
            <CharacterBuilder />
        </main>
    );
}