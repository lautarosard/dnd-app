import React from 'react';
import SpellsDashboard from '../components/spells/SpellsDashboards'; // Ajustá la ruta si es necesario
import MiGrimorio from '../components/Grimorio/MiGrimorio'; // Ajustá la ruta si es necesario

function Explorar() {
  return (
    /* Le ponemos la misma clase "home" u otra contenedora para que respete el margen del Navbar */
    <main className="home" style={{ minHeight: '100vh', paddingBottom: '40px' }}>
      
      {/* Sección del buscador general */}
      <section className="home-section">
        <div className="section-header">
          <h2>Explorar Hechizos</h2>
        </div>
        <SpellsDashboard />
      </section>

      {/* Sección del Grimorio del usuario */}
      <section className="home-section" style={{ marginTop: '40px' }}>
        <div className="section-header">
          <h2>Mi Grimorio</h2>
        </div>
        {/* Le pasamos preview={false} si querés que se vea completo y no como en el Home */}
        <MiGrimorio preview={false} /> 
      </section>

    </main>
  );
}

export default Explorar;