import { useParams, useNavigate } from "react-router-dom";
import style from "../../css/Contents/blogPostDetail.module.css";
import { useEffect, useState } from "react";
import convertToKoreanDate from "../../utils/convertToKoreanDate";
import { useSelector } from "react-redux";

const BlogPostDetail = () => {
  const { id } = useParams();
  const [blogPostDetail, setBlogPostDetail] = useState({});
  const navigate = useNavigate();

  const {
    author,
    authorId,
    blogPostTitle,
    campSiteName,
    region,
    city,
    content,
    createdAt,
  } = blogPostDetail;

  const blogPostsEndpoint = `${process.env.REACT_APP_SERVER_URL}/api/blog-posts/${id}`;

  const user = useSelector((state) => state.user.user);
  const userId = user?.id;

  const fetchBlogPostDetail = async () => {
    try {
      const response = await fetch(blogPostsEndpoint, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (!data.result) {
        return alert(data.message);
      }
      setBlogPostDetail(data.blogPost);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBlogPostDetail();
  }, [id]);

  const deleteBlogPost = async () => {
    try {
      const response = await fetch(blogPostsEndpoint, {
        method: "DELETE",
      });
      const res = await response.json();
      if (!res.result) {
        return alert(res.message);
      }
      alert("삭제가 완료되었습니다.");
      navigate("/contents/contentsBlog");
    } catch (error) {
      console.log(error);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };
  const editPost = () => {
    navigate(`/blog-post-edit/${id}`);
  };

  return (
    <section>
      <h2 hidden>BlogPostDetail</h2>
      {userId === authorId && (
        <div>
          <button onClick={editPost}>수정</button>
          <button onClick={deleteBlogPost}>삭제</button>
        </div>
      )}

      <div className={style.topBackgroundImg}>
        <img src="" alt="배경이미지" />
        <div className={style.blogPostInfo}>
          <h3>{blogPostTitle}</h3>
          <div>
            <span>{campSiteName} </span>
            <span>{region} </span>
            <span>{city}</span>
          </div>
          <div>
            <span>{convertToKoreanDate(createdAt)}</span>
            <span> by. {author}</span>
          </div>
        </div>
      </div>
      <div
        className={style.innerText}
        dangerouslySetInnerHTML={{ __html: content }}
      />

      <div className="submitButtonWrap">
        <button
          className="submitButton"
          type="button"
          onClick={() => {
            navigate(`/contents/contentsBlog`);
          }}
        >
          목록으로
        </button>
      </div>
    </section>
  );
};

export default BlogPostDetail;
