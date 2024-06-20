import { useState, useEffect } from "react";
import SalePostCard from "../../components/Market/SalePostCard";
import style from "../../css/Market/Market.module.css";
import { Link } from "react-router-dom";

const Market = () => {
  const [salePosts, setSalePosts] = useState([]);

  const getSalePostList = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/market-posts");
      const data = await response.json();
      if (!data.result) {
        return alert(data.message);
      }

      setSalePosts(data.salePosts);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSalePostList();
  }, []);

  console.log(salePosts);

  return (
    <section className={style.marketCon}>
      <h2 hidden>Market</h2>
      <div className={style.searchBar}>
        <input type="text" placeholder="검색어를 입력하세요." />
        <button className="searchBtn">검색</button>
      </div>
      <div className={style.cateGories}>
        <button onClick={() => {}}>텐트</button>
        <button onClick={() => {}}>침낭/매트/해먹</button>
        <button onClick={() => {}}>스토브/화로대</button>
        <button onClick={() => {}}>랜턴</button>
        <button onClick={() => {}}>조리도구</button>
        <button onClick={() => {}}>기타장비</button>
      </div>
      <Link to="/sale-post-write" className={style.writeBtn}>
        판매하기
      </Link>

      <div className={style.postCardList}>
        <SalePostCard />
        <SalePostCard />
      </div>
    </section>
  );
};

export default Market;
