/* eslint-disable jsx-quotes */
import {
  Button,
  Calendar,
  Cell,
  Dialog,
  Divider,
  Field,
  Input,
  List,
  Loading,
  Popup,
  SwipeCell,
  Tabs,
  Textarea,
  Toast,
} from "@taroify/core";
import { usePageScroll } from "@tarojs/taro";
import { useEffect, useState } from "react";
import { Add, ArrowRight } from "@taroify/icons";
import { IHookInterface, ITodoItem, tabType } from "@/globe/inter";
import { Service } from "@/globe/service";

import "./index.scss";

interface IAddTodo {
  tabValue: tabType;
  hook_addDialog: IHookInterface<boolean>;
  hook_display:IHookInterface<boolean>;
}

function formatFullDate(dateRange?: Date[]) {
  if (dateRange?.length) {
    const [start, end] = dateRange;
    return `${start.toLocaleDateString()}-${end.toLocaleDateString()}`;
  }
}

export function AddTodo(prop: IAddTodo) {
  const [title, setTitle] = useState<string>("");
  const [detail, setDetail] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<Date>();
  const [formatValue, setFormatValue] = useState<string>();
  const [time, setTime] = useState<string[]>(["", ""]);
  const [toast, setToast] = useState<boolean>(false);

  function clickAdd(props: ITodoItem) {
    console.log(props);
    if (props.title === "" || props.timeStart === "" || props.detail === "") {
      setToast(true);
      return;
    }
    Service.addTodoItem(props)
      .then((res) => {
        if (res.data.data !== 1) {
          setToast(true);
        } else {
          prop.hook_addDialog.setValue(false);
          prop.hook_display.setValue(!prop.hook_display.value)
        }
      })
      .catch(() => {
        setToast(true);
      });
  }
  return (
    <>
      <Dialog className="" open={prop.hook_addDialog.value} onClose={prop.hook_addDialog.setValue}>
        <Dialog.Content>
          <Toast open={toast} onClose={setToast} type="fail">
            添加失败，请完善信息或稍后重试
          </Toast>
          <h3>添加待办</h3>
          <Field label="标题">
            <Input
              placeholder="请输入文本"
              maxlength={8}
              onChange={(e) => setTitle(e.detail.value)}
            />
          </Field>
          <Field align="start" label="详情">
            <Textarea
              limit={100}
              placeholder="请输入详情"
              onChange={(e) => {
                setDetail(e.detail.value);
              }}
            />
          </Field>
          <Cell
            title="选择时间区间"
            clickable
            rightIcon={<ArrowRight />}
            onClick={() => setOpen(true)}
          >
            {formatValue}
          </Cell>
          <Popup open={open} rounded placement="bottom" onClose={setOpen}>
            <Popup.Close />
            <Calendar
              type="range"
              value={value}
              onChange={setValue}
              onConfirm={(newValue) => {
                if (newValue?.length) {
                  setTime([
                    [...newValue][0].toLocaleDateString(),
                    [...newValue][1].toLocaleDateString(),
                  ]);
                } else {
                  setTime(["", ""]);
                }
                setFormatValue(formatFullDate(newValue));
                setOpen(false);
              }}
            />
          </Popup>
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            onClick={() =>
              clickAdd({
                title: title,
                detail: detail,
                timeStart: time[0],
                timeEnd: time[1],
                isDone: 0,
                whos: prop.tabValue,
                createTime: "",
              })
            }
          >
            确认添加
          </Button>
        </Dialog.Actions>
      </Dialog>
    </>
  );
}
