import React, { useState } from "react";
import InputField from "../components/InputField";
import LoginButton from "../components/LoginButton";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import Error from "../components/Error";

const SignUp = () => {
  // logic
  const history = useNavigate();

  const INITFORMDATA = {
    name: "",
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState(INITFORMDATA);

  const [isLoading, setIsLoading] = useState(false); // 계정 가입시 로딩처리

  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (name, value) => {
    const resultFormData = { ...formData, [name]: value };
    setFormData(resultFormData);
  };

  // 가입 정보 제출
  const handleSumbit = async (event) => {
    // 제출시 새로고침 방지
    event.preventDefault();
    // TODO: error state 생성후 작성하기
    setErrorMessage(""); // 에러 초기화

    // 로딩 중이면 실행 안함
    if (isLoading) return;
    const {
      name: nameValue,
      email: emailValue,
      password: passwordValue,
    } = formData;

    const name = nameValue.trim();
    const email = emailValue.trim();
    const password = passwordValue.trim();

    // name, email, password 중에 하나라도 빈값이면 실행 안함
    if (!name || !email || !password) return;

    try {
      setIsLoading(true);

      // TODO: 1. 가입 계정 생성
      const credential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // TODO: 2. 사용자 이름 세팅하기
      await updateProfile(credential.user, {
        displayName: name,
      });

      // TODO: 3. Home화면으로 보내기
      history("/");
    } catch (error) {
      console.log("error", error.message);
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // view
  return (
    <div className="h-full flex flex-col justify-center">
      <div className="text-center px-6">
        <h1 className="flex justify-center">
          <img src="./images/logo.svg" alt="churead로고" />
        </h1>
        <h3 className="text-red font-bold text-base py-6">
          Churead에서 소통해보세요
        </h3>
        {/* START: 폼 영역 */}
        <form
          id="login-form"
          className="text-center flex flex-col gap-2"
          onSubmit={handleSumbit}
        >
          <InputField
            type="text"
            field="name"
            onInputChange={handleInputChange}
          />
          <InputField
            type="text"
            field="email"
            onInputChange={handleInputChange}
          />
          <InputField
            type="password"
            field="password"
            onInputChange={handleInputChange}
          />
          {errorMessage && <Error message={errorMessage} />}
          <LoginButton
            category="login"
            text={isLoading ? "Loading" : "Create Account"}
          />
        </form>
        {/* END: 폼 영역 */}
        <div className="flex justify-center gap-1 py-6">
          <p className="text-churead-gray-600">계정이 있으신가요?</p>
          <Link to="/login" className="text-churead-blue">
            로그인
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
