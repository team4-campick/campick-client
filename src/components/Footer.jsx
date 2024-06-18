import React from "react";

const styles = {
  footer: {
    width: "100%",
    position: "absolute",
    bottom: "0",
  },
  copyrightWrap: {
    borderTop: "1px solid #B7B6B6",
    textAlign: "center",
    padding: "10px 0",
    marginTop: "20px",
  },
  copyrightmemo: {
    margin: "20px 0",
    fontSize: " 12px",
  },
};

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div className="copyrightWrap" style={styles.copyrightWrap}>
        <p style={styles.copyrightmemo}>
          &copy; team_campick. All rights reserved. The design refers to 'STAY
          FOLIO'.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
