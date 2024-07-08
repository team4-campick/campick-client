import React, { useEffect, useState } from "react";
import style from "../../css/MyPage/Transaction.module.css";
import SaleCard from "../../components/MyPage/SaleCard";

const Purchase = () => {
  const url = process.env.REACT_APP_SERVER_URL;
  const [salePosts, setSalePosts] = useState([]);

  const getSalePostList = async () => {
    try {
      const response = await fetch(`${url}/api/sale-posts`);
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
  return (
    <section className={style.cardCon}>
      <h3 hidden>Purchase</h3>
      <div className={style.cardList}>
        {salePosts.length !== 0 ? (
          salePosts.map((post) => <SaleCard key={post._id} post={post} />)
        ) : (
          <div className={style.noPost}>거래 정보가 없습니다.</div>
        )}
      </div>
    </section>
  );
};

export default Purchase;
