//App.jsx
import { useEffect, useState } from "react";

const App = () => {
  const [hero, setHero] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchRandomHero() {
      try {
        const response = await fetch(
          `https://www.superheroapi.com/api/${
            import.meta.env.REACT_APP_SUPERHERO_API_KEY
          }/random`
        );
        const data = await response.json();
        const randomHero = data.results[0]; // Select the first hero from the results array
        setHero(randomHero);
        setError(null); // Clear any previous errors
      } catch (error) {
        console.error("Error fetching random hero:", error);
        setHero(null); // Clear hero data in case of error
        setError("Failed to fetch hero data. Please try again."); // Set error message
      }
    }

    fetchRandomHero();
  }, []);

  return (
    <div>
      <h1>Superhero Random Story</h1>
      {error && <p>{error}</p>}
      {hero && (
        <div>
          <h2>{hero.name}</h2>
          <p>Full Name: {hero.biography["full-name"]}</p>
          <p>Place of Birth: {hero.biography["place-of-birth"]}</p>
          <p>Occupation: {hero.work.occupation}</p>
          <p>Base: {hero.work.base}</p>
          <p>
            One day,{hero.name}was sent to save the world, but the hero needed
            to find a team to work together. The hero started the way to seek
            other heroes to complete the task. The story started.{" "}
          </p>
          {/* Add more hero details as needed */}
          <img src={hero.image.url} alt={hero.name} />
        </div>
      )}
    </div>
  );
};

export default App;
