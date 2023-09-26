/* eslint-disable jsx-quotes */
import { Badge, Tabbar } from "@taroify/core";
import { HomeOutlined, OrdersOutlined, UserOutlined, Like } from "@taroify/icons";
import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";

import "./index.scss";

export function MainPage() {
  const [colorArr, setColorArr] = useState<Array<string>>([
    "green",
    "black",
    "black",
  ]);
  const navigate = useNavigate();

  function BadgeTabbar() {
    function selectTabs(value: string) {
      navigate(value);
      let temp = ["black", "black", "black", "black"];
      switch (value) {
        case "home":
          temp[0] = "green";
          break;
        case "todo":
          temp[1] = "green";
          break;
        case "message":
          temp[2] = "green";
          break;
        case "my":
          temp[3] = "green";
          break;
      }
      setColorArr(temp);
    }

    return (
      <Tabbar className="custom-color" onChange={(props) => selectTabs(props)}>
        <Tabbar.TabItem
          style={{ color: colorArr[0] }}
          value="home"
          icon={<HomeOutlined />}
        >
          首页
        </Tabbar.TabItem>
        <Tabbar.TabItem
          style={{ color: colorArr[1] }}
          value="todo"
          badge
          icon={<OrdersOutlined />}
        >
          代办
        </Tabbar.TabItem>
        <Tabbar.TabItem
          style={{ color: colorArr[2] }}
          value="my"
          badge={<Badge content={100} max={99} />}
          icon={<UserOutlined />}
        >
          我的
        </Tabbar.TabItem>
      </Tabbar>
    );
  }

  return (
    <>
      {/* <div className="title">
        <div>
          宋宋
          <Like color="red" />
          晴宝
        </div>
      </div> */}
      <div className="outlet">
        <Outlet />
      </div>
      <BadgeTabbar />
    </>
  );
}
