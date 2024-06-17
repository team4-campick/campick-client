import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const TransactionHistory = () => {
  return (
    <section>
      <h3 hidden>TransactionHistory</h3>
      <nav>
        <Link to={'sale'}>판매</Link>
        <span>&#47;</span>
        <Link to={'purchase'}>구매</Link>
      </nav>
      <Outlet></Outlet>
    </section>
  );
};

export default TransactionHistory;
