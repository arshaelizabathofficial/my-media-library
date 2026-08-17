function StarRating({ rating, onRate }) {

  return (
    <div className="star-rating">

      {[1, 2, 3, 4, 5].map((star) => (

        <button
          key={star}
          className={
            star <= rating
              ? "star active"
              : "star"
          }
          onClick={() => onRate(star)}
          aria-label={`Rate ${star} stars`}
        >
          ★
        </button>

      ))}

    </div>
  );
}

export default StarRating;