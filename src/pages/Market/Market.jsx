import { useState, useEffect } from 'react';
import SalePostCard from '../../components/Market/SalePostCard';
import style from '../../css/Market/Market.module.css';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { PRODUCT_CATEGORY } from '../../constants/market';

const Market = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [salePosts, setSalePosts] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');

  const API_BASE_URL = 'http://localhost:8000/api';
  const salePostsEndpoint = `${API_BASE_URL}/sale-posts`;

  const keyword = searchParams.get('keyword');
  const category = searchParams.get('category');

  const handleCategoryClick = (category) => {
    searchParams.delete('keyword');

    // 전체보기일 때
    if (!category) {
      return navigate('/market');
    }

    setSearchParams({ category });
  };

  const handleSearchChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams({ keyword: searchKeyword });
    searchParams.delete('category');
  };

  useEffect(() => {
    const fetchSalePosts = async () => {
      try {
        const url = category
          ? `${salePostsEndpoint}?category=${category}`
          : keyword
          ? `${salePostsEndpoint}?keyword=${keyword}`
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
      } catch (error) {
        console.error(error);
      }
    };

    fetchSalePosts();
  }, [keyword, salePostsEndpoint, category]);

  return (
    <section className={style.marketCon}>
      <h2 hidden>Market</h2>
      <form className={style.searchBar}>
        <input
          type="text"
          placeholder="어떤 상품을 찾고있나요?"
          value={searchKeyword}
          onChange={handleSearchChange}
        />

        <button type="submit" onClick={handleSearch}>
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </form>
      <div className={style.cateGories}>
        <button onClick={() => handleCategoryClick('')}>전체보기</button>
        {PRODUCT_CATEGORY.map((cate) => (
          <button
            key={cate.value}
            onClick={() => handleCategoryClick(cate.label)}
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
