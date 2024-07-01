import style from "../../css/Contents/blogPostDetail.module.css";

const BlogPostDetail = () => {
  return (
    <section>
      <h2>BlogPostDetail</h2>

      <div className={style.topBackgroundImg}>
        <img src="" alt="배경이미지" />
        <div className={style.blogPostInfo}>
          <h3>글제목</h3>
          <div>
            <span>장소명 </span>
            <span>제주 / </span>
            <span>제주시</span>
          </div>
          <div>
            <span>2024.07.01</span>
            <span> by.nickname</span>
          </div>
        </div>
      </div>
      <div>글 내용 들어가는 곳</div>
    </section>
  );
};

export default BlogPostDetail;
