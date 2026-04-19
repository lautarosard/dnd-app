import "./Home.css";
import Hero from "../components/Hero/Hero";
import SpellDashboards from "../components/spells/SpellsDashboards";
import { useState, useEffect } from "react";
import MiGrimorio from "../components/Grimorio/MiGrimorio";

function Home() {
    
  return (
    <main>
      <Hero />
      <div id="seccion-hechizos">
        <SpellDashboards/>
        <MiGrimorio/>
      </div>      
    </main>
  );
}

export default Home;
