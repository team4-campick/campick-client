import React from "react";
import { Link, Outlet } from "react-router-dom";
import style from "../../css/Contents/contentsBlog.module.css";

const ContentsVideo = () => {
  return (
    <>
      <section className={style.container}>
        <h3 hidden>contents</h3>;
        <nav className={style.contentSubHeader}>
          <Link to={"contentsBlog"}>BLOG</Link>
          <span>&nbsp;&#47;&nbsp;</span>
          <Link to={"contentsVideo"}>VIDEO</Link>
        </nav>
        <Outlet></Outlet>
      </section>
    </>
  );
};

export default ContentsVideo;
