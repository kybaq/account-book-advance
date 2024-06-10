import React, { useRef } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";

function SignUp() {
  const idRef = useRef(null);
  const passwordRef = useRef(null);

  const onHandleSubmit = (evt) => {
    evt.preventDefault();

    console.log(idRef.current.value, passwordRef.current.value);
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
                onChange={(evt) => {
                  idRef.current.value = evt.target.value;
                }}
                minLength={4}
                maxLength={10}
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            {/* <Form.Label>비밀번호</Form.Label> */}
            <FloatingLabel
              controlId="floatingSignUpPasswordInput"
              label="비밀번호"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="비밀번호를 입력해주세요"
                ref={idRef}
                onChange={(evt) => {
                  idRef.current.value = evt.target.value;
                }}
                minLength={4}
                maxLength={15}
              />
            </FloatingLabel>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              {/* Label 은 말 그대로 input 의 label */}
              {/* <Form.Label>아이디</Form.Label> */}
              {/* input type 이나 place holder 설정 */}
              <FloatingLabel
                controlId="floatingSignUpNameInput"
                label="닉네임"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="닉네임을 입력해주세요"
                  ref={idRef}
                  onChange={(evt) => {
                    idRef.current.value = evt.target.value;
                  }}
                  minLength={1}
                  maxLength={10}
                />
              </FloatingLabel>
            </Form.Group>
            <Form.Text className="text-muted">
              회원님이 입력하신 정보는 외부에 공유하지 않습니다.
            </Form.Text>
          </Form.Group>
          {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group> */}
          <Button variant="primary" type="submit">
            회원 가입
          </Button>
          <Link to="/login">
            <Button variant="secondary" type="button">
              로그인
            </Button>
          </Link>
        </Form>
      </div>
    </section>
  );
}

export default SignUp;
