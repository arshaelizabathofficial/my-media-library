import { useEffect, useState } from "react";

import ItemCard from "../components/ItemCard";
import AddItem from "../components/AddItem";

import {
  getItems,
  updateItem,
  deleteItem,
} from "../services/api";


function Home() {

  const [items, setItems] = useState([]);

  // Status filter
  const [activeTab, setActiveTab] = useState("Unfinished");

  // Type filter
  const [activeType, setActiveType] = useState("All");

  // Search
  const [searchTerm, setSearchTerm] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  // -----------------------------
  // LOAD ITEMS
  // -----------------------------

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


  // -----------------------------
  // UPDATE ITEM
  // -----------------------------

  async function handleUpdate(id, data) {

    try {

      const updatedItem = await updateItem(id, data);

      setItems((currentItems) =>
        currentItems.map((item) =>
          item.id === id
            ? updatedItem
            : item
        )
      );

    } catch (error) {

      setError(error.message);

    }

  }


  // -----------------------------
  // DELETE ITEM
  // -----------------------------

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


  // -----------------------------
  // LOADING
  // -----------------------------

  if (loading) {

    return (
      <h2>Loading your library...</h2>
    );

  }


  // -----------------------------
  // FILTER ITEMS
  // -----------------------------

  const filteredItems = items.filter((item) => {

    // Status
    const statusMatches =
      item.status === activeTab;


    // Type
    const typeMatches =
      activeType === "All" ||
      item.type === activeType;


    // Search
    const searchMatches =
      item.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||

      (item.creator || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());


    return (
      statusMatches &&
      typeMatches &&
      searchMatches
    );

  });


  // -----------------------------
  // PAGE
  // -----------------------------

  return (

    <div className="home">

      <AddItem
        onItemAdded={(newItem) => {

          setItems((currentItems) => [
            newItem,
            ...currentItems,
          ]);

        }}
      />


      <h1>My Media Library</h1>

      <p>
        Keep track of your movies, TV shows, and books.
      </p>


      {error && (
        <p className="error">
          {error}
        </p>
      )}


      {/* =========================
          SEARCH
      ========================= */}

      <div className="search-container">

        <input
          type="text"
          placeholder="🔎 Search your library..."
          value={searchTerm}
          onChange={(event) =>
            setSearchTerm(event.target.value)
          }
          className="search-input"
        />

      </div>


      {/* =========================
          STATUS TABS
      ========================= */}

      <div className="tabs">

        <button
          className={
            activeTab === "Unfinished"
              ? "tab active"
              : "tab"
          }
          onClick={() =>
            setActiveTab("Unfinished")
          }
        >
          📋 To Watch
        </button>


        <button
          className={
            activeTab === "Finished"
              ? "tab active"
              : "tab"
          }
          onClick={() =>
            setActiveTab("Finished")
          }
        >
          ✅ Watched
        </button>

      </div>


      {/* =========================
          MEDIA TYPE FILTER
      ========================= */}

      <div className="type-filters">

        <button
          className={
            activeType === "All"
              ? "type-filter active"
              : "type-filter"
          }
          onClick={() =>
            setActiveType("All")
          }
        >
          All
        </button>


        <button
          className={
            activeType === "Movie"
              ? "type-filter active"
              : "type-filter"
          }
          onClick={() =>
            setActiveType("Movie")
          }
        >
          🎬 Movies
        </button>


        <button
          className={
            activeType === "TV"
              ? "type-filter active"
              : "type-filter"
          }
          onClick={() =>
            setActiveType("TV")
          }
        >
          📺 TV Shows
        </button>


        <button
          className={
            activeType === "Book"
              ? "type-filter active"
              : "type-filter"
          }
          onClick={() =>
            setActiveType("Book")
          }
        >
          📚 Books
        </button>

      </div>


      {/* =========================
          ITEMS
      ========================= */}

      <div className="items-grid">

        {filteredItems.length === 0 ? (

          <div className="empty-state">

            <h2>
              No results found
            </h2>

            <p>
              Try another search or filter.
            </p>

          </div>

        ) : (

          filteredItems.map((item) => (

            <ItemCard
              key={item.id}
              item={item}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />

          ))

        )}

      </div>

    </div>

  );

}


export default Home;