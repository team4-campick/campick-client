import './App.css';

import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import MyPage from './pages/MyPage';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        {/* <Route path="/" element={<Main />} /> */}
        <Route path="/" element={<Main />} />
        <Route path="/mypage/:nickName" element={<MyPage />} />
        <Route path="*" element={<>잘못된 경로입니다</>} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
