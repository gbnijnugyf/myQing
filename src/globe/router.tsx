/* eslint-disable jsx-quotes */
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Taro from "@tarojs/taro";
import { useEffect } from "react";
import { LoginPage } from "@/pages/OtherPages/loginPage";
import { MainPage } from "@/pages/OtherPages/mainPage";
import { Home } from "@/pages/OtherPages/homePage";
import { Person } from "@/pages/OtherPages/personPage";
import { Todo } from "@/pages/OtherPages/todoPage";

export function Routers() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let token = Taro.getStorageSync("token");
    if (token !== "" && !location.pathname.startsWith("/login")) {
      navigate("/main/home");
    } else if (token === "" && !location.pathname.startsWith("/login")) {
      // navigate("/main/home");
      navigate("/login");
    }
  }, []);

  return (
    <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route path="main/*" element={<MainPage />}>
        <Route path="home" element={<Home />}></Route>
        <Route path="todo" element={<Todo />}></Route>
        <Route path="my" element={<Person />}></Route>
      </Route>
    </Routes>
  );
}


function Message() {
  return <>消息</>;
}
