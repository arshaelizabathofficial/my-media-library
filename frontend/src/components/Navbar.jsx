import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">

      <div className="navbar-brand">
        <Link to="/">
          🎬 My WatchList
        </Link>
      </div>

      <div className="nav-links">

        <Link to="/">
          🏠 Home
        </Link>

        <Link to="/favorites">
          ❤️ Favorites
        </Link>

        <Link to="/statistics">
          📊 Statistics
        </Link>

      </div>

    </nav>
  );
}

export default Navbar;