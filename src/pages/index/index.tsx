/* eslint-disable jsx-quotes */
import { BrowserRouter } from "react-router-dom";
import { Routers } from "@/globe/router";
import Taro, { useLoad } from "@tarojs/taro";
import { useEffect, useState } from "react";

import "./index.scss";

export default function Index() {
  useLoad(() => {
  });
  const [token, setToken] = useState<string>("");
  useEffect(() => {
    setToken(Taro.getStorageSync("token"));
  }, [token]);

  return (
    <>
      {/* <button
        style={{
          width: "auto",
          height: "auto",
          zIndex: "999",
          position: "absolute",
        }}
        onClick={() => {
          if (token !== "") {
            Taro.removeStorageSync("token");
            setToken("");
          } else {
            Taro.setStorageSync("token", "tokenQing");
            setToken("tokenQing");
          }
        }}
      >
        {token !== "" ? "删除" : "生成"}token
      </button> */}
      <div className="board">
        <BrowserRouter>
          <Routers />
        </BrowserRouter>
      </div>
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
