import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
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
import SalePostEdit from "./pages/Market/SalePostEdit";
import Chat from "./pages/Market/Chat";

import Contents from "./pages/Contents/Contents";
import Event from "./pages/Event";
import ContentsBlog from "./pages/Contents/ContentsBlog";
import ContentsVideo from "./pages/Contents/ContentsVideo";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Mainpage />} />

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
          <Route path="edit-info/:userId" element={<EditInfo />} />
          <Route
            path="customer-service/:userId"
            element={<CustomerService />}
          />
        </Route>

        {/* =================== Market Area ===================  */}
        <Route path="/market" element={<Market />} />
        <Route path="/sale-post-write" element={<SalePostWrite />} />
        <Route path="/sale-detail/:id" element={<SaleDetail />} />
        <Route path="/sale-post-edit/:id" element={<SalePostEdit />} />
        <Route path="/sale-chat/:id" element={<Chat />} />

        {/* =================== contents page =================== */}
        <Route path="/contents" element={<Contents />}>
          <Route index element={<Navigate to="contentsBlog" replace />} />

          <Route path="contentsBlog" element={<ContentsBlog />} />
          <Route path="contentsVideo" element={<ContentsVideo />} />
        </Route>
        {/* =================== event page =================== */}
        <Route path="/event" element={<Event />} />

        {/* =================== Login Page ===================  */}
        <Route path="/signin" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="*" element={<>잘못된 경로입니다</>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
