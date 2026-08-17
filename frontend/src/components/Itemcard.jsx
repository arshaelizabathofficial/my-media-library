import StarRating from "./StarRating";

function ItemCard({ item, onUpdate, onDelete }) {

  async function handleRating(rating) {
    await onUpdate(item.id, {
      rating: rating,
    });
  }

  const typeInfo = {
    Movie: {
      icon: "🎬",
      label: "Movie",
    },
    TV: {
      icon: "📺",
      label: "TV Show",
    },
    Book: {
      icon: "📚",
      label: "Book",
    },
  };

  const currentType = typeInfo[item.type] || {
    icon: "📁",
    label: item.type,
  };

  return (
    <div className="media-card">

      {/* Poster */}
      <div className="media-poster">

        {item.image ? (
          <img
            src={item.image}
            alt={item.title}
          />
        ) : (
          <div className="poster-placeholder">
            {currentType.icon}
          </div>
        )}

        {/* Favorite */}
        <button
          className={`favorite-button ${
            item.favorite ? "favorite-active" : ""
          }`}
          onClick={() =>
            onUpdate(item.id, {
              favorite: !item.favorite,
            })
          }
          aria-label="Toggle favorite"
        >
          {item.favorite ? "❤️" : "♡"}
        </button>

      </div>


      {/* Content */}
      <div className="media-content">

        <div className="media-title-row">

          <h3>{item.title}</h3>

          <span className="media-badge">
            {currentType.icon} {currentType.label}
          </span>

        </div>


        {item.creator && (
          <p className="media-creator">
            {item.creator}
          </p>
        )}


        {/* Status */}
        <span
          className={
            item.status === "Finished"
              ? "status-badge finished"
              : "status-badge unfinished"
          }
        >
          {item.status === "Finished"
            ? "✓ Watched"
            : "○ To Watch"}
        </span>


        {/* Rating */}
        <div className="rating-section">

          <StarRating
            rating={item.rating || 0}
            onRate={handleRating}
          />

        </div>


        {/* Actions */}
        <div className="media-actions">

          {item.status === "Unfinished" && (
            <button
              className="finish-button"
              onClick={() =>
                onUpdate(item.id, {
                  status: "Finished",
                })
              }
            >
              ✓ Mark Watched
            </button>
          )}

          <button
            className="delete-button"
            onClick={() => onDelete(item.id)}
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}

export default ItemCard;