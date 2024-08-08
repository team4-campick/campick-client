import React, { useEffect, useState } from "react";
import style from "../../css/MyPage/Transaction.module.css";
import SaleCard from "../../components/MyPage/SaleCard";
import { useSelector } from "react-redux";

const Sale = () => {
  const url = process.env.REACT_APP_SERVER_URL;
  const user = useSelector((state) => state.user.user);
  const userId = user?.id;
  const [salePosts, setSalePosts] = useState([]);

  const getSalePostList = async () => {
    try {
      const response = await fetch(`${url}/sale-post/${userId}`, {
        method: "GET",
        headers: { Accept: "application/json" },
        credentials: "include",
      });
      const data = await response.json();
      if (!data.salePost === null) {
        return setSalePosts([]);
      }
      setSalePosts(data.salePost);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSalePostList();
  }, []);
  return (
    <section className={style.cardCon}>
      <h3 hidden>Sale</h3>
      <div className={style.cardList}>
        {salePosts?.length !== 0 ? (
          salePosts?.map((post) => <SaleCard key={post._id} post={post} />)
        ) : (
          <div className={style.noPost}>내가 쓴 게시글이 없습니다.</div>
        )}
      </div>
    </section>
  );
};

export default Sale;
