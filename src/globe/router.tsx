/* eslint-disable jsx-quotes */
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Taro from "@tarojs/taro";
import { useEffect } from "react";
import { LoginPage } from "@/pages/OtherPages/loginPage";
import { MainPage } from "@/pages/OtherPages/mainPage";
import { Home } from "@/pages/OtherPages/homePage";

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
      navigate('/main/home')
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


function Todo() {
  return <>待办</>;
}
function Message() {
  return <>消息</>;
}
function Person() {
  return <>我的</>;
}
