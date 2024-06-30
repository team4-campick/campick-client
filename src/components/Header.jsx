import React, { useEffect, useMemo } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { setUserAllInfo } from "../store/userStore";

import "../css/header.css";
import logo from "../components/logo.svg";
import { useDispatch, useSelector } from "react-redux";

const url = process.env.REACT_APP_SERVER_URL;

const Header = () => {
  // 로그인 상태를 관리하는 변수
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
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
  };
  return (
    <header className="headerWrap">
      <h1>
        <Link to="/">
          <img src={logo} alt="CAMPICK LOGO IMG" />
        </Link>
      </h1>

      <nav className="menuWrap">
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

      <nav className="privacyWrap">
        <ul>
          {isLoggedIn ? (
            <>
              {/* 로그인 후 */}
              <li className="privacy">
                <Link to="/my-page/bingo-coupon/bingo">MY PAGE</Link>
              </li>
              <li className="privacy">
                <Link to="/" onClick={handleLogout}>
                  SIGN OUT
                </Link>
              </li>
            </>
          ) : (
            <>
              {/* 로그인 전 */}
              <li className="public">
                <Link to="/signin" onClick={handleLogin}>
                  SIGN IN
                </Link>
              </li>
              <li className="public">
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
