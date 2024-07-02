import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import categoryStyle from "../../css/Category.module.css";

const Contents = () => {
  return (
    <section className={categoryStyle.pageWarp}>
      <h3 hidden>contents</h3>
      <nav className={categoryStyle.pageSubHeader}>
        <NavLink
          to="contentsBlog"
          className={({ isActive }) =>
            isActive
              ? `${categoryStyle.active} ${categoryStyle.pageSubHeaderLink}`
              : categoryStyle.pageSubHeaderLink
          }
        >
          BLOG
        </NavLink>
        <NavLink
          to="contentsVideo"
          className={({ isActive }) =>
            isActive
              ? `${categoryStyle.active} ${categoryStyle.pageSubHeaderLink}`
              : categoryStyle.pageSubHeaderLink
          }
        >
          VIDEO
        </NavLink>
      </nav>
      <Outlet />
    </section>
  );
};

export default Contents;
