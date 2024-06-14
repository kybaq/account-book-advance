import { createContext, useState } from "react";

export const AuthContext = createContext(null);

// 저장소에서 token 가져오기
const token = localStorage.getItem("accessToken");

// token 에 따라 로그인 여부를 판별하기 위한 전역 상태
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);

  const login = (accessToken) => {
    localStorage.setItem("accessToken", accessToken);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
