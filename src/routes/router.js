import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import PrivateRoute from "../pages/PrivateRoute";
import Home from "../pages/Home";
import Post from "../pages/Post";
import Profile from "../pages/Profile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoute />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/post",
        element: <Post />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
  // 각 객체 하나가 페이지 하나
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
]);
