<<<<<<< HEAD
/* eslint-disable jsx-quotes */
import { View, Text, Button } from "@tarojs/components";
import { BrowserRouter } from "react-router-dom";
import { useLoad } from "@tarojs/taro";
import { Routers } from "@/router";
import { useState } from "react";
=======
import { View, Text } from "@tarojs/components";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import { useLoad } from "@tarojs/taro";
import { Button } from 'antd-mobile/2x'
>>>>>>> a1a98775b97fe201fca717dc1da6d03b300f3a0b
import "./index.scss";

export default function Index() {
  useLoad(() => {
    console.log("Page loaded.");
  });
<<<<<<< HEAD
  const[state, setState] = useState<boolean>(false)
  return (
    <>
      <View className="index">
        <Button plain type="primary" size="mini" onClick={()=>setState(true)}>
          点击进入
        </Button>
        <Text>Hello</Text>
      </View>
      <BrowserRouter>
        <Routers state={state} />
=======

  return (
    <>
      <View className='index'>
        <Text>Hello world!</Text>
      </View>
      <Button size='large'>das</Button>
      <BrowserRouter>
        <View className='drawer-box'>
          <View className='box-item'>
            <Link to='/pages/router/index/view1?a=1&b=2'>view1</Link>
          </View>
          <View className='box-item'>
            <Link to='/pages/router/index/view2#a=3&b=4'>view2</Link>
          </View>
          <View className='box-item'>
            <Link to='/pages/router/index/2?a=1&b=2#a=3&b=4'>view3</Link>
          </View>
        </View>

        <Routes>
          <Route path='/pages/browser-router/index' element={<Home />}></Route>
          <Route path='/pages/router/index/view1' element={<View1 />}></Route>
          <Route path='/pages/router/index/view2' element={<View2 />}></Route>
          <Route path='/pages/router/index/:id' element={<View3 />}></Route>
        </Routes>
>>>>>>> a1a98775b97fe201fca717dc1da6d03b300f3a0b
      </BrowserRouter>
    </>
  );
}
<<<<<<< HEAD
=======

function Home(){
  return(<></>)
}
function View1(){
  return(<></>)
}function View2(){
  return(<></>)
}function View3(){
  return(<></>)
}
>>>>>>> a1a98775b97fe201fca717dc1da6d03b300f3a0b
