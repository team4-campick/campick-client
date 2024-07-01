import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import style from "../../css/Contents/contents.module.css";

const Contents = () => {
  const location = useLocation();

  return (
    <section className={style.pageWarp}>
      <h3 hidden>contents</h3>
      <nav className={style.pageSubHeader}>
        <Link
          to={"contentsBlog"}
          className={location.pathname === "/contentsBlog" ? style.active : ""}
        >
          BLOG
        </Link>
        <Link
          to={"contentsVideo"}
          className={location.pathname === "/contentsVideo" ? style.active : ""}
        >
          VIDEO
        </Link>
      </nav>
      <Outlet></Outlet>
    </section>
  );
};

export default Contents;
