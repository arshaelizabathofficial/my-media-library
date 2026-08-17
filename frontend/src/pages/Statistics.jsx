import { useEffect, useState } from "react";

import { getItems } from "../services/api";


function Statistics() {

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {

    async function loadItems() {

      try {

        const data = await getItems();

        setItems(data);

      } catch (error) {

        setError(error.message);

      } finally {

        setLoading(false);

      }

    }

    loadItems();

  }, []);


  if (loading) {
    return <h2>Loading statistics...</h2>;
  }


  if (error) {
    return (
      <h2 className="error">
        {error}
      </h2>
    );
  }


  // -------------------------
  // CALCULATE STATISTICS
  // -------------------------

  const totalItems = items.length;


  const movies = items.filter(
    (item) => item.type === "Movie"
  ).length;


  const tvShows = items.filter(
    (item) => item.type === "TV"
  ).length;


  const books = items.filter(
    (item) => item.type === "Book"
  ).length;


  const toWatch = items.filter(
    (item) => item.status === "Unfinished"
  ).length;


  const watched = items.filter(
    (item) => item.status === "Finished"
  ).length;


  const favorites = items.filter(
    (item) => item.favorite === true
  ).length;


  const ratedItems = items.filter(
    (item) => item.rating !== null &&
              item.rating !== undefined
  );


  const averageRating =
    ratedItems.length > 0
      ? (
          ratedItems.reduce(
            (total, item) =>
              total + item.rating,
            0
          ) / ratedItems.length
        ).toFixed(1)
      : "0.0";


  return (

    <div className="statistics">

      <h1>📊 Statistics</h1>

      <p>
        An overview of your media library.
      </p>


      <div className="stats-grid">

        {/* TOTAL */}

        <div className="stat-card">

          <div className="stat-icon">
            📚
          </div>

          <h2>{totalItems}</h2>

          <p>Total Items</p>

        </div>


        {/* MOVIES */}

        <div className="stat-card">

          <div className="stat-icon">
            🎬
          </div>

          <h2>{movies}</h2>

          <p>Movies</p>

        </div>


        {/* TV */}

        <div className="stat-card">

          <div className="stat-icon">
            📺
          </div>

          <h2>{tvShows}</h2>

          <p>TV Shows</p>

        </div>


        {/* BOOKS */}

        <div className="stat-card">

          <div className="stat-icon">
            📚
          </div>

          <h2>{books}</h2>

          <p>Books</p>

        </div>


        {/* TO WATCH */}

        <div className="stat-card">

          <div className="stat-icon">
            📋
          </div>

          <h2>{toWatch}</h2>

          <p>To Watch</p>

        </div>


        {/* WATCHED */}

        <div className="stat-card">

          <div className="stat-icon">
            ✅
          </div>

          <h2>{watched}</h2>

          <p>Watched</p>

        </div>


        {/* FAVORITES */}

        <div className="stat-card">

          <div className="stat-icon">
            ❤️
          </div>

          <h2>{favorites}</h2>

          <p>Favorites</p>

        </div>


        {/* RATING */}

        <div className="stat-card">

          <div className="stat-icon">
            ⭐
          </div>

          <h2>{averageRating}</h2>

          <p>Average Rating</p>

        </div>

      </div>

    </div>

  );
}


export default Statistics;