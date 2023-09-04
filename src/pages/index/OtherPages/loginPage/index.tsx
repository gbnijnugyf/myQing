/* eslint-disable jsx-quotes */
import { Button, Cell, Input, Toast, Form } from "@taroify/core";
import Taro from "@tarojs/taro";
import { useNavigate } from "react-router-dom";
import { BaseEventOrig, FormProps, View } from "@tarojs/components";
import { useState } from "react";

import "./index.scss";

export function LoginPage() {
  const navigate = useNavigate();
  const [toastOpen, setToastOpen] = useState<boolean>(true);

  function LoginForm() {
    function clickLogin(event: BaseEventOrig<FormProps.onSubmitEventDetail>) {
      const info = JSON.stringify(event.detail.value);
      //TODO:用户名和密码在此处有安全问题
      if (info === '{"username":"songsong","password":"mzq@20031112"}') {
        Taro.setStorageSync("token", "tokenQing");
        navigate("/main/home");
      }
    }
    return (
      <Form onSubmit={(e) => clickLogin(e)}>
        <Toast id="toast" />
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

  setTimeout(() => {
    setToastOpen(false);
  }, 7000);

  return (
    <>
      <div className="login-page">
        {/* <div className="login-board"> */}
        {/* <PasswordInput length={6} />
          <Button onClick={clickLogin}>登录</Button> */}
        <Toast open={toastOpen} position="top">
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
