/* eslint-disable jsx-quotes */
import {
  Button,
  Cell,
  Dialog,
  Divider,
  List,
  SwipeCell,
  Tabs,
} from "@taroify/core";
import { useEffect, useState } from "react";
import { Add } from "@taroify/icons";
import { ITodoItem } from "@/globe/inter";
import { Service } from "@/globe/service";
import Taro from "@tarojs/taro";

import "./index.scss";
import { AddTodo } from "./addTodo";

interface ITodoList {
  list: ITodoItem[];
  setList: React.Dispatch<React.SetStateAction<ITodoItem[]>>;
}

export function Todo() {
  const initList: ITodoItem[] = [
    {
      title: "暂无待办",
      detail: "详细内容",
      timeStart: "*",
      timeEnd: "*",
      isDone: 1,
      whos: "qing",
      createTime: Date().toString(),
    },
  ];
  const [tabValue, setTabValue] = useState<"qing" | "song" | "">("qing");
  const [addTodoOpen, setAddTodoOpen] = useState<boolean>(false);
  const [display, setDisplay] = useState<boolean>(false);
  const [listQing, setListQing] = useState<ITodoItem[]>(initList);
  const [listQingDone, setListQingDone] = useState<ITodoItem[]>(initList);
  const [listSong, setListSong] = useState<ITodoItem[]>(initList);
  const [listSongDone, setListSongDone] = useState<ITodoItem[]>(initList);

  function checkNotDone(item: ITodoItem) {
    return item.isDone === 0;
  }
  function checkDone(item: ITodoItem) {
    return item.isDone === 1;
  }
  const sortByDDL = (item1: ITodoItem, item2: ITodoItem) => {
    const DDL1 = item1.timeEnd.split("/");
    const DDL2 = item2.timeEnd.split("/");
    if (Number(DDL1[0]) <= Number(DDL2[0])) {
      if (Number(DDL1[0]) === Number(DDL2[0])) {
        if (Number(DDL1[1]) <= Number(DDL2[1])) {
          if (Number(DDL1[1]) === Number(DDL2[1])) {
            if (Number(DDL1[2]) <= Number(DDL2[2])) {
              return 0;
            } else {
              //DDL1日 > DDL2日
              return 1;
            }
          } else {
            //DDL1月份 < DDL2月份
            return -1;
          }
        } else {
          //DDL1月份 > DDL2月份
          return 1;
        }
      } else {
        //DDL1年份 < DDL2年份
        return -1;
      }
    } else {
      //DDL1年份 > DDL2年份
      return 1;
    }
  };

  useEffect(() => {
    Service.getTodoList({ tab: "qing" }).then((res) => {
      const list = res.data.data;
      let listNotDone = list.filter(checkNotDone).sort(sortByDDL);
      let listDone = list.filter(checkDone).sort(sortByDDL);
      setListQingDone(listDone);
      setListQing(listNotDone);
    });
    Service.getTodoList({ tab: "song" }).then((res) => {
      const list_ = res.data.data;
      let listNotDone = list_.filter(checkNotDone).sort(sortByDDL);
      let listDone = list_.filter(checkDone).sort(sortByDDL);
      setListSongDone(listDone);
      setListSong(listNotDone);
    });
  }, [display]);

  function TodoList(props: ITodoList) {
    interface IDialogDetail {
      whos: "qing" | "song" | "";
      index: number;
    }
    const [dialogDetail, setDialogDetail] = useState<IDialogDetail>({
      whos: "",
      index: -1,
    });
    const [detailOpen, setDetailOpen] = useState<boolean>(false);
    return (
      <>
        <Dialog open={detailOpen} onClose={setDetailOpen}>
          <Dialog.Content>
            <div className="detail-context">
              <h3>
                {props.list[dialogDetail.index] !== undefined
                  ? props.list[dialogDetail.index].title
                  : "出错啦！"}
              </h3>
              <p>
                详情：
                {props.list[dialogDetail.index] !== undefined
                  ? props.list[dialogDetail.index].detail
                  : "出错啦！"}
              </p>
              <div id="detail-time">
                <p>
                  {props.list[dialogDetail.index] !== undefined
                    ? props.list[dialogDetail.index].timeStart +
                      "-" +
                      props.list[dialogDetail.index].timeEnd
                    : "出错啦！"}
                </p>
              </div>
              <div id="detail-footer">
                <p>
                  添加人：
                  {props.list[dialogDetail.index] !== undefined
                    ? props.list[dialogDetail.index].whos === "qing"
                      ? 1
                      : props.list[dialogDetail.index].whos === "song"
                      ? 2
                      : "出错啦！"
                    : "出错啦！"}
                </p>
                <p>
                  状态：
                  {props.list[dialogDetail.index] !== undefined
                    ? props.list[dialogDetail.index].isDone === 1
                      ? "已完成"
                      : props.list[dialogDetail.index].isDone === -1
                      ? "已删除"
                      : "未完成"
                    : "出错啦！"}
                </p>
              </div>
            </div>
          </Dialog.Content>
        </Dialog>
        <List>
          {props.list.map((item, index) => (
            <SwipeCell key={item.title}>
              <Cell
                className="cell"
                id={item.isDone === 1 ? "done" : "todo"}
                key={item.title}
                onClick={() => {
                  setDialogDetail({
                    whos: props.list[index].whos,
                    index: index,
                  });
                  setDetailOpen(true);
                }}
              >
                <div className="cell-context">
                  <h2>{item.title}</h2>
                  <div>ddl:{item.timeEnd}</div>
                </div>
              </Cell>

              <SwipeCell.Actions side="right">
                <Button
                  variant="contained"
                  shape="square"
                  color="info"
                  onClick={() => {
                    let tempArr = props.list;
                    // tempArr[index].isDone = 1;
                    //更新待办必须使用createTime唯一标识！
                    console.log(tempArr, tempArr[index].createTime);
                    Service.updateTodoItem({
                      title: tempArr[index].title,
                      timeStart: tempArr[index].timeStart,
                      whos: tempArr[index].whos,
                      createTime: tempArr[index].createTime,
                    }).then((res) => {
                      if (res.data.data === true) {
                        setDisplay(!display);
                      }
                    });
                  }}
                  disabled={item.isDone === 1 ? true : false}
                >
                  已完成
                </Button>
                <Button
                  variant="contained"
                  shape="square"
                  color="danger"
                  onClick={() => {
                    let tempArr = props.list;
                    // tempArr[index].isDone = 1;
                    //更新待办必须使用createTime唯一标识！
                    console.log(tempArr, tempArr[index].createTime);
                    Service.deleteTodoItem({
                      title: tempArr[index].title,
                      timeStart: tempArr[index].timeStart,
                      whos: tempArr[index].whos,
                      createTime: tempArr[index].createTime,
                    }).then((res) => {
                      if (res.data.data === true) {
                        setDisplay(!display);
                      }
                    });
                  }}
                >
                  删除
                </Button>
              </SwipeCell.Actions>
            </SwipeCell>
          ))}
        </List>
      </>
    );
  }

  function BasicTabs() {
    return (
      <Tabs defaultValue="qing" value={tabValue} onChange={setTabValue}>
        <Tabs.TabPane value="qing" title="标签 1">
          <Divider>未完成</Divider>
          <TodoList list={listQing} setList={setListQing} />
          <Divider>已完成</Divider>
          <TodoList list={listQingDone} setList={setListQingDone} />
        </Tabs.TabPane>
        <Tabs.TabPane value="song" title="标签 2">
          <Divider>未完成</Divider>
          <TodoList list={listSong} setList={setListSong} />
          <Divider>已完成</Divider>
          <TodoList list={listSongDone} setList={setListSongDone} />
        </Tabs.TabPane>
      </Tabs>
    );
  }

  return (
    <div className="todo-page">
      <BasicTabs />
      <AddTodo
        tabValue={tabValue}
        hook_addDialog={{ value: addTodoOpen, setValue: setAddTodoOpen }}
        hook_display={{ value: display, setValue: setDisplay }}
      />

      <Button
        onClick={() => {
          Taro.requestSubscribeMessage({
            tmplIds: ["E1LpkkP8-8XoNI9dRXRrS-hbnhpNmYntkJbX_dhdKdM"],
            success: function (res) {
              console.log(res);
            },
            fail: function (err) {
              console.log(err);
            },
          });
        }}
        shape="round"
      >订阅</Button>
      <Button
        onClick={() => setAddTodoOpen(true)}
        className="add-button"
        shape="round"
        icon={<Add size={43} />}
      ></Button>
    </div>
  );
}
