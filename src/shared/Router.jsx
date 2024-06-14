import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyle from "../GlobalStyle";
import Home from "../pages/Home";
import Detail from "../pages/Detail";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Header from "../components/common/Header";
import MyPage from "../pages/MyPage";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

// Public: 로그인이 필요 없는 페이지에 접근할 수 있도록 만드는 컴포넌트
// 로그인 되어있다면, login / signup 은 mypage 로 이동 시킴
// 구조 분해 할당에서 element 로 props 보냈는데 이름을 Element 로 바꾼 것임.
// 컴포넌트 이름은 대문자로 쓰니까!
const PublicRoute = ({ element: Element, ...rest }) => {
  const { isAuthenticated } = useContext(AuthContext);
  // ...rest 에는 나머지 props 들이 들어가게 될 자리, prop={props} 처럼 들어갈 것임.
  return isAuthenticated ? <Navigate to="/mypage" /> : <Element {...rest} />;
};

// Private: 로그인이 필요한 페이지.
// 로그인 되어있다면 그대로 보여주고, 아니라면 로그인 페이지 이동 시킴.
const PrivateRoute = ({ element: Element, ...rest }) => {
  const { isAuthenticated } = useContext(AuthContext);
  // 로그인 했으면, mypage 그대로 보여주고 아니면 로그인 페이지로 이동 시킴
  return isAuthenticated ? <Element {...rest} /> : <Navigate to="/login" />;
};

function Router() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        {/* 로그인 안 했을 때만 진입 가능 */}
        <Route path="/login" element={<PublicRoute element={Login} />} />
        <Route path="/signup" element={<PublicRoute element={Signup} />} />
        {/* 로그인 해야만 진입 가능 */}
        <Route path="/mypage" element={<PrivateRoute element={MyPage} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
