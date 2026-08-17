import { useState } from "react";
import { createItem } from "../services/api";

function AddItem({ onItemAdded }) {
  const [isOpen, setIsOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [creator, setCreator] = useState("");
  const [type, setType] = useState("Movie");
  const [status, setStatus] = useState("Unfinished");
  const [image, setImage] = useState("");

  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setError("");

      const newItem = await createItem({
        title,
        creator,
        type,
        status,
        rating: null,
        favorite: false,
        image,
      });

      onItemAdded(newItem);

      // Clear form
      setTitle("");
      setCreator("");
      setType("Movie");
      setStatus("Unfinished");
      setImage("");

      // Close modal
      setIsOpen(false);

    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div className="add-item-container">

      {/* ADD BUTTON */}

      <button
        className="add-item-button"
        onClick={() => setIsOpen(true)}
      >
        + Add Item
      </button>


      {/* MODAL */}

      {isOpen && (
        <div
          className="modal-overlay"
          onClick={() => setIsOpen(false)}
        >

          <div
            className="modal"
            onClick={(event) => event.stopPropagation()}
          >

            <div className="modal-header">

              <h2>Add New Item</h2>

              <button
                className="modal-close"
                onClick={() => setIsOpen(false)}
              >
                ×
              </button>

            </div>


            {error && (
              <p className="error">
                {error}
              </p>
            )}


            <form onSubmit={handleSubmit}>

              {/* TITLE */}

              <label>
                Title
              </label>

              <input
                type="text"
                placeholder="Enter title"
                value={title}
                onChange={(event) =>
                  setTitle(event.target.value)
                }
                required
              />


              {/* CREATOR */}

              <label>
                Creator / Author
              </label>

              <input
                type="text"
                placeholder="Director, author, creator..."
                value={creator}
                onChange={(event) =>
                  setCreator(event.target.value)
                }
              />


              {/* TYPE */}

              <label>
                Type
              </label>

              <select
                value={type}
                onChange={(event) =>
                  setType(event.target.value)
                }
              >
                <option value="Movie">
                  🎬 Movie
                </option>

                <option value="TV">
                  📺 TV Show
                </option>

                <option value="Book">
                  📚 Book
                </option>
              </select>


              {/* STATUS */}

              <label>
                Status
              </label>

              <select
                value={status}
                onChange={(event) =>
                  setStatus(event.target.value)
                }
              >
                <option value="Unfinished">
                  📋 To Watch
                </option>

                <option value="Finished">
                  ✅ Watched
                </option>
              </select>


              {/* IMAGE */}

              <label>
                Poster / Cover Image URL
              </label>

              <input
                type="url"
                placeholder="https://example.com/poster.jpg"
                value={image}
                onChange={(event) =>
                  setImage(event.target.value)
                }
              />


              {/* BUTTONS */}

              <div className="modal-actions">

                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="submit-button"
                >
                  Add to Library
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
}

export default AddItem;