import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import Taro from "@tarojs/taro";

import {
  BASEURL,
  IDeletePicTheme,
  IGetPicSwiper,
  IGetPicThemeArr,
  IGetTodoList,
  IGetToken,
  ILogin,
  IPostPicTheme,
  ISendCodeToBack,
  ISendSubscribeToBack,
  ITodoItem,
  IUpdateItem,
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

const globalAxios = axios.create({
  headers: {
    token: Taro.getStorageSync("token") || "",
  },
});
//响应拦截
globalAxios.interceptors.response.use(
  (res) => {
    if (res.data.msg === "token failed") {
      console.log("interceptors:", res);
      Taro.removeStorageSync("token");
    }
    return res;
  },
  (reason) => {
    const { data } = reason.response;
    if (data.message) {
      //用自写comfirmPannel代替alert
      return Promise.reject(data.message);
    } else if (data.errors) {
      // 显示第一条error
      console.log(Object.values(data.errors).flat().shift());
      return Promise.reject(Object.values(data.errors).flat().shift());
    }
  }
);
async function GlobalAxios<T = any, G = IGlobalResponse<T>, D = any>(
  method: "post" | "get" | "delete",
  url: string,
  data?: D
): Promise<AxiosResponse<G, any>> {
  let config: AxiosRequestConfig<D> = {};
  if (url === "/login" || url === "/public-key") {
    config.baseURL = BASEURL;
  } else {
    config.baseURL = BASEURL + "/main";
  }
  const token = Taro.getStorageSync("token");
  if (token !== "") {
    config.headers = { token: token };
  }
  if (
    url.startsWith("/getPicTheme?id=") ||
    url.startsWith("/getPicSwiper?id=")
  ) {
    config.responseType = "arraybuffer";
  }

  const parsedURL = new URL(BASEURL + url);
  const params = new URLSearchParams(parsedURL.searchParams || "");
  config.params = params;

  let response;
  if (method === "post") {
    //axios将data自动序列化为json格式
    response = await globalAxios[method]<G>(url, data, config);
  } else {
    params.set("time", new Date().getTime().toString());
    response = await globalAxios[method]<G>(url, config);
  }

  // if (response.statusText === "OK") {
  //   return response;
  // } else {
  //   //TODO:全局报错，小程序不存在alert，待修改
  //   console.log(response.data.msg);
  // }
  return response;
}

export const Service = {
  //获取加密公钥，返回响应不按IGlobalResponse格式
  getPublicKey() {
    return GlobalAxios<string>("get", "/public-key");
  },
  getToken(props: IGetToken) {
    return GlobalAxios<string>(
      "get",
      appendParams2Path("/get-token", { ...props })
    );
  },

  //返回token
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
            createTime: props.todoInfo.createTime,
          },
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
    return GlobalAxios<undefined, string>(
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
      header: { token: Taro.getStorageSync("token") },
      url: BASEURL + "/main/postPicTheme",
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
