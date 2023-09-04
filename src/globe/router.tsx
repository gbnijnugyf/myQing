/* eslint-disable jsx-quotes */
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Taro from "@tarojs/taro";
import { useEffect } from "react";
import { MainPage } from "../pages/index/OtherPages/mainPage";
import { LoginPage } from "../pages/index/OtherPages/loginPage";

export function Routers() {
  
  const navigate = useNavigate()
  const location = useLocation();

  useEffect(()=>{
    let token = Taro.getStorageSync('token')
    console.log(location)
    if(token !== ''){
      console.log(token+"1")
      navigate('/main/home')
    }else if(token === '' && !location.pathname.startsWith("/login")){
      console.log(token)
      navigate('/login')
    }
  }, [])

  return (
    <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route path="main/*" element={<MainPage />}>
        <Route path="home" element={<Home />}></Route>
        <Route path="todo" element={<Todo />}></Route>
        <Route path="message" element={<Message />}></Route>
        <Route path="my" element={<Person />}></Route>
      </Route>
    </Routes>
  );
}

function Home() {
  return <>首页</>;
}
function Todo() {
  return <>代办</>;
}
function Message() {
  return <>消息</>;
}
function Person() {
  return <>我的</>;
}
