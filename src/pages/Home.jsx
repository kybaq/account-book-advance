import React, { useContext, useEffect } from "react";
import AccountForm from "../components/AccountForm";
import AccountMonthly from "../components/AccountMonthly";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Stsection = styled.section`
  margin: 40px;
`;

function AccountHome() {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }
  }, []);

  return (
    <Stsection>
      {isAuthenticated ? (
        <>
          <AccountForm />
          <AccountMonthly />
        </>
      ) : null}
    </Stsection>
  );
}

export default AccountHome;
