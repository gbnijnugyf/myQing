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
      <div className="board">
        <BrowserRouter>
          <Routers />
        </BrowserRouter>
      </div>
    </>
  );
}
