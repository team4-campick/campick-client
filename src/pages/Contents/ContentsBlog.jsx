import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useGetBlogPosts from "../../hooks/useGetBlogPosts";
import style from "../../css/Contents/contentsBlog.module.css";
import BlogPostCard from "../../components/BlogPost/BlogPostCard";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const ContentsBlog = () => {
  const navigate = useNavigate();
  const { blogPosts, isLoading, error, ErrorComponent } = useGetBlogPosts();

  const user = useSelector((state) => state.user.user);
  const isLoggedIn = user?.username;

  const handleClickSale = () => {
    if (isLoggedIn) {
      navigate("/blog-post-write");
    } else {
      alert("로그인이 필요합니다.");
      navigate("/signin");
    }
  };

  if (isLoading) return <LoadingSpinner />;

  // TODO: 에러 케이스 처리
  if (error) return <ErrorComponent />;

  return (
    <section className={`mw ${style.blogListWrap}`}>
      <h2 hidden>ContentsBlog</h2>
      <div className={style.writeBtnCon}>
        <button
          to="/blog-post-write"
          className={style.writeBtn}
          onClick={handleClickSale}
        >
          <span>작성하기</span>
          <i className="fa-regular fa-pen-to-square"></i>
        </button>
      </div>
      <div className={style.blogPostList}>
        {!blogPosts.length && <p>게시물이 존재하지 않습니다.</p>}
        {blogPosts.map((post) => (
          <BlogPostCard key={post._id} post={post} />
        ))}
      </div>
    </section>
  );
};

export default ContentsBlog;
