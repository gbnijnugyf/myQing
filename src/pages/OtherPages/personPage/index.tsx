/* eslint-disable jsx-quotes */
import { Avatar, Collapse, Divider } from "@taroify/core";
import { useState } from "react";
import "./index.scss";

export function Person() {
  function BasicCollapse() {
    const [value, setValue] = useState([0]);
    return (
      <Collapse value={value} onChange={setValue}>
        <Collapse.Item title="大事记">
          代码是写出来给人看的，附带能在机器上运行
        </Collapse.Item>
        <Collapse.Item title="标题2">
          代码是写出来给人看的，附带能在机器上运行
        </Collapse.Item>
      </Collapse>
    );
  }
  return (
    <>
      <div className="person-page">
        <div className="avatar">
          <Avatar style={{ background: "green" }} size="large">
            晴
          </Avatar>
        </div>
        <Divider
          className="divider"
          style={{ color: "black" }}
          hairline={false}
        />
        <div className="content">
          <BasicCollapse />
        </div>
      </div>
    </>
  );
}
