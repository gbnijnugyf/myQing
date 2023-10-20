/* eslint-disable jsx-quotes */
import { Button, Cell, Toast, Form, Field } from "@taroify/core";
import Taro from "@tarojs/taro";
import { Clear } from "@taroify/icons";

import { useNavigate } from "react-router-dom";
import {
  BaseEventOrig,
  FormProps,
  View,
  Text,
  Input,
  Image,
} from "@tarojs/components";
import { useRef, useState } from "react";
import { Service } from "@/globe/service";
import { ILogin, importPublicKey } from "@/globe/inter";
import "./index.scss";

export function LoginPage() {
  const navigate = useNavigate();
  const [toastOpen1, setToastOpen1] = useState<boolean>(true);
  const [toastOpen2, setToastOpen2] = useState<boolean>(false);
  const [toastOpen3, setToastOpen3] = useState<boolean>(false);

  function LoginForm() {

    function clickLogin(event: BaseEventOrig<FormProps.onSubmitEventDetail>) {
      let info = event.detail.value as ILogin;
      if (
        info.username !== "" &&
        info.password !== "" &&
        info.username !== false &&
        info.password != false
      ) {
        Service.getPublicKey().then(async (res) => {
          const encryptor = await importPublicKey(res.data.data);
          info.username = await encryptor.encrypt(info.username as string);
          info.password = await encryptor.encrypt(info.password as string);
          Service.login(info)
            .then((res_) => {
              if (res_.data.msg !== "successful") {
                setToastOpen2(true);
                setTimeout(() => {
                  setToastOpen2(false);
                }, 3000);
              } else {
                Taro.setStorageSync("token", res_.data.data);
                navigate("/main/home");
              }
            })
            .catch(() => {
              setToastOpen3(true);
              setTimeout(() => {
                setToastOpen3(false);
              }, 3000);
            });
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
    );
  }

  //TODO:此处关闭提示会导致整个页面刷新，用户输入将被清空
  setTimeout(() => {
    setToastOpen1(false);
  }, 3000);

  return (
    <>
      <div className="login-page">
        <Toast open={toastOpen1}>
          该程序只为一人编写，若您无意进入敬请离开
        </Toast>
        <h1 style={{ color: "rgb(240, 120, 186)", marginBottom: "5vh" }}>
          my晴宝
        </h1>
        <LoginForm />
      </div>
    </>
  );
}
