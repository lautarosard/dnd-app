import "./Home.css";
import Hero from "../components/Hero/Hero"
import RecentSpells from "../components/recentSpells/RecentSpell";
import FeaturedSpells from "../components/FeaturedSpells/FeaturedSpells";

function Home() {
  return (
    <main>
      <Hero />
      <RecentSpells />
      <FeaturedSpells />
    </main>
  );
}

export default Home;
