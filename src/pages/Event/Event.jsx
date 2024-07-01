import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import cateogryStyle from "../../css/Category.module.css";
import style from "../../css/Event/event.module.css";

const Event = () => {
  const location = useLocation();

  return (
    <section className={cateogryStyle.pageWarp}>
      <h3 hidden>Event</h3>
      <nav className={cateogryStyle.pageSubHeader}>
        <Link
          to="eventProceeding"
          className={
            location.pathname === "/event/eventProceeding" ? style.active : ""
          }
        >
          PROCEEDING
        </Link>
        <Link
          to="eventFinished"
          className={
            location.pathname === "/event/eventFinished" ? style.active : ""
          }
        >
          FINISHED
        </Link>
      </nav>
      <Outlet />
    </section>
  );
};

export default Event;
