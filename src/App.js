import "./App.css";

import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Mainpage from "./pages/Mainpage";

import MyPage from "./pages/MyPage/MyPage";
import BingoCoupon from "./pages/MyPage/BingoCoupon";
import Bingo from "./pages/MyPage/Bingo";
import Coupon from "./pages/MyPage/Coupon";
import TransactionHistory from "./pages/MyPage/TransactionHistory";
import Sale from "./pages/MyPage/Sale";
import Purchase from "./pages/MyPage/Purchase";
import MyPost from "./pages/MyPage/MyPost";
import EditInfo from "./pages/MyPage/EditInfo";
import CustomerService from "./pages/MyPage/CustomerService";

import Market from "./pages/Market/Market";
import SalePostWrite from "./pages/Market/SalePostWrite";
import SaleDetail from "./pages/Market/SaleDetail";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Mainpage />} />
        {/* <Route path="/" element={<Main />} /> */}
        {/* <Route path="/" element={<Main />} /> */}

        {/* =================== My Page Area ===================  */}

        <Route path="/my-page" element={<MyPage />}>
          <Route path="bingo-coupon" element={<BingoCoupon />}>
            <Route path="bingo" element={<Bingo />} />
            <Route path="coupon" element={<Coupon />} />
          </Route>
          <Route path="transaction-history" element={<TransactionHistory />}>
            <Route path="sale" element={<Sale />} />
            <Route path="purchase" element={<Purchase />} />
          </Route>
          <Route path="my-post" element={<MyPost />} />
          <Route path="edit-info" element={<EditInfo />} />
          <Route path="customer-service" element={<CustomerService />} />
        </Route>

        {/* =================== Market Area ===================  */}
        <Route path="/market" element={<Market />} />
        <Route path="/sale-post-write" element={<SalePostWrite />} />
        <Route path="/sale-detail" element={<SaleDetail />} />

        <Route path="*" element={<>잘못된 경로입니다</>} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
