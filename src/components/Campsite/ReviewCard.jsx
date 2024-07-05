import React, { useEffect, useState } from "react";
import style from "./ReviewCard.module.css";
import ReviewEditModal from "./ReviewEditModal";
import convertToKoreanDate from "../../utils/convertToKoreanDate";

const ReviewCard = ({ item, userName }) => {
  console.log("item", item);
  const { _id, author, review, createdAt, score, contentId } = item;
  const [modalOpen, setModalOpen] = useState(false);
  const handleReviewEdit = async () => {};
  const handleReviewDelete = async () => {
    await fetch(`${process.env.REACT_APP_SERVER_URL}/delete/${_id}`, {
      method: "DELETE",
      credentials: "include",
    });
    window.location.reload();
  };
  return (
    <li className={style.reviewCard}>
      <p className={style.writerInfo}>
        <span className={style.score}>
          {[...Array(score)].map((a, i) => (
            <i className={`fa-solid fa-star ${style.solid}`} key={i} />
          ))}
          {[...Array(5 - score)].map((a, i) => (
            <i className={`fa-regular fa-star ${style.empty}`} key={i} />
          ))}
        </span>
        <span className={style.writer}>{author.nickname}</span>
      </p>
      {userName === author.nickname ? (
        <div className={style.tools}>
          <button onClick={() => setModalOpen(true)}>수정</button>
          <button onClick={(e) => handleReviewDelete(e)}>삭제</button>
        </div>
      ) : null}

      <div className={style.content}>
        <span className={style.date}>{convertToKoreanDate(createdAt)}</span>
        <p>{review}</p>
      </div>
      {modalOpen === true ? (
        <ReviewEditModal setModalOpen={setModalOpen} item={item} />
      ) : null}
    </li>
  );
};

export default ReviewCard;
