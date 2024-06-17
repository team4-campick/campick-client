import SalePostCard from "../../components/SalePostCard";

const Market = () => {
  return (
    <section>
      <h2 hidden>Market</h2>
      <div class="searchBar">
        <input type="text" placeholder="검색어를 입력하세요." />
        <button class="searchBtn">검색</button>
      </div>
      <div>
        <button onClick={() => {}}>텐트</button>
        <button onClick={() => {}}>침낭/매트/해먹</button>
        <button onClick={() => {}}>스토브/화로대</button>
        <button onClick={() => {}}>랜턴</button>
        <button onClick={() => {}}>조리도구</button>
        <button onClick={() => {}}>기타장비</button>
      </div>
      <button>작성하기</button>
      <ul>
        <li>
          <SalePostCard />
        </li>
      </ul>
    </section>
  );
};

export default Market;
