import React, { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Toasts from "../components/Toasts";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

function Login() {
  const [isToastOpen, setIsToastOpen] = useState(false);
  const idRef = useRef(null);
  const passwordRef = useRef(null);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const onHandleSubmit = async (evt) => {
    evt.preventDefault();

    const id = idRef.current.value;
    const password = passwordRef.current.value;

    if (!idRef.current.value || !passwordRef.current.value) {
      setIsToastOpen(true);
      return;
    } else {
      setIsToastOpen(false);
    }

    try {
      const response = await axios.post(
        "https://moneyfulpublicpolicy.co.kr/login",
        {
          id,
          password,
        }
      );

      const data = response.data;
      console.log(data);
      if (data.success) {
        login(data.accessToken);
        navigate("/");
      } else alert("로그인 실패, 다시 시도해주세요");
    } catch (err) {
      console.error("로그인 오류", err);
      alert("아이디나 비밀번호를 올바르게 입력해주세요");
    }
  };

  return (
    <section>
      SignUp
      <Link to="/">홈</Link>
      <div>
        <Form onSubmit={onHandleSubmit}>
          {/* 하나의 input 을 Group 으로 감싸줌 */}
          {/* controlId 는 input 의 id 를 붙인다고 생각 */}
          <Form.Group className="mb-3" controlId="formBasicEmail">
            {/* Label 은 말 그대로 input 의 label */}
            {/* <Form.Label>아이디</Form.Label> */}
            {/* input type 이나 place holder 설정 */}
            <FloatingLabel
              controlId="floatingSignUpIdInput"
              label="아이디"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="아이디를 입력해주세요"
                ref={idRef}
                minLength={4}
                maxLength={10}
                // NOTE: 길이 유효성 검사 가능하게 만들기
              />
            </FloatingLabel>
            <Form.Text className="text-muted">
              아이디는 최소 4자 부터, 최대 10자까지 입력 가능합니다.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            {/* <Form.Label>비밀번호</Form.Label> */}
            <FloatingLabel
              controlId="floatingSignUpPasswordInput"
              label="비밀번호"
              className="mb-3"
            >
              <Form.Control
                type="password"
                placeholder="비밀번호를 입력해주세요"
                ref={passwordRef}
                minLength={4}
                maxLength={15}
              />
            </FloatingLabel>
            <Form.Text className="text-muted">
              비밀번호는 최소 4자, 최대 15자까지 입력 가능합니다.
            </Form.Text>
          </Form.Group>
          {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group> */}
          <Button variant="primary" type="submit">
            로그인
          </Button>
          <Link to="/signup">
            <Button variant="secondary" type="button">
              회원가입
            </Button>
          </Link>
        </Form>
      </div>
      <Toasts isToastOpen={isToastOpen} />
    </section>
  );
}

export default Login;
