/* eslint-disable jsx-quotes */
import {
  Button,
  Cell,
  DatetimePicker,
  Dialog,
  Divider,
  List,
  SwipeCell,
  Tabs,
  Toast,
} from "@taroify/core";
import { useEffect, useState } from "react";
import { Add } from "@taroify/icons";
import { ISendSubscribeToBack, ITodoItem, TEMPLIdS } from "@/globe/inter";
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
      isDone: 2,
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
      if (list != null) {
        let listNotDone = list.filter(checkNotDone).sort(sortByDDL);
        let listDone = list.filter(checkDone).sort(sortByDDL);
        setListQingDone(listDone);
        setListQing(listNotDone);
      }
    });
    Service.getTodoList({ tab: "song" }).then((res) => {
      const list_ = res.data.data;
      if (list_ != null) {
        let listNotDone = list_.filter(checkNotDone).sort(sortByDDL);
        let listDone = list_.filter(checkDone).sort(sortByDDL);
        setListSongDone(listDone);
        setListSong(listNotDone);
      }
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
    const [dialogSubscribe, setDialogSubscribe] = useState<boolean>(false);
    const [subscribeIndex, setSubscribeIndex] = useState<number>(-1);

    function DateTimePicker() {
      const [minDate] = useState(new Date());
      const [maxDate] = useState(new Date(2025, 10, 1, 20, 59, 59));
      const [defaultValue] = useState(new Date());
      const [selectedTime, setSelectedTime] = useState<Date>(new Date());
      const [dialogRemind, setDialogRemind] = useState<boolean>(false);

      function haveSubscribe(remindT: number) {
        let tempArr = props.list;
        let prop: ISendSubscribeToBack = {
          remindTime: remindT.toString(),
          todoInfo: {
            title: tempArr[subscribeIndex].title,
            whos: tempArr[subscribeIndex].whos,
            createTime: tempArr[subscribeIndex].createTime,
          },
        };
        subscribeMessage(prop);
      }
      function subscribeMessage(prop: ISendSubscribeToBack) {
        Taro.requestSubscribeMessage({
          tmplIds: [TEMPLIdS],
          success: function (res) {
            console.log(res);
            Service.sendSubscribeToBack({
              todoInfo: {
                title: prop.todoInfo.title,
                whos: prop.todoInfo.whos,
                createTime: prop.todoInfo.createTime,
              },
              remindTime: prop.remindTime,
            });
            setDialogSubscribe(false);
          },
          fail: function (err) {
            console.log(err);
          },
        });
      }

      return (
        <DatetimePicker
          type="date-minute"
          min={minDate}
          max={maxDate}
          defaultValue={defaultValue}
          formatter={(type, val) => {
            switch (type) {
              case "year":
                return val + "年";
              case "month":
                return val + "月";
              case "day":
                return val + "日";
              case "hour":
                return val + "时";
              default:
                return val + "分";
            }
          }}
          onChange={(date) => setSelectedTime(date)}
        >
          <DatetimePicker.Toolbar>
          </DatetimePicker.Toolbar>

          <Toast open={dialogRemind} onClose={setDialogRemind} type="fail">
            时间间隔过短，请重试
          </Toast>
          <Button
            color="info"
            shape="round"
            onClick={() => {
              const selectedTimeStamp = selectedTime.getTime();
              const nowStamp = new Date().getTime();
              //与现在时间小于五分钟则不予添加
              if (selectedTimeStamp - nowStamp > 1000 * 300) {
                haveSubscribe(selectedTime.getTime() - 1000 * 60); //自作主张将订阅时间提前1分钟
              } else {
                setDialogRemind(true);
              }
            }}
          >
            确认添加待办提醒
          </Button>
        </DatetimePicker>
      );
    }
    function haveDone(index: number) {
      let tempArr = props.list;
      Service.updateTodoItem({
        title: tempArr[index].title,
        whos: tempArr[index].whos,
        createTime: tempArr[index].createTime,
      }).then((res) => {
        if (res.data.data === true) {
          setDisplay(!display);
        }
      });
    }
    function haveDelete(index: number) {
      let tempArr = props.list;
      console.log(tempArr, tempArr[index].createTime);
      Service.deleteTodoItem({
        title: tempArr[index].title,
        whos: tempArr[index].whos,
        createTime: tempArr[index].createTime,
      }).then((res) => {
        if (res.data.data === true) {
          setDisplay(!display);
        }
      });
    }
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
                      ? "晴宝"
                      : props.list[dialogDetail.index].whos === "song"
                      ? "宋宋"
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
            <>
              <Dialog open={dialogSubscribe} onClose={setDialogSubscribe}>
                <Dialog.Content>
                  <DateTimePicker />
                </Dialog.Content>
              </Dialog>
              <SwipeCell key={item.title}>
                <Cell
                  className="cell"
                  id={item.isDone === 1 || item.isDone === 2 ? "done" : "todo"}
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
                    onClick={() => haveDone(index)}
                    disabled={item.isDone === 1 ? true : false}
                  >
                    已完成
                  </Button>
                  <Button
                    variant="contained"
                    shape="square"
                    color="success"
                    onClick={() => {
                      setSubscribeIndex(index);
                      setDialogSubscribe(true);
                    }}
                    disabled={item.isDone === 1 ? true : false}
                  >
                    提醒我
                  </Button>
                  <Button
                    variant="contained"
                    shape="square"
                    color="danger"
                    onClick={() => haveDelete(index)}
                    //TODO:这里好像是有个展示bug的，此处是希望无数据时展示初始化的，初始化item当然不能删除
                    disabled={item.isDone === 2 ? true : false}
                  >
                    删除
                  </Button>
                </SwipeCell.Actions>
              </SwipeCell>
            </>
          ))}
        </List>
      </>
    );
  }

  function BasicTabs() {
    return (
      <Tabs defaultValue="qing" value={tabValue} onChange={setTabValue}>
        <Tabs.TabPane value="qing" title="晴宝的">
          <Divider>未完成</Divider>
          <TodoList list={listQing} setList={setListQing} />
          <Divider>已完成</Divider>
          <TodoList list={listQingDone} setList={setListQingDone} />
        </Tabs.TabPane>
        <Tabs.TabPane value="song" title="宋宋的">
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
        onClick={() => setAddTodoOpen(true)}
        className="add-button"
        shape="round"
        icon={<Add size={43} />}
      ></Button>
    </div>
  );
}
