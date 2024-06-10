import React from "react";
import AccountForm from "../components/AccountForm";
import AccountMonthly from "../components/AccountMonthly";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Stsection = styled.section`
  margin: 40px;
`;

function AccountHome() {
  return (
    <Stsection>
      <AccountForm />
      <AccountMonthly />
      <Link to="/login">로그인</Link>
      <Link to="/signup">회원가입</Link>
    </Stsection>
  );
}

export default AccountHome;
