/* eslint-disable jsx-quotes */
import { Button, Cell, Toast, Form, Field } from "@taroify/core";
import Taro from "@tarojs/taro";
import { useNavigate } from "react-router-dom";
import {
  BaseEventOrig,
  FormProps,
  View,
  Text,
  Input,
} from "@tarojs/components";
import { useEffect, useRef, useState } from "react";
import { Service } from "@/globe/service";
import { ILogin } from "@/globe/inter";
import {JSEncrypt} from 'jsencrypt';
import "./index.scss";

export function LoginPage() {
  const navigate = useNavigate();
  const [toastOpen1, setToastOpen1] = useState<boolean>(true);
  const [toastOpen2, setToastOpen2] = useState<boolean>(false);
  const [toastOpen3, setToastOpen3] = useState<boolean>(false);

  // useEffect(() => {
  //   // function str2ab(str: string): ArrayBuffer {
  //   //   const encoder = new TextEncoder();
  //   //   return encoder.encode(str);
  //   // }
  //   function importPublicKey(pem) {
  //     // 创建 JSEncrypt 实例
  //     const encryptor = new JSEncrypt();

  //     // 设置公钥
  //     encryptor.setPublicKey(`-----BEGIN RSA PUBLIC KEY-----
  //     MIGJAoGBANfatEl/MnUTVklV16LWh9is4R2YlWpULa3FserkAn2Gk6bf75sQTrNe
  //     mWga3rxKJtlApE7YarRcNJA49Ep/10D1jC3Y6BCZmX23vGkkpf91SxKZWPR2BUsw
  //     9F4Ft9gKWJ+4DKfyRGHq5yJnMHa3yqkPs3bc+8r/bML6OxGHnqWxAgMBAAE=
  //     -----END RSA PUBLIC KEY-----
  //     `);

  //     return encryptor;
  //   }
  //   Service.getPublicKey().then(async (res) => {
  //     console.log(res.data);
  //     const encryptor = await importPublicKey(res.data);
  //     console.log("2:", encryptor);

  //     // 要加密的明文数据
  //     const plaintext = "Hello, World!";

  //     const ciphertext = encryptor.encrypt(plaintext);
  //     console.log("Ciphertext:", ciphertext);
  //     // const publicKeyPem = res.data.data
  //     // const publicKeyBuffer = str2ab(publicKeyPem);
  //   });
  // }, []);

  function LoginForm() {
    const [userId, setUserId] = useState<string>("");
    const [userPass, setUserPass] = useState<string>("");

    function clickLogin(event: BaseEventOrig<FormProps.onSubmitEventDetail>) {
      // console.log(event);
      // const info = event;
      const info = event.detail.value as ILogin;
      if (info.username !== "" && info.password !== "") {
        Service.login(info)
          .then((res) => {
            if (res.data.data === "failed") {
              setToastOpen2(true);
              setTimeout(() => {
                setToastOpen2(false);
              }, 3000);
            } else {
              Taro.setStorageSync("token", "tokenQing");
              navigate("/main/home");
            }
          })
          .catch(() => {
            setToastOpen3(true);
            setTimeout(() => {
              setToastOpen3(false);
            }, 3000);
          });
      }
    }
    return (
      //TODO:真机调试有BUG，输入框疯狂刷新，刚输入的就没了
      <Form onSubmit={(e) => clickLogin(e)} ref={useRef()}>
        <Toast open={toastOpen2}>密码或用户名错误</Toast>
        <Toast open={toastOpen3}>服务端错误，请稍后重试</Toast>
        <Cell.Group inset>
          <Form.Item
            name="username"
            rules={[{ required: true, message: "请填写用户名" }]}
          >
            <Form.Label>用户名</Form.Label>
            <Form.Control>
              <Input placeholder="用户名" />
            </Form.Control>
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "请填写密码" }]}
          >
            <Form.Label>密码</Form.Label>
            <Form.Control>
              <Input password placeholder="密码" />
            </Form.Control>
          </Form.Item>
        </Cell.Group>
        <View style={{ margin: "16px" }}>
          <Button shape="round" block color="primary" formType="submit">
            进入空间
          </Button>
        </View>
      </Form>
      // <View className="login-form">
      //   <Cell className="login-cell">
      //     <div>用户名</div>
      //     <div>
      //       <Input
      //         type="text"
      //         placeholder="请输入用户名"
      //         onInput={(e) => setUserId(e.detail.value)}
      //       />
      //     </div>
      //   </Cell>
      //   <Toast open={toastOpen2}>密码或用户名错误</Toast>
      //   <Toast open={toastOpen3}>服务端错误，请稍后重试</Toast>
      //   <Cell className="login-cell">
      //     <Text>密码</Text>
      //     <Input
      //       password
      //       placeholder="请输入密码"
      //       onInput={(e) => setUserPass(e.detail.value)}
      //     />
      //   </Cell>
      //   <Button
      //     onClick={() => {
      //       clickLogin({ username: userId, password: userPass });
      //     }}
      //   >
      //     进入空间
      //   </Button>
      // </View>
    );
  }

  //TODO:此处关闭提示会导致整个页面刷新，用户输入将被清空
  setTimeout(() => {
    setToastOpen1(false);
  }, 3000);

  return (
    <>
      <div className="login-page">
        {/* <div className="login-board"> */}
        {/* <PasswordInput length={6} />
          <Button onClick={clickLogin}>登录</Button> */}
        <Toast open={toastOpen1}>
          该程序只为一人编写，若您无意进入敬请离开
        </Toast>
        <h1 style={{ color: "rgb(240, 120, 186)", marginBottom: "5vh" }}>
          {/* my晴宝 */}
        </h1>
        <LoginForm />
        {/* <BasicForm /> */}
        {/* </div> */}
      </div>
    </>
  );
}
