import React, { useRef, useState, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import categoryStyle from "../../css/Category.module.css";

const Contents = () => {
  const [hoverUnderlineStyle, setHoverUnderlineStyle] = useState({});
  const [activeUnderlineStyle, setActiveUnderlineStyle] = useState({});
  const navRef = useRef(null);

  const handleHover = (e) => {
    const link = e.target;
    const { offsetLeft, offsetWidth } = link;
    setHoverUnderlineStyle({
      left: offsetLeft,
      width: offsetWidth,
    });
  };

  const handleMouseLeave = () => {
    setHoverUnderlineStyle(activeUnderlineStyle);
  };

  useEffect(() => {
    if (navRef.current) {
      const activeLink = navRef.current.querySelector(
        `.${categoryStyle.active}`
      );
      if (activeLink) {
        const { offsetLeft, offsetWidth } = activeLink;
        const style = {
          left: offsetLeft,
          width: offsetWidth,
        };
        setHoverUnderlineStyle(style);
        setActiveUnderlineStyle(style);
      }
    }
  }, []);

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
          onMouseLeave={handleMouseLeave}
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
          onMouseLeave={handleMouseLeave}
        >
          VIDEO
        </NavLink>

        <div className={categoryStyle.underline} style={hoverUnderlineStyle} />
      </nav>
      <Outlet />
    </section>
  );
};

export default Contents;
