import React from "react";

const Header = () => {
  return (
    <header>
      <nav className="headerWrap">
        <h1>
          <a href="#">
            <img src="#" alt="logo" />
            CAMPICK
          </a>
        </h1>
        <div className="menuWarp">
          <ul>
            <li>
              <a href="#">CAMP SITE</a>
            </li>
            <li>
              <a href="#">MARKET</a>
            </li>
            <li>
              <a href="#">CONTENTS</a>
            </li>
            <li>
              <a href="#">EVNET</a>
            </li>
          </ul>
        </div>
        <div className="privacyWarp">
          <ul>
            {/* 로그인 전 */}
            <li className="public">
              <a href="#">SIGN IN</a>
            </li>
            <li className="public">
              <a href="#">SIGN UP</a>
            </li>
            {/* 로그인 후 */}
            <li className="privacy">
              <a href="#">SETTING</a>
            </li>
            <li className="privacy">
              <a href="#">LOGOUT</a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
