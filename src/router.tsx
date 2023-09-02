/* eslint-disable jsx-quotes */
// import { UserOutlined } from "@ant-design/icons";
import { View, Text, Button } from "@tarojs/components";
import { Route, Routes, useNavigate } from "react-router-dom";
import { MainPage } from "./pages/index/OtherPages/mainPage";
// import { MainPage } from "./pages/OtherPages/mainPage";

interface IRouter{
  state:boolean
}

export function Routers(props: IRouter) {
  
  const navigate = useNavigate()
  if(props.state === true){
    navigate('login')
    console.log("1")
  }

  return (
    <Routes>
      <Route path="login/*" element={<LoginPage />} />
      <Route path="main/*" element={<MainPage />}>
        <Route path="home" element={<Home />}></Route>
        <Route path="todo" element={<Todo />}></Route>
        <Route path="message" element={<Message />}></Route>
        <Route path="my" element={<Person />}></Route>
      </Route>
    </Routes>
  );
}
function LoginPage() {
  return (
    <>
      <View className="index">
        {/* <Text>此应用只属于一个人，若您无意进入，请离开sss</Text> */}
      </View>
      <Button>点击进入</Button>
    </>
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
