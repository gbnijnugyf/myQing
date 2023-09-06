/* eslint-disable jsx-quotes */
import { Button, Cell, Input, Toast, Form } from "@taroify/core";
import Taro from "@tarojs/taro";
import { useNavigate } from "react-router-dom";
import { BaseEventOrig, FormProps, View } from "@tarojs/components";
import { useState } from "react";
import { Service } from "@/globe/service";
import { ILogin } from "@/globe/inter";
import "./index.scss";

export function LoginPage() {
  const navigate = useNavigate();
  const [toastOpen1, setToastOpen1] = useState<boolean>(true);
  const [toastOpen2, setToastOpen2] = useState<boolean>(false);
  const [toastOpen3, setToastOpen3] = useState<boolean>(false);

  function LoginForm() {
    function clickLogin(event: BaseEventOrig<FormProps.onSubmitEventDetail>) {
      const info = event.detail.value as ILogin;
      if (info.username !== "" && info.password !== "") {
        Service.login(info)
          .then((res) => {
            if (res.data.data === "fail") {
              setToastOpen2(true);
              console.log("密码或用户名错误");
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
            console.log("服务端错误，请稍后重试");
            setTimeout(() => {
              setToastOpen3(false);
            }, 3000);
          });
      }
    }
    return (
      <Form onSubmit={(e) => clickLogin(e)}>
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
            提交
          </Button>
        </View>
      </Form>
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
        <Toast open={toastOpen1} position="top">
          该程序只为一人编写，若您无意进入敬请离开
        </Toast>
        <h1 style={{ color: "rgb(240, 120, 186)", marginBottom: "5vh" }}>
          my晴宝
        </h1>
        <LoginForm />
        {/* </div> */}
      </div>
    </>
  );
}
