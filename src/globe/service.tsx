import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import Taro from "@tarojs/taro";

import {
  BASEURL,
  IDeletePicTheme,
  IGetPicSwiper,
  IGetPicThemeArr,
  IGetTodoList,
  ILogin,
  IPostPicTheme,
  ISendCodeToBack,
  ISendSubscribeToBack,
  ITodoItem,
  IUpdateItem,
  IUploadPic,
  createFormData,
} from "./inter";

// 返回响应中data的类型
export interface IGlobalResponse<T> {
  data: T;
  msg: string;
  status: number;
}
export function appendParams2Path(
  path: string,
  paramsRaw: string | URLSearchParams | string[][] | Record<string, string>
) {
  const params = new URLSearchParams(paramsRaw);
  return `${path}?${params.toString()}`;
}
async function GlobalAxios<T = any, D = any>(
  method: "post" | "get" | "delete",
  url: string,
  data?: D
): Promise<AxiosResponse<IGlobalResponse<T>, any>> {
  let config: AxiosRequestConfig<D> = {};
  config.baseURL = BASEURL;
  // config.headers = {
  //   'Accept': "application/json",
  //   "Content-Type": `multipart/form-data; boundary=${boundary}`,
  // };
  const parsedURL = new URL(BASEURL + url);
  //   const parsedURL = parse(url);

  const params = new URLSearchParams(parsedURL.searchParams || "");
  //   url = parsedURL.pathname || "";
  config.params = params;

  let response;
  if (method === "post") {
    //axios将data自动序列化为json格式
    response = await axios[method]<IGlobalResponse<T>>(url, data, config);
  } else {
    params.set("time", new Date().getTime().toString());
    response = await axios[method]<IGlobalResponse<T>>(url, config);
  }

  if (response.statusText === "OK") {
    return response;
  } else {
    //TODO:全局报错，小程序不存在alert，待修改
    console.log(response.data.msg);
  }
  return response;
}

export const Service = {
  //获取加密公钥，返回响应不按IGlobalResponse格式
  getPublicKey(){
    return GlobalAxios<string>("get","/public-key")
  },
  postMsgTest(props: ILogin){
    return GlobalAxios("post","/decrypt",props)
  },
  login(props: ILogin) {
    return GlobalAxios<string>("post", "/login", props);
  },
  //在前端通过Taro.login获得code发送到后端获取敏感信息
  sendSubscribeToBack(props: ISendSubscribeToBack) {
    Taro.login({
      success: function (res) {
        console.log(res, "res");
        let tempProp: ISendCodeToBack = {
          remindTime: props.remindTime,
          code: res.code,
          todoInfo: {
            title: props.todoInfo.title,
            whos: props.todoInfo.whos,
            createTime: props.todoInfo.createTime
          }
        };
        GlobalAxios("post", "/sendCode", tempProp);
      },
    });
  },
  getPicSwiper(props: IGetPicSwiper) {
    return GlobalAxios<undefined>(
      "get",
      appendParams2Path("/getPicSwiper", { ...props })
    );
  },
  //获取各主题图片编号，data以number二维数组格式返回，如[[0,1]，[0,2]，[0]，[0,1,2]]
  getPicThemeArr(props: IGetPicThemeArr) {
    return GlobalAxios<Array<Array<number>>>(
      "get",
      appendParams2Path("/getPicThemeArr", { ...props })
    );
  },
  getPicTheme(props: IGetPicSwiper) {
    return GlobalAxios<undefined>(
      "get",
      appendParams2Path("/getPicTheme", { ...props })
    );
  },
  getTodoList(props: IGetTodoList) {
    return GlobalAxios<ITodoItem[]>(
      "get",
      appendParams2Path("/getTodolist", { ...props })
    );
  },
  addTodoItem(props: ITodoItem) {
    return GlobalAxios<number>("post", "/postTodoItem", props);
  },
  //完成一项待办
  updateTodoItem(props: IUpdateItem) {
    return GlobalAxios<boolean>(
      "get",
      appendParams2Path("/updateTodoItem", { ...props })
    );
  },
  //删除一项待办
  deleteTodoItem(props: IUpdateItem) {
    return GlobalAxios<boolean>(
      "delete",
      appendParams2Path("/deleteTodoItem", { ...props })
    );
  },
  //上传图片，返回的number为成功上传图片数量
  //weapp不支持formdata上传文件，调用API发送请求
  postPicTheme(props: IPostPicTheme) {
    return Taro.uploadFile({
      url: BASEURL + "/postPicTheme",
      filePath: props.file,
      name: "file",
      formData: {
        imageIndex: props.imageIndex,
      },
    });
  },
  //picName为图片名，对应数据库唯一字段
  deletePicTheme(props: IDeletePicTheme) {
    return GlobalAxios<boolean>(
      "delete",
      appendParams2Path("/deletePicTheme", { ...props })
    );
  },
};
