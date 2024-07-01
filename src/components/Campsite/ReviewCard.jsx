import React from "react";
import style from "./ReviewCard.module.css";
const ReviewCard = ({ review }) => {
  const handleReviewEdit = async () => {};
  const handleReviewDelete = async () => {};
  return (
    <li className={style.reviewCard}>
      <p className={style.writerInfo}>
        <span className={style.score}>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-regular fa-star"></i>
        </span>
        <span className={style.writer}>nickname</span>
      </p>
      <div className={style.tools}>
        <button onClick={(e) => handleReviewEdit(e)}>수정</button>
        <button onClick={(e) => handleReviewDelete(e)}>삭제</button>
      </div>
      <div className={style.content}>
        <span className={style.date}>2024-06-07</span>
        <p>review content area</p>
      </div>
    </li>
  );
};

export default ReviewCard;
