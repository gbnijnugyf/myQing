/* eslint-disable jsx-quotes */
import { Button } from "@taroify/core";
import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useNavigate } from "react-router-dom";

export function LoginPage() {
  const navigate =useNavigate()
  function clickLogin() {
    Taro.setStorageSync("token", "tokenQing");
    navigate('/main/home')
  }

  return (
    <>
      <View className="index"></View>
      <Button onClick={clickLogin}>登录</Button>
    </>
  );
}
