import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Toasts from "../components/Toasts";

function SignUp() {
  const idRef = useRef(null);
  const passwordRef = useRef(null);
  const nicknameRef = useRef(null);

  const [isToastOpen, setIsToastOpen] = useState(false);

  const onHandleSubmit = async (evt) => {
    evt.preventDefault();

    const id = idRef.current.value;
    const password = passwordRef.current.value;
    const nickname = nicknameRef.current.value;

    if (!id || !password || !nickname) {
      setIsToastOpen(true);
      return;
    } else {
      setIsToastOpen(false);
      try {
        const response = await axios.post(
          "https://moneyfulpublicpolicy.co.kr/register",
          {
            id,
            password,
            nickname,
          }
        );

        const data = response.data;

        if (data.success) {
          alert("회원가입이 정상적으로 처리됐습니다.");
          navigate("/login");
        } else alert("회원가입 실패, 다시 시도해주세요.");
      } catch (err) {
        console.error("회원가입 오류", err);
        alert("회원가입 실패, 다시 시도해주세요.");
      }
    }
  };

  return (
    <section>
      <h2>회원가입</h2>
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
                ref={passwordRef}
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
                  ref={nameRef}
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
      <Toasts isToastOpen={isToastOpen} />
    </section>
  );
}

export default SignUp;
