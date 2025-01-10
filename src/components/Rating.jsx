import React, { useState } from "react";
import './Rating.css';

const Rating = ({ roomId, initialRating, onRatingChange }) => {
  const [rating, setRating] = useState(initialRating || 0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleMouseOver = (index) => {
    setHoverRating(index);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const handleClick = (index) => {
    setRating(index);
    onRatingChange(roomId, index);
  };

  return (
    <div className="rating">
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <span
            key={ratingValue}
            style={{ color: ratingValue <= (hoverRating || rating) ? '#FFD700' : '#ccc' }}
            onMouseOver={() => handleMouseOver(ratingValue)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(ratingValue)}
          >
            &#9733;
          </span>
        );
      })}
    </div>
  );
};

export default Rating;