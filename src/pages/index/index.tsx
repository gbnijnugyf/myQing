/* eslint-disable jsx-quotes */
import { BrowserRouter } from "react-router-dom";
import { Routers } from "@/router";
import Taro, { useLoad } from "@tarojs/taro";
import { useEffect, useState } from "react";

import "./index.scss";

export default function Index() {
  useLoad(() => {
    console.log("Page loaded.");
  });
  // const [state, setState] = useState<boolean>(false);
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
