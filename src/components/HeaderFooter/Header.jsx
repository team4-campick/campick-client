import React, { useEffect, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { setUserAllInfo } from "../../store/userStore";
import style from "./header.module.css";
import { useDispatch, useSelector } from "react-redux";

const url = process.env.REACT_APP_SERVER_URL;

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.user);
  const isLoggedIn = useMemo(() => (user ? user.username : null), [user]);

  const handleLogout = (e) => {
    e.preventDefault();
    fetch(`${url}/logout`, {
      method: "POST",
      credentials: "include",
    });
    dispatch(setUserAllInfo(null));
    navigate("/");
  };

  const logoUrl = process.env.PUBLIC_URL + "/images/logo.svg";

  return (
    <header className={style.headerWrap}>
      <h1>
        <Link to="/">
          <img src={logoUrl} alt="CAMPICK LOGO IMG" />
        </Link>
      </h1>

      <nav className={style.menuWrap}>
        <ul>
          <li>
            <Link to="/campsite">CAMP SITE</Link>
          </li>
          <li>
            <Link to="/market">MARKET</Link>
          </li>
          <li>
            <Link to="/contents">CONTENTS</Link>
          </li>
          <li>
            <Link to="/event">EVENT</Link>
          </li>
        </ul>
      </nav>

      <nav className={style.privacyWrap}>
        <ul>
          <li>
            <Link to="/">
              <i className="fa-solid fa-message"></i>
            </Link>
          </li>
          {isLoggedIn ? (
            <>
              <li className={style.privacy}>
                <Link to="/my-page/bingo-coupon/bingo">MY PAGE</Link>
              </li>
              <li className={style.privacy}>
                <Link to="/" onClick={handleLogout}>
                  SIGN OUT
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className={style.public}>
                <Link to="/signin">SIGN IN</Link>
              </li>
              <li className={style.public}>
                <Link to="/register">REGISTER</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
