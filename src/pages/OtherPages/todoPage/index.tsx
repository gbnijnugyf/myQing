/* eslint-disable jsx-quotes */
import {
  Button,
  Calendar,
  Cell,
  Dialog,
  Field,
  Input,
  List,
  Loading,
  Popup,
  SwipeCell,
  Tabs,
  Textarea,
} from "@taroify/core";
import { usePageScroll } from "@tarojs/taro";
import { useState } from "react";
import { Add, ArrowRight } from "@taroify/icons";
import { ITodoItem } from "@/globe/inter";

import "./index.scss";

interface ITodoList {
  list: ITodoItem[];
  setList: React.Dispatch<React.SetStateAction<ITodoItem[]>>;
}
function formatFullDate(dateRange?: Date[]) {
  if (dateRange?.length) {
    const [start, end] = dateRange;
    return `${start.toLocaleDateString()}-${end.toLocaleDateString()}`;
  }
}

function SingleCalendar() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<Date>();
  const [formatValue, setFormatValue] = useState<string>();

  return (
    <>
      <Cell
        title="选择时间区间"
        clickable
        rightIcon={<ArrowRight />}
        onClick={() => setOpen(true)}
      >
        {formatValue}
      </Cell>
      <Popup
        style={{}}
        open={open}
        rounded
        placement="bottom"
        onClose={setOpen}
      >
        <Calendar
          type="range"
          value={value}
          onChange={setValue}
          onConfirm={(newValue) => {
            setFormatValue(formatFullDate(newValue));
            setOpen(false);
          }}
        />
      </Popup>
    </>
  );
}

export function Todo() {
  const [tabValue, setTabValue] = useState<string>("qing");
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [listQing, setListQing] = useState<ITodoItem[]>([
    {
      title: "标题",
      detail: "详细内容",
      timeStart: "2023/10/5",
      timeEnd: "2023/10/7",
      isDel: false,
    },
    {
      title: "标题",
      detail: "详细内容",
      timeStart: "2023/10/5",
      timeEnd: "2023/10/7",
      isDel: false,
    },
    {
      title: "标题",
      detail: "详细内容",
      timeStart: "2023/10/5",
      timeEnd: "2023/10/7",
      isDel: false,
    },
    {
      title: "标题",
      detail: "详细内容",
      timeStart: "2023/10/5",
      timeEnd: "2023/10/7",
      isDel: false,
    },
    {
      title: "标题",
      detail: "详细内容",
      timeStart: "2023/10/5",
      timeEnd: "2023/10/7",
      isDel: false,
    },
    {
      title: "标题",
      detail: "详细内容",
      timeStart: "2023/10/5",
      timeEnd: "2023/10/7",
      isDel: false,
    },
    {
      title: "标题",
      detail: "详细内容",
      timeStart: "2023/10/5",
      timeEnd: "2023/10/7",
      isDel: false,
    },
    {
      title: "标题",
      detail: "详细内容",
      timeStart: "2023/10/5",
      timeEnd: "2023/10/7",
      isDel: false,
    },
    {
      title: "标题",
      detail: "详细内容",
      timeStart: "2023/10/5",
      timeEnd: "2023/10/7",
      isDel: false,
    },
  ]);
  const [listSong, setListSong] = useState<ITodoItem[]>([
    {
      title: "标题1",
      detail: "详细内容",
      timeStart: "2023/10/5",
      timeEnd: "2023/10/7",
      isDel: false,
    },
  ]);

  function AddTodo() {
    return (
      <>
        <Dialog className="" open={dialogOpen} onClose={setDialogOpen}>
          <Dialog.Content>
            <h3>添加待办</h3>
            <Field label="标题">
              <Input
                placeholder="请输入文本"
                value={" "}
                onChange={(e) => console.log(e.detail.value)}
              />
            </Field>
            <Field align="start" label="详情">
              <Textarea limit={100} placeholder="请输入详情" />
            </Field>
            <SingleCalendar />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onClick={() => setDialogOpen(false)}>确认添加</Button>
          </Dialog.Actions>
        </Dialog>
      </>
    );
  }

  function TodoList(props: ITodoList) {
    // const [hasMore, setHasMore] = useState(true);

    // const [loading, setLoading] = useState(false);
    const [scrollTop, setScrollTop] = useState(0);

    usePageScroll(({ scrollTop: aScrollTop }) => setScrollTop(aScrollTop));

    return (
      <>
        <List>
          {props.list.map((item) => (
            <SwipeCell key={item.title}>
              <Cell className="cell" key={item.title}>
                <div className="cell-context">
                  <h2>{item.title}</h2>
                  <div>ddl:{item.timeEnd}</div>
                </div>
              </Cell>

              <SwipeCell.Actions side="right">
                <Button variant="contained" shape="square" color="info">
                  已完成
                </Button>
                <Button variant="contained" shape="square" color="danger">
                  删除
                </Button>
              </SwipeCell.Actions>
            </SwipeCell>
          ))}
          <List.Placeholder>
            {/* {loading && <Loading>加载中...</Loading>}
          {!hasMore && "没有更多了"} */}
          </List.Placeholder>
        </List>
      </>
    );
  }

  function BasicTabs() {
    return (
      <Tabs defaultValue="qing" value={tabValue} onChange={setTabValue}>
        <Tabs.TabPane value="qing" title="标签 1">
          <TodoList list={listQing} setList={setListQing} />
        </Tabs.TabPane>
        <Tabs.TabPane value="song" title="标签 2">
          <TodoList list={listSong} setList={setListSong} />
        </Tabs.TabPane>
      </Tabs>
    );
  }

  return (
    <div className="todo-page">
      <BasicTabs />
      <AddTodo />
      <Button
        onClick={() => setDialogOpen(true)}
        className="add-button"
        shape="round"
        icon={<Add size={43} />}
      ></Button>
    </div>
  );
}
