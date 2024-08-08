import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useGetSalePosts from "../../hooks/useGetSalePosts";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import SalePostCard from "../../components/Market/SalePostCard";
import style from "../../css/Market/Market.module.css";
import { PRODUCT_CATEGORY } from "../../constants/market";

const Market = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { salePosts, isLoading, error, ErrorComponent } = useGetSalePosts();
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isInputClicked, setIsInputClicked] = useState(false);
  const user = useSelector((state) => state.user.user);
  const isLoggedIn = user?.username;

  const handleCategoryClick = (category) => {
    searchParams.delete("keyword");
    setSearchKeyword("");

    // 전체보기일 때
    if (!category) {
      return navigate("/market");
    }

    setSearchParams({ category });
  };

  const handleSearchChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams({ keyword: searchKeyword });
    searchParams.delete("category");
  };

  const handleClickSale = () => {
    if (isLoggedIn) {
      navigate("/sale-post-write");
    } else {
      alert("로그인이 필요합니다.");
      navigate("/signin");
    }
  };

  if (isLoading) return <LoadingSpinner />;

  // TODO: 에러 케이스 처리
  if (error) return <ErrorComponent />;

  return (
    <section className={`mw ${style.marketCon}`}>
      <h2 hidden>Market</h2>
      <form className="searchBar">
        <label className="inputArea">
          <input
            type="text"
            value={searchKeyword}
            onChange={handleSearchChange}
            onFocus={() => {
              setIsInputClicked(true);
            }}
            onBlur={() => {
              setIsInputClicked(false);
            }}
            placeholder={
              isInputClicked === true ? "" : "어떤 상품을 찾으시나요?"
            }
          />
          <button type="submit" onClick={handleSearch}>
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </label>
      </form>
      <div className={style.categories}>
        <button
          onClick={() => handleCategoryClick("")}
          className={
            searchParams.get("category") || searchParams.get("keyword")
              ? ""
              : style.active
          }
        >
          전체보기
        </button>
        {PRODUCT_CATEGORY.map((cate) => (
          <button
            key={cate.value}
            onClick={() => handleCategoryClick(cate.label)}
            className={
              searchParams.get("category") === cate.label ? style.active : ""
            }
          >
            {cate.label}
          </button>
        ))}
      </div>

      <div className={style.writeBtnCon}>
        <button className={style.writeBtn} onClick={handleClickSale}>
          <span>판매하기</span>
          <i className="fa-regular fa-pen-to-square"></i>
        </button>
      </div>

      <div className={style.postListWrap}>
        <div className={style.postCardList}>
          {!salePosts.length && <p>게시물이 존재하지 않습니다.</p>}
          {salePosts.map((post) => (
            <SalePostCard key={post._id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Market;
