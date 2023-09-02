/* eslint-disable jsx-quotes */
import { View, Text, Button } from "@tarojs/components";
import { BrowserRouter } from "react-router-dom";
import { useLoad } from "@tarojs/taro";
import { Routers } from "@/router";
import { useState } from "react";
import "./index.scss";

export default function Index() {
  useLoad(() => {
    console.log("Page loaded.");
  });
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
      </BrowserRouter>
    </>
  );
}
