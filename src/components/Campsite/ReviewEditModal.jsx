import React, { useState } from "react";
import style from "./ReviewCreateModal.module.css";
import { SCORE_MSG } from "../../constants/scoreMsg";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ReviewEditModal = ({ setModalOpen, item }) => {
  const { _id, author, review, contentId, score } = item;
  const url = process.env.REACT_APP_SERVER_URL;
  const user = useSelector((state) => state.user.user);
  const userName = user?.username;

  const navigate = useNavigate();

  const [editScore, setEditScore] = useState(score);
  const [editReview, setEditReview] = useState(review);
  const handleReviewCreate = async (e) => {
    e.preventDefault();
    if (editScore === 0) {
      alert("평점을 입력해주세요");
      return;
    }
    if (editReview === "") {
      alert("리뷰를 입력해주세요");
      return;
    }
    try {
      const response = await fetch(`${url}/review/${_id}`, {
        method: "PUT",
        body: JSON.stringify({
          score: editScore,
          review: editReview,
          contentId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();
      if (response.status === 200) {
        setEditScore(0);
        setEditReview("");
        setModalOpen(false);
        alert("리뷰가 성공적으로 수정되었습니다");
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className={style.reviewCreateModal}>
      <div className={style.modalCon}>
        <span>
          {editScore === 1
            ? SCORE_MSG.ONE
            : editScore === 2
            ? SCORE_MSG.TWO
            : editScore === 3
            ? SCORE_MSG.THREE
            : editScore === 4
            ? SCORE_MSG.FOUR
            : editScore === 5
            ? SCORE_MSG.FIVE
            : SCORE_MSG.DEFAULT}
        </span>
        <form className={style.reviewForm} onSubmit={handleReviewCreate}>
          <div className={style.reviewScore}>
            {[...Array(editScore)].map((a, i) => (
              <i
                className={`fa-solid fa-star ${style.solid}`}
                key={i}
                onClick={() => setEditScore(i + 1)}
              />
            ))}
            {[...Array(5 - editScore)].map((a, i) => (
              <i
                className={`fa-solid fa-star ${style.empty}`}
                key={i}
                onClick={() => setEditScore(editScore + i + 1)}
              />
            ))}
          </div>

          <div className={style.textareaCon}>
            <textarea
              className={style.reviewInputArea}
              name="review"
              id="review"
              placeholder="최소 10자 이상 입력해주세요."
              onChange={(e) => setEditReview(e.target.value)}
            >
              {editReview}
            </textarea>
          </div>
          <div className={style.tools}>
            <button type="submit" className={style.submitBtn}>
              수정완료
            </button>
            <button
              className={style.cancelBtn}
              onClick={() => setModalOpen(false)}
            >
              취소
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewEditModal;
