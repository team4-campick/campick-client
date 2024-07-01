import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import cateogryStyle from "../../css/Category.module.css";

const Contents = () => {
  const location = useLocation();

  return (
    <section className={cateogryStyle.pageWarp}>
      <h3 hidden>contents</h3>
      <nav className={cateogryStyle.pageSubHeader}>
        <Link
          to={"contentsBlog"}
          className={
            location.pathname === "/contentsBlog" ? cateogryStyle.active : ""
          }
        >
          BLOG
        </Link>
        <Link
          to={"contentsVideo"}
          className={
            location.pathname === "/contentsVideo" ? cateogryStyle.active : ""
          }
        >
          VIDEO
        </Link>
      </nav>
      <Outlet></Outlet>
    </section>
  );
};

export default Contents;
