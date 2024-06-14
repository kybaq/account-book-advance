import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Header() {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const onLogoutHandler = () => {
    const isConfirmed = window.confirm("로그아웃 하시겠습니까?");
    if (isConfirmed) {
      logout();
      navigate("/");
      return;
    }
  };

  const handleClick = () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    } else {
      navigate("/mypage");
      return;
    }
  };

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: "olivedrab",
        width: "100vw",
      }}
    >
      <h1 onClick={() => navigate("/")}>메인페이지로</h1>
      {isAuthenticated ? (
        <>
          <button onClick={handleClick}>Go to MyPage</button>
          <button onClick={onLogoutHandler}>로그아웃</button>
        </>
      ) : (
        <Link to="/login">
          <button>로그인</button>
        </Link>
      )}
    </header>
  );
}
