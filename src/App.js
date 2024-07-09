import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import Header from "../src/components/HeaderFooter/Header";
import Footer from "../src/components/HeaderFooter/Footer";

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
import ChatList from "./pages/Market/ChatList";
import Chat from "./pages/Market/Chat";

import Contents from "./pages/Contents/Contents";
import ContentsBlog from "./pages/Contents/ContentsBlog";
import ContentsVideo from "./pages/Contents/ContentsVideo";
import BlogPostWrite from "./pages/Contents/BlogPostWrite";
import BlogPostDetail from "./pages/Contents/BlogPostDetail";
import BlogPostEdit from "./pages/Contents/BlogPostEdit";

import Event from "./pages/Event/Event";
import EventFinished from "./pages/Event/EventFinished";
import EventProceeding from "./pages/Event/EventProceeding";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

import Campsite from "./pages/Campsite/Campsite";
import SiteDetail from "./pages/Campsite/SiteDetail";

import ScrollTopBtn from "./components/ScrollTop/ScrollTopBtn";

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
          <Route path="edit-info" element={<EditInfo />} />
          <Route path="customer-service" element={<CustomerService />} />
        </Route>
        {/* =================== Campsite Area ===================  */}
        <Route path="/campsite" element={<Campsite />} />
        <Route path="/site-detail/:id" element={<SiteDetail />} />
        {/* <Route path="/site-review-write" element={<SiteReviewWrite />} /> */}

        {/* =================== Market Area ===================  */}
        <Route path="/market" element={<Market />} />
        <Route path="/sale-post-write" element={<SalePostWrite />} />
        <Route path="/sale-post-detail/:id" element={<SaleDetail />} />
        <Route path="/sale-post-edit/:id" element={<SalePostEdit />} />
        <Route path="/sale-chat" element={<ChatList />} />
        <Route path="/sale-chat/:id" element={<Chat />} />

        {/* =================== contents page =================== */}
        <Route path="/contents" element={<Contents />}>
          <Route index element={<Navigate to="contentsBlog" replace />} />
          <Route path="contentsBlog" element={<ContentsBlog />} />
          <Route path="contentsVideo" element={<ContentsVideo />} />
        </Route>
        <Route path="/blog-post-write" element={<BlogPostWrite />} />
        <Route path="/blog-post-detail/:id" element={<BlogPostDetail />} />
        <Route path="/blog-post-edit/:id" element={<BlogPostEdit />} />
        {/* =================== event page =================== */}
        <Route path="/event" element={<Event />}>
          <Route index element={<Navigate to="eventProceeding" replace />} />
          <Route path="eventFinished" element={<EventFinished />} />
          <Route path="eventProceeding" element={<EventProceeding />} />
        </Route>

        {/* =================== Login Page ===================  */}
        <Route path="/signin" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="*" element={<>잘못된 경로입니다</>} />
      </Routes>
      <ScrollTopBtn />
      <Footer />
    </div>
  );
}

export default App;
