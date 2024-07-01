import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import categoryStyle from "../../css/Category.module.css";
import style from "../../css/Event/event.module.css";

const Event = () => {
  const location = useLocation();

  return (
    <section className={categoryStyle.pageWarp}>
      <h3 hidden>Event</h3>
      <nav className={categoryStyle.pageSubHeader}>
        <Link
          to="eventProceeding"
          className={
            location.pathname === "/event/eventProceeding"
              ? categoryStyle.active
              : ""
          }
        >
          PROCEEDING
        </Link>
        <Link
          to="eventFinished"
          className={
            location.pathname === "/event/eventFinished"
              ? categoryStyle.active
              : ""
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
