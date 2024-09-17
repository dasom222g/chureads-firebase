import React, { useState } from "react";
import InputField from "../components/InputField";
import LoginButton from "../components/LoginButton";
import { Link, useNavigate } from "react-router-dom";
import Error from "../components/Error";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {
  // logic
  const history = useNavigate();

  // const goToHome = () => {
  //   history("/");
  // };

  const INITFORMDATA = {
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

  // 로그인 제출
  const handleSumbit = async (event) => {
    // 제출시 새로고침 방지
    event.preventDefault();
    // TODO: error state 생성후 작성하기
    setErrorMessage(""); // 에러 초기화

    // 로딩 중이면 실행 안함
    if (isLoading) return;
    const { email: emailValue, password: passwordValue } = formData;

    // 불필요한 공백 제거 후 체크
    const email = emailValue.trim();
    const password = passwordValue.trim();

    // email, password 중에 하나라도 빈값이면 실행 안함
    if (!email || !password) return;

    try {
      setIsLoading(true);

      // TODO: 1. 계정 로그인
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log("🚀 ~ handleSumbit ~ result:", result);

      // TODO: 2. Home화면으로 보내기
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
        {/* <h2>Login</h2> */}
        {/* <button type="button" onClick={goToHome}>
          Home화면으로 이동
        </button> */}
        {/* <Link to={"/"} style={{ color: "red" }} className="link">
          Home화면으로 이동
        </Link> */}
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
            field="email"
            onInputChange={handleInputChange}
          />
          <InputField
            type="password"
            field="password"
            onInputChange={handleInputChange}
          />
          {errorMessage && <Error message={errorMessage} />}
          <LoginButton category="login" text="Login" />
        </form>
        {/* END: 폼 영역 */}
        <div className="flex justify-center gap-1 py-6">
          <p className="text-churead-gray-600">계정이 없으신가요?</p>
          <Link to="/sign-up" className="text-churead-blue">
            가입하기
          </Link>
        </div>
        <p className="text-gray-500 text-sm relative mb-4">
          {" "}
          <i className="block w-full h-[1px] bg-churead-gray-300 bg-opacity-15 absolute top-1/2 transform -translate-y-1/2" />{" "}
          <span className="bg-churead-black relative z-10 px-2"> or </span>{" "}
        </p>
        {/* START: 소셜 로그인 영역 */}
        <LoginButton category="socialLogin" text="Continue with Google" />
        {/* END: 소셜 로그인 영역 */}
      </div>
    </div>
  );
};

export default Login;
