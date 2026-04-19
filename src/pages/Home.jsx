import "./Home.css";
import Hero from "../components/Hero/Hero";
import SpellDashboards from "../components/spells/SpellsDashboards";
import { useState, useEffect } from "react";
import MiGrimorio from "../components/Grimorio/MiGrimorio";
import { GrimorioProvider } from "../components/hooks/useGrimorio";

function Home() {
    
  return (
    <main>
      <Hero />
      <GrimorioProvider>
        <div className="layout-principal">
          <div id="seccion-hechizos">
            <SpellDashboards/>
          </div>
          <div id = "seccion-grimorio">
            <MiGrimorio/>
          </div>
        </div>
      </GrimorioProvider>      
    </main>
  );
}

export default Home;
