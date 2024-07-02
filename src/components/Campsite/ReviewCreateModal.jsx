import React from "react";
import style from "./ReviewCreateModal.module.css";
const ReviewCreateModal = () => {
  return (
    <div className={style.reviewCreateModal}>
      <span>캠핑장은 어떠셨나요?</span>
      <form>
        <textarea
          className={style.reviewInputArea}
          name="review"
          id="review"
          placeholder="최소 10자 이상 입력해주세요."
        ></textarea>
        <div className={style.tools}>
          <button type="submit" className={style.submitBtn}>
            작성완료
          </button>
          <button className={style.cancelBtn}>취소</button>
        </div>
      </form>
    </div>
  );
};

export default ReviewCreateModal;
