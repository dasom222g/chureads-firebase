import { RouterProvider } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "./firebase";
import { router } from "./routes/router";

function App() {
  // logic
  const [isLoading, setIsLoading] = useState(true); // 진입시 무조건 로딩

  const init = async () => {
    // firebase에서 로그인 데이터 가져오기
    try {
      await auth.authStateReady(); // 로그인상태 변화 감지하여 감지가 끝나면 그때 컴포넌트 실행
      console.log("인증 완료", auth);
      // 준비된 이후 실행
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div className="bg-churead-black h-full text-white overflow-auto">
      <div className="max-w-[572px] mx-auto h-full">
        {/* <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/post" element={<Post />} />
          </Routes>
        </BrowserRouter> */}
        {isLoading ? <p>Loading...</p> : <RouterProvider router={router} />}
      </div>
    </div>
  );
}

export default App;
