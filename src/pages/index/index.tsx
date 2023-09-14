import { View, Text, Button } from "@tarojs/components";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import { useLoad } from "@tarojs/taro";
import "./index.scss";

export default function Index() {
  useLoad(() => {
    console.log("Page loaded.");
  });

  return (
    <>
      <View className='index'>
        <Text>Hello world!</Text>
      </View>
      <Button>das</Button>
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
      </BrowserRouter>
    </>
  );
}

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
