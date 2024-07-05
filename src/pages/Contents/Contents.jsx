import React, { useRef, useState, useEffect, useCallback } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import categoryStyle from "../../css/Category.module.css";

const Contents = () => {
  const [underlineStyle, setUnderlineStyle] = useState({});
  const [isHovered, setIsHovered] = useState(false);
  const navRef = useRef(null);
  const location = useLocation();

  const updateUnderlineStyle = useCallback(() => {
    if (navRef.current && !isHovered) {
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
  }, [isHovered]);

  const handleHover = (e) => {
    setIsHovered(true);
    const link = e.target;
    const { offsetLeft, offsetWidth } = link;
    setUnderlineStyle({
      left: offsetLeft,
      width: offsetWidth,
    });
  };

  const handleHoverLeave = () => {
    setIsHovered(false);
    updateUnderlineStyle();
  };

  useEffect(() => {
    updateUnderlineStyle();
    window.addEventListener("resize", updateUnderlineStyle);
    return () => {
      window.removeEventListener("resize", updateUnderlineStyle);
    };
  }, [location, updateUnderlineStyle]);

  const getClassName = (isActive) => {
    return `${categoryStyle.pageSubHeaderLink} ${
      isActive ? categoryStyle.active : ""
    }`;
  };

  return (
    <section className={categoryStyle.pageWarp}>
      <h3 hidden>contents</h3>
      <nav className={categoryStyle.pageSubHeader} ref={navRef}>
        <NavLink
          to="contentsBlog"
          className={({ isActive }) => getClassName(isActive)}
          onMouseEnter={handleHover}
          onMouseLeave={handleHoverLeave}
        >
          BLOG
        </NavLink>
        <NavLink
          to="contentsVideo"
          className={({ isActive }) => getClassName(isActive)}
          onMouseEnter={handleHover}
          onMouseLeave={handleHoverLeave}
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
