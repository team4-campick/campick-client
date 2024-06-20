import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/header.css";

const Header = () => {
  // 로그인 상태를 관리하는 변수
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 로그인 함수
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  // 로그아웃 함수
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <header className="headerWrap">
      <h1>
        <Link to="/">
          <img src="#" alt="CAMPICK LOGO IMG" />
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
                <Link to="/signout" onClick={handleLogout}>
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
