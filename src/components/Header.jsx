import React from "react";

const Header = () => {
  return (
    <header>
      <nav className="headerWrap">
        <h1>
          <link>
            <img src="#" alt="logo" />
            CAMPICK
          </link>
        </h1>
        <div className="menuWarp">
          <ul>
            <li>
              <link>CAMP SITE</link>
            </li>
            <li>
              <link>MARKET</link>
            </li>
            <li>
              <link>CONTENTS</link>
            </li>
            <li>
              <link>EVNET</link>
            </li>
          </ul>
        </div>
        <div className="privacyWarp">
          <ul>
            {/* 로그인 전 */}
            <li className="public">
              <link>SIGN IN</link>
            </li>
            <li className="public">
              <link>SIGN UP</link>
            </li>
            {/* 로그인 후 */}
            <li className="privacy">
              <link>SETTING</link>
            </li>
            <li className="privacy">
              <link>LOGOUT</link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
