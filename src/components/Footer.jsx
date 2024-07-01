import React from "react";

import style from "./footer.module.css";
const Footer = () => {
  return (
    <footer>
      <div className={style.copyrightWrap}>
        <p className={style.copyrightmemo}>
          &copy; team_campick. All rights reserved. The design refers to 'STAY
          FOLIO'.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
