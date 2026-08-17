import { useEffect, useState } from "react";

import ItemCard from "../components/ItemCard";

import {
  getItems,
  updateItem,
  deleteItem,
} from "../services/api";


function Favorites() {

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {

    async function loadFavorites() {

      try {

        const data = await getItems();

        const favoriteItems = data.filter(
          (item) => item.favorite === true
        );

        setItems(favoriteItems);

      } catch (error) {

        setError(error.message);

      } finally {

        setLoading(false);

      }

    }

    loadFavorites();

  }, []);


  async function handleUpdate(id, data) {

    try {

      const updatedItem = await updateItem(id, data);

      if (data.favorite === false) {

        setItems((currentItems) =>
          currentItems.filter(
            (item) => item.id !== id
          )
        );

      } else {

        setItems((currentItems) =>
          currentItems.map((item) =>
            item.id === id
              ? updatedItem
              : item
          )
        );

      }

    } catch (error) {

      setError(error.message);

    }

  }


  async function handleDelete(id) {

    try {

      await deleteItem(id);

      setItems((currentItems) =>
        currentItems.filter(
          (item) => item.id !== id
        )
      );

    } catch (error) {

      setError(error.message);

    }

  }


  if (loading) {
    return <h2>Loading favorites...</h2>;
  }


  return (

    <div className="home">

      <h1>❤️ Favorites</h1>

      <p>
        Your favorite movies, TV shows, and books.
      </p>


      {error && (
        <p className="error">
          {error}
        </p>
      )}


      {items.length === 0 ? (

        <div className="empty-state">

          <h2>No favorites yet</h2>

          <p>
            Click ❤️ on an item to add it
            to your favorites.
          </p>

        </div>

      ) : (

        <div className="items-grid">

          {items.map((item) => (

            <ItemCard
              key={item.id}
              item={item}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />

          ))}

        </div>

      )}

    </div>

  );
}


export default Favorites;