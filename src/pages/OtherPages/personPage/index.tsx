/* eslint-disable jsx-quotes */
import { Avatar, Collapse, Divider, Steps } from "@taroify/core";
import { useState } from "react";
import { View } from "@tarojs/components";
import "./index.scss";

export function Person() {
  function BasicCollapse() {
    const [value, setValue] = useState([0]);
    //TODO:后期功能——动态改变大事记内容
    return (
      <Collapse value={value} onChange={setValue}>
        <Collapse.Item title="大事记">
          <Steps direction="vertical">
            <Steps.Step>
              <View>第一次微信私聊</View>
              <View>2023-8-4</View>
            </Steps.Step>
            <Steps.Step>
              <View>第一次说晚安</View>
              <View>2023-08-11凌晨</View>
            </Steps.Step>
            <Steps.Step>
              <View>某人表白了</View>
              <View>2023-08-11晚上</View>
            </Steps.Step>
            <Steps.Step>
              <View>第一次一起出去旅行</View>
              <View>2023-08-27</View>
            </Steps.Step>
          </Steps>
        </Collapse.Item>
        <Collapse.Item title="联系男友">
          phone：18042829006
          <br />
          QQ：1612517397
        </Collapse.Item>
        <Collapse.Item title="备注">别急，后续功能待开发</Collapse.Item>
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
