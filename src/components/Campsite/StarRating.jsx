import React from "react";
import PropTypes from "prop-types";

const StarRating = ({ scoreAvg }) => {
  console.log("scoreAvg", scoreAvg);
  return (
    <div>
      {[...Array(scoreAvg)].map((_, i) => (
        <i className={`fa-solid fa-star `} key={i} />
      ))}
      {[...Array(5 - scoreAvg)].map((_, i) => (
        <i className={`fa-regular fa-star `} key={i + scoreAvg} />
      ))}
    </div>
  );
};

StarRating.propTypes = {
  score: PropTypes.number.isRequired,
};

export default StarRating;
