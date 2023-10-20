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
    console.log("running")
    let token = Taro.getStorageSync("token");
    if (token !== "" && !location.pathname.startsWith("/login")) {
      if(!location.pathname.startsWith("/main")){
        navigate("/main/home");
      }
    } else if (token === "" && !location.pathname.startsWith("/login")) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route path="main/*" element={<MainPage />}>
        {/* TODO:后期功能——增加喜好厌恶（个人画像）模块 */}
        <Route path="home" element={<Home />}></Route>
        <Route path="todo" element={<Todo />}></Route>
        <Route path="my" element={<Person />}></Route>
      </Route>
    </Routes>
  );
}
