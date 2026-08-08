function Navbar() {
  return (
    <header className="navbar">
      <a className="brand" href="#" aria-label="RecipeFinder home">
        <span className="brand-icon">🍴</span>
        <span>Recipe<span>Finder</span></span>
      </a>

      <nav>
        <a href="#recipes">Recipes</a>
        <a href="#about">About</a>
      </nav>
    </header>
  );
}

export default Navbar;
