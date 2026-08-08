import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import RecipeCard from "./components/RecipeCard";
import RecipeDetails from "./components/RecipeDetails";
import "./App.css";

const API_BASE = "https://www.themealdb.com/api/json/v1/1";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  const fetchRecipes = async (term = "") => {
    setLoading(true);
    setError("");
    setSearched(Boolean(term.trim()));

    try {
      const endpoint = term.trim()
        ? `${API_BASE}/search.php?s=${encodeURIComponent(term.trim())}`
        : `${API_BASE}/search.php?f=a`;

      const response = await fetch(endpoint);

      if (!response.ok) {
        throw new Error("Unable to contact the recipe service.");
      }

      const data = await response.json();
      setRecipes(data.meals || []);

      if (!data.meals && term.trim()) {
        setError(`No recipes found for "${term.trim()}". Try another search.`);
      }
    } catch (err) {
      setRecipes([]);
      setError("Unable to load recipes right now. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const handleSearch = () => {
    fetchRecipes(searchTerm);
  };

  const handleSelectRecipe = async (id) => {
    setDetailsLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_BASE}/lookup.php?i=${id}`);

      if (!response.ok) {
        throw new Error("Unable to load recipe details.");
      }

      const data = await response.json();

      if (data.meals?.length) {
        setSelectedRecipe(data.meals[0]);
      } else {
        setError("Recipe details could not be found.");
      }
    } catch {
      setError("Unable to load recipe details. Please try again.");
    } finally {
      setDetailsLoading(false);
    }
  };

  return (
    <div className="app">
      <Navbar />

      <main>
        <section className="hero">
          <div className="hero-overlay" />
          <div className="hero-content">
            <span className="eyebrow">RECIPE DISCOVERY SYSTEM</span>
            <h1>
              Discover Your Next
              <span>Favorite Recipe</span>
            </h1>
            <p>
              Search delicious recipes from around the world and find
              something amazing to cook today.
            </p>

            <SearchBar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              onSearch={handleSearch}
            />

            <div className="hero-tags">
              <span>🍝 Pasta</span>
              <span>🍗 Chicken</span>
              <span>🍕 Pizza</span>
              <span>🥗 Healthy</span>
            </div>
          </div>
        </section>

        <section className="recipe-section">
          <div className="section-heading">
            <div>
              <span className="section-label">
                {searched ? "SEARCH RESULTS" : "EXPLORE"}
              </span>
              <h2>
                {searched ? `Recipes for "${searchTerm}"` : "Popular Recipes"}
              </h2>
            </div>

            {!loading && recipes.length > 0 && (
              <span className="result-count">
                {recipes.length} recipe{recipes.length !== 1 ? "s" : ""}
              </span>
            )}
          </div>

          {loading && (
            <div className="status-box">
              <div className="spinner" />
              <h3>Finding delicious recipes...</h3>
              <p>Please wait while we fetch the latest results.</p>
            </div>
          )}

          {!loading && error && (
            <div className="status-box error-box">
              <div className="status-icon">🍽️</div>
              <h3>Oops!</h3>
              <p>{error}</p>
              <button
                className="secondary-button"
                onClick={() => fetchRecipes(searchTerm)}
              >
                Try Again
              </button>
            </div>
          )}

          {!loading && !error && recipes.length === 0 && (
            <div className="status-box">
              <div className="status-icon">🔎</div>
              <h3>No recipes available</h3>
              <p>Try searching for chicken, pasta, beef, pizza, or rice.</p>
            </div>
          )}

          {!loading && recipes.length > 0 && (
            <div className="recipe-grid">
              {recipes.map((recipe) => (
                <RecipeCard
                  key={recipe.idMeal}
                  recipe={recipe}
                  onSelect={handleSelectRecipe}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      {detailsLoading && (
        <div className="details-loading">
          <div className="spinner" />
          <p>Loading recipe...</p>
        </div>
      )}

      <RecipeDetails
        recipe={selectedRecipe}
        onClose={() => setSelectedRecipe(null)}
      />

      <footer>
        <div>
          <strong>🍴 RecipeFinder</strong>
          <span>Built with React & Fetch API</span>
        </div>
        <p>© 2026 Recipe Discovery & Search System</p>
      </footer>
    </div>
  );
}

export default App;
