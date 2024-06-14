import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

export default function MyPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);
  const nicknameRef = useRef(null);
  const avatarRef = useRef(null);

  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    if (isAuthenticated) {
      const fetchUserInfo = async () => {
        try {
          const token = localStorage.getItem("accessToken");
          const response = await axios.get(
            "https://moneyfulpublicpolicy.co.kr/user",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setUserInfo(response.data);
        } catch (err) {
          console.error("유저 데이터 불러오기 실패", err);
        }
      };

      fetchUserInfo();
    } else {
      alert("로그인이 필요합니다.");
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const onSubmitHandler = (evt) => {
    evt.preventDefault();
    const newNickname = nicknameRef.current.value;
    const newAvatar = URL.createObjectURL(avatarRef.current.value);

    if (!newNickname) {
      alert("닉네임을 입력해주세요.");
      return;
    }

    const patchUserInfo = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.patch(
          "https://moneyfulpublicpolicy.co.kr/profile",
          {
            nickname: newNickname,
            avatar: newAvatar,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserInfo({
          ...userInfo,
          nickname: response.data.nickname,
          avatar: response.data.avatar,
        });
      } catch (err) {
        console.error("유저 데이터 업데이트 실패", err);
      }
    };

    patchUserInfo();
  };

  return (
    <div>
      <h2>마이 페이지</h2>
      <p>ID: {userInfo.id}</p>
      <p>Nickname: {userInfo.nickname}</p>
      <img src={userInfo.avatar} alt="" />

      <form action="" onSubmit={onSubmitHandler}>
        <input type="text" placeholder="변경할 닉네임" ref={nicknameRef} />
        {/* <input type="file" accept="image/*" ref={avatarRef} /> */}
        <button type="submit">정보 변경</button>
      </form>
    </div>
  );
}
