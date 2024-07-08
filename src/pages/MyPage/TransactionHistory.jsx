import React from "react";
import { Link, Outlet } from "react-router-dom";

const TransactionHistory = () => {
  return (
    <section>
      <h3 hidden>TransactionHistory</h3>
      <nav className="myPage_SubHeader">
        <Link to={"sale"}>판매</Link>
        <span>&nbsp;&#47;&nbsp;</span>
        <Link to={"purchase"}>구매</Link>
      </nav>
      <Outlet></Outlet>
    </section>
  );
};

export default TransactionHistory;
