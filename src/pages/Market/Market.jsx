import { useState, useEffect } from 'react';
import SalePostCard from '../../components/Market/SalePostCard';
import style from '../../css/Market/Market.module.css';
import { Link } from 'react-router-dom';
import { PRODUCT_CATEGORY } from '../../constants/market';

const Market = () => {
  const [salePosts, setSalePosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  const API_BASE_URL = 'http://localhost:8000/api';
  const salePostsEndpoint = `${API_BASE_URL}/sale-posts`;

  const fetchSalePosts = async (category = '') => {
    try {
      const url = category
        ? `${salePostsEndpoint}?category=${category}`
        : salePostsEndpoint;
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (!data.result) {
        return alert(data.message);
      }
      setSalePosts(data.salePosts);
      setSelectedCategory(category);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSalePosts();
  }, []);

  const handleCategoryClick = (category) => {
    fetchSalePosts(category);
  };

  return (
    <section className={style.marketCon}>
      <h2 hidden>Market</h2>
      <div className={style.searchBar}>
        <input type="text" placeholder="검색어를 입력하세요." />
        <i className="fa-solid fa-magnifying-glass"></i>
      </div>
      <div className={style.cateGories}>
        <button onClick={() => handleCategoryClick('')}>전체보기</button>
        {PRODUCT_CATEGORY.map((cate) => (
          <button
            key={cate.value}
            onClick={() => handleCategoryClick(cate.value)}
          >
            {cate.label}
          </button>
        ))}
      </div>

      <div className={style.writeBtnCon}>
        <Link to="/sale-post-write" className={style.writeBtn}>
          <span>판매하기</span>
          <i className="fa-regular fa-pen-to-square"></i>
        </Link>
      </div>

      <div className={style.postCardList}>
        {salePosts.map((post) => (
          <SalePostCard key={post._id} post={post} />
        ))}
      </div>
    </section>
  );
};

export default Market;
