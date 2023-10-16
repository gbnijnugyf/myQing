/* eslint-disable jsx-quotes */
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Taro from "@tarojs/taro";
import { useEffect } from "react";
import { LoginPage } from "@/pages/OtherPages/loginPage";
import { MainPage } from "@/pages/OtherPages/mainPage";
import { Home } from "@/pages/OtherPages/homePage";
import { Person } from "@/pages/OtherPages/personPage";
import { Todo } from "@/pages/OtherPages/todoPage";
import { JSEncrypt } from "jsencrypt";
import { Service } from "./service";

export function Routers() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let token = Taro.getStorageSync("token");
    if (token !== "" && !location.pathname.startsWith("/login")) {
      navigate("/main/home");
    } else if (token === "" && !location.pathname.startsWith("/login")) {
      // navigate("/main/home");
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    console.log(Taro.getCurrentPages());
  }, [location]);
  useEffect(() => {
    // function str2ab(str: string): ArrayBuffer {
    //   const encoder = new TextEncoder();
    //   return encoder.encode(str);
    // }
    function importPublicKey(publicKey) {
      // 创建 JSEncrypt 实例
      const encryptor = new JSEncrypt();
      // 设置公钥
      // const tkey = `-----BEGIN RSA Public Key-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0y7Ykc7zt5amMSbwTplP\nFHekdvxiVC9ipIydTyNUn3r/X6Dl7yidg5z+ygJvqeS+flu+Jgbt1Wctri4lP3L+\n7Uts6aAsUBP5F66qQ8/cSyi5wxqx3De0HiYMi6ekxdAN6+zmY/Bg/fbxUPHV1HcQ\nXGC+2jABqhVqFmpTe2ZeNyA4X9IETZm0EBWYFtI8AM3ONFHfGkriPIL1xvehd1/W\nJorK8N416Ml8Y3+lbIOZYzj7BgSBL8lI+eYPXAItaSWH8c2AOMDYovCAfZlvD3xo\nZZ0SI5qWPGTVV+nSUOGMjEsBBzpVjwnA1UOwoLG78APUfFE6h0DFjoJwz5wyf0ZK\nuQIDAQAB\n-----END RSA Public Key-----\n`;
      encryptor.setPublicKey(publicKey);
      return encryptor;
    }
    Service.getPublicKey().then(async (res) => {
      console.log(res.data.data);
      const encryptor = await importPublicKey(res.data.data);
      console.log("2:", encryptor);

      // 要加密的明文数据
      const plaintext = "mzq@#@8fsd9fsdss0";

      const ciphertext = await encryptor.encrypt(plaintext);
      console.log("Ciphertext:", ciphertext);

      if (ciphertext != false) {
        Service.postMsgTest({
          password: ciphertext,
          username: ciphertext,
        });
      }
    });
  }, []);

  return (
    <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route path="main/*" element={<MainPage />}>
        {/* TODO:后期功能——增加喜好厌恶（个人画像）模块 */}
        <Route path="home" element={<Home />}></Route>
        <Route path="todo" element={<Todo />}></Route>
        <Route path="my" element={<Person />}></Route>
      </Route>
    </Routes>
  );
}
