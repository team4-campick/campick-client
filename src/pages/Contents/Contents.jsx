import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import categoryStyle from "../../css/Category.module.css";

const Contents = () => {
  const location = useLocation();

  return (
    <section className={categoryStyle.pageWarp}>
      <h3 hidden>contents</h3>
      <nav className={categoryStyle.pageSubHeader}>
        <Link
          to={"contentsBlog"}
          className={
            location.pathname === "/contentsBlog" ? categoryStyle.active : ""
          }
        >
          BLOG
        </Link>
        <Link
          to={"contentsVideo"}
          className={
            location.pathname === "/contentsVideo" ? categoryStyle.active : ""
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
