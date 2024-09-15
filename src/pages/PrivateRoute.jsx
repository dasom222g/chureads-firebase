import React from "react";
import { auth } from "../firebase";
import { Navigate, Outlet } from "react-router-dom";

// 로그인 여부 체크 컴포넌트
const PrivateRoute = () => {
  const user = auth.currentUser; // User || null
  console.log("🚀 ~ PrivateRoute ~ user:", user);

  return user ? (
    <>
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
