import { useState, useEffect } from "react";

export function useHistory() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("spellHistory");
    if (stored) {
      setHistory(JSON.parse(stored));
    }
  }, []);

  const addToHistory = (spell) => {
    setHistory((prev) => {
      // evitar duplicados
      const filtered = prev.filter((s) => s.index !== spell.index);

      const updated = [spell, ...filtered].slice(0, 10); // max 10

      localStorage.setItem("spellHistory", JSON.stringify(updated));
      return updated;
    });
  };

  return { history, addToHistory };
}
