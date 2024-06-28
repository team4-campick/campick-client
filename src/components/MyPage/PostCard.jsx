import React from "react";
import style from "./PostCard.module.css";
const PostCard = () => {
  return (
    <div className={style.postCard}>
      <figure className={style.postCon}>
        <figcaption className={style.postContent}>
          <span>서귀포 | 제주 - 서귀포시</span>
          <span>제주도 다녀온 일지</span>
          <p>
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using 'Content here, content
            here', making it look like...
          </p>
          <span>Writer. Campick</span>
        </figcaption>
        <div className={style.imgCon}>
          <img
            src='https://image.ohou.se/i/bucketplace-v2-development/uploads/cards/advices/163525384007726630.jpg?gif=1&w=480'
            alt='감성캠핑'
          />
        </div>
      </figure>
    </div>
  );
};

export default PostCard;
