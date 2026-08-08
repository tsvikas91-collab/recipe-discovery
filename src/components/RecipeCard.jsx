function RecipeCard({ recipe, onSelect }) {
  return (
    <article className="recipe-card">
      <div className="card-image-wrap">
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          loading="lazy"
        />
        <span className="category-badge">
          {recipe.strCategory || "Recipe"}
        </span>
      </div>

      <div className="recipe-info">
        <span className="cuisine">
          🌍 {recipe.strArea || "International"}
        </span>

        <h3>{recipe.strMeal}</h3>

        <button
          className="view-button"
          onClick={() => onSelect(recipe.idMeal)}
        >
          View Recipe <span>→</span>
        </button>
      </div>
    </article>
  );
}

export default RecipeCard;
