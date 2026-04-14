import "./Home.css";
import Hero from "../components/Hero/Hero";
import SpellDashboards from "../components/spells/SpellsDashboards";
import { useState, useEffect } from "react";

function Home() {
    
  return (
    <main>
      <Hero />
      <div id="seccion-hechizos">
        <SpellDashboards/>
      </div>      
    </main>
  );
}

export default Home;
