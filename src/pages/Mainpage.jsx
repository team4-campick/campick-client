import React from "react";
import { Link } from "react-router-dom";
import "../css/mainpage.css";
const Mainpage = () => {
  return (
    <>
      <section className={"mainVisual"}>
        {/* 블로그 탭 박스 */}
        <div className="blogTapWarp">
          {/* 첫번째 블로그탭 */}
          <div className={"firstBlog"}>
            <p>위치정보</p>
            <strong>정보</strong>
            <p>내용</p>
            <Link>Read More</Link>
          </div>
          {/* 두번째 블로그탭 */}
          <div className={"secondBlog"}>
            <p>위치정보</p>
            <strong>정보</strong>
            <p>내용</p>
            <Link>Read More</Link>
          </div>
          {/* 세번째 블로그탭 */}
          <div className={"thirdBlog"}>
            <p>위치정보</p>
            <strong>정보</strong>
            <p>내용</p>
            <Link>Read More</Link>
          </div>
        </div>
      </section>
      {/* 유튜브 섹션 */}
      <section className={"mainVideo"}>
        <h3>Today's video</h3>
        <div>main video section</div>
      </section>
      {/* 이벤트 섹션 */}
      <section className={"mainEvents"}>
        <h3>Today's event</h3>
        <div>main event section</div>
      </section>
    </>
  );
};

export default Mainpage;
