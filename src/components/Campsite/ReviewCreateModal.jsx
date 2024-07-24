import React, { useState } from "react";
import style from "./ReviewCreateModal.module.css";
import { SCORE_MSG } from "../../constants/scoreMsg";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ReviewCreateModal = ({ setModalOpen, id }) => {
  const url = process.env.REACT_APP_SERVER_URL;
  const user = useSelector((state) => state.user.user);
  const userObjId = user?.id;
  const userName = user?.username;

  const navigate = useNavigate();

  const [score, setScore] = useState(0);
  const [review, setReview] = useState("");
  const handleReviewCreate = async (e) => {
    e.preventDefault();
    if (score === 0) {
      alert("평점을 입력해주세요");
      return;
    }
    if (review === "") {
      alert("리뷰를 입력해주세요");
      return;
    }
    try {
      const response = await fetch(`${url}/review/${userObjId}`, {
        method: "POST",
        body: JSON.stringify({
          score,
          review,
          contentId: id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();
      if (response.status === 200) {
        setScore(0);
        setReview("");
        setModalOpen(false);
        alert("리뷰가 성공적으로 작성되었습니다");
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
          {score === 1
            ? SCORE_MSG.ONE
            : score === 2
            ? SCORE_MSG.TWO
            : score === 3
            ? SCORE_MSG.THREE
            : score === 4
            ? SCORE_MSG.FOUR
            : score === 5
            ? SCORE_MSG.FIVE
            : SCORE_MSG.DEFAULT}
        </span>
        <form className={style.reviewForm} onSubmit={handleReviewCreate}>
          <div className={style.reviewScore}>
            {[...Array(score)].map((a, i) => (
              <i
                className={`fa-solid fa-star ${style.solid}`}
                key={i}
                onClick={() => setScore(i + 1)}
              />
            ))}
            {[...Array(5 - score)].map((a, i) => (
              <i
                className={`fa-solid fa-star ${style.empty}`}
                key={i}
                onClick={() => setScore(score + i + 1)}
              />
            ))}
          </div>

          <div className={style.textareaCon}>
            <textarea
              className={style.reviewInputArea}
              name="review"
              id="review"
              placeholder="최소 10자 이상 입력해주세요."
              onChange={(e) => setReview(e.target.value)}
            >
              {review}
            </textarea>
          </div>
          <div className={style.tools}>
            <button type="submit" className={style.submitBtn}>
              작성완료
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

export default ReviewCreateModal;
