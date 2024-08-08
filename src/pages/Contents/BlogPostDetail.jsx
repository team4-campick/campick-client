import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useGetBlogPostDetail from "../../hooks/useGetBlogPostDetail";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import convertToKoreanDate from "../../utils/convertToKoreanDate";
import style from "../../css/Contents/blogPostDetail.module.css";

const BlogPostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { blogPostDetail, isLoading, error, ErrorComponent } =
    useGetBlogPostDetail();

  const user = useSelector((state) => state.user.user);
  const userId = user?.id;

  const blogPostsEndpoint = `${process.env.REACT_APP_SERVER_URL}/api/blog-posts/${id}`;

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

  // 데이터 로딩 전에는 로딩 중임을 표시
  if (isLoading || !blogPostDetail) return <LoadingSpinner />;

  // TODO: 에러 케이스 처리
  if (error) return <ErrorComponent />;

  // blogPostDetail 데이터를 불러온 이후에 destructuring 및 렌더링
  const {
    author,
    authorId,
    blogPostTitle,
    campSiteName,
    region,
    city,
    content,
    createdAt,
    backgroundImgUrls,
  } = blogPostDetail;

  return (
    <section>
      <h2 hidden>BlogPostDetail</h2>
      <div className={style.topBanner}>
        {userId === authorId && (
          <div className={style.editDeletes}>
            <button onClick={editPost}>수정</button>
            <button onClick={deleteBlogPost}>삭제</button>
          </div>
        )}

        {!!backgroundImgUrls.length && (
          <img src={backgroundImgUrls[0].url} alt="배경이미지" />
        )}
        <div className={style.bgOverlay}></div>
        <div className={style.blogPostInfo}>
          <h3>{blogPostTitle}</h3>
          <div>
            <span>{campSiteName} ・ </span>
            <span>{region} </span>
            <span>{city}</span>
          </div>
          <div className={style.dateAutor}>
            <span>{convertToKoreanDate(createdAt)}</span>
            <span className={style.postAutor}> by. {author}</span>
          </div>
        </div>
      </div>
      <div
        className={`${style.innerText} ql-editor`}
        dangerouslySetInnerHTML={{ __html: content }}
      />
      <div className="submitButtonWrap">
        <button
          className={`submitButton ${style.postDetailBtn}`}
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
