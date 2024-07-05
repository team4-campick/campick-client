import React, { useRef, useState, useEffect } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import categoryStyle from "../../css/Category.module.css";

const Contents = () => {
  const [underlineStyle, setUnderlineStyle] = useState({});
  const navRef = useRef(null);
  const location = useLocation();

  const updateUnderlineStyle = () => {
    if (navRef.current) {
      const activeLink = navRef.current.querySelector(
        `.${categoryStyle.active}`
      );
      if (activeLink) {
        const { offsetLeft, offsetWidth } = activeLink;
        setUnderlineStyle({
          left: offsetLeft,
          width: offsetWidth,
        });
      }
    }
  };

  const handleHover = (e) => {
    const link = e.target;
    const { offsetLeft, offsetWidth } = link;
    setUnderlineStyle({
      left: offsetLeft,
      width: offsetWidth,
    });
  };

  useEffect(() => {
    updateUnderlineStyle();
  }, [location]);

  return (
    <section className={categoryStyle.pageWarp}>
      <h3 hidden>contents</h3>
      <nav className={categoryStyle.pageSubHeader} ref={navRef}>
        <NavLink
          to="contentsBlog"
          className={({ isActive }) =>
            isActive
              ? `${categoryStyle.active} ${categoryStyle.pageSubHeaderLink}`
              : categoryStyle.pageSubHeaderLink
          }
          onMouseEnter={handleHover}
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
          onMouseEnter={handleHover}
        >
          VIDEO
        </NavLink>

        <div className={categoryStyle.underline} style={underlineStyle} />
      </nav>
      <Outlet />
    </section>
  );
};

export default Contents;
