import React, { useEffect, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { setUserAllInfo } from "../store/userStore";

import style from "../css/header.module.css";
import logo from "../components/logo.svg";
import { useDispatch, useSelector } from "react-redux";

const url = process.env.REACT_APP_SERVER_URL;

const Header = () => {
  // 로그인 상태를 관리하는 변수
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  // 로그인 함수
  const handleLogin = () => {
    // setIsLoggedIn(true);
  };

  // 로그아웃 함수
  // const handleLogout = async () => {
  //   try {
  //     const response = await fetch(`${url}/logout`, {
  //       method: "POST",
  //       credentials: "include",
  //     });

  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }
  //     console.log(response);
  //     // setIsLoggedIn(false);
  //     <Navigate to="/" />;
  //   } catch (error) {
  //     console.error("Error logging out:", error);
  //   }
  // };
  const user = useSelector((state) => state.user.user);
  console.log("userInfo Get func =====", user);
  const isLoggedIn = useMemo(() => (user ? user.username : null), [user]);

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await fetch(`${url}/profile`, {
        credentials: "include",
      });
      if (response.ok) {
        const userInfo = await response.json();
        dispatch(setUserAllInfo(userInfo));
      }
    };
    fetchProfile();
  }, [dispatch, location.pathname]);

  console.log("isLoggedIn ", isLoggedIn);
  const handleLogout = (e) => {
    e.preventDefault();
    fetch(`${url}/logout`, {
      method: "POST",
      credentials: "include",
    });
    dispatch(setUserAllInfo(null));
    navigate("/");
  };
  return (
    <header className={style.headerWrap}>
      <h1>
        <Link to="/">
          <img src={logo} alt="CAMPICK LOGO IMG" />
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
          {isLoggedIn ? (
            <>
              {/* 로그인 후 */}
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
              {/* 로그인 전 */}
              <li className={style.public}>
                <Link to="/signin" onClick={handleLogin}>
                  SIGN IN
                </Link>
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
