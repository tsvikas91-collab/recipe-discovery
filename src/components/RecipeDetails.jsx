function getIngredients(recipe) {
  const ingredients = [];

  for (let i = 1; i <= 20; i += 1) {
    const ingredient = recipe[`strIngredient${i}`]?.trim();
    const measure = recipe[`strMeasure${i}`]?.trim();

    if (ingredient) {
      ingredients.push({
        ingredient,
        measure: measure || ""
      });
    }
  }

  return ingredients;
}

function RecipeDetails({ recipe, onClose }) {
  if (!recipe) return null;

  const ingredients = getIngredients(recipe);

  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <div
        className="details-modal"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button className="close-button" onClick={onClose} aria-label="Close">
          ×
        </button>

        <div className="details-image">
          <img src={recipe.strMealThumb} alt={recipe.strMeal} />
        </div>

        <div className="details-content">
          <span className="section-label">
            {recipe.strCategory || "RECIPE"}
          </span>
          <h2>{recipe.strMeal}</h2>

          <div className="meta-row">
            <span>🌍 {recipe.strArea || "International"}</span>
            {recipe.strTags && <span>🏷️ {recipe.strTags.split(",")[0]}</span>}
          </div>

          <div className="details-columns">
            <div>
              <h3>Ingredients</h3>
              <ul className="ingredients-list">
                {ingredients.map(({ ingredient, measure }) => (
                  <li key={`${ingredient}-${measure}`}>
                    <span>{ingredient}</span>
                    <small>{measure}</small>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3>Instructions</h3>
              <p className="instructions">{recipe.strInstructions}</p>
            </div>
          </div>

          {recipe.strYoutube && (
            <a
              className="youtube-link"
              href={recipe.strYoutube}
              target="_blank"
              rel="noreferrer"
            >
              ▶ Watch Recipe Video
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default RecipeDetails;
