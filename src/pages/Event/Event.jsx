import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import categoryStyle from "../../css/Category.module.css";

const Event = () => {
  return (
    <section className={categoryStyle.pageWarp}>
      <h2 hidden>Event</h2>
      <nav className={categoryStyle.pageSubHeader}>
        <NavLink
          to="eventProceeding"
          className={({ isActive }) =>
            isActive
              ? `${categoryStyle.active} ${categoryStyle.pageSubHeaderLink}`
              : categoryStyle.pageSubHeaderLink
          }
        >
          PROCEEDING
        </NavLink>
        <NavLink
          to="eventFinished"
          className={({ isActive }) =>
            isActive
              ? `${categoryStyle.active} ${categoryStyle.pageSubHeaderLink}`
              : categoryStyle.pageSubHeaderLink
          }
        >
          FINISHED
        </NavLink>
      </nav>
      <Outlet />
    </section>
  );
};

export default Event;
