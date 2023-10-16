export interface ILogin {
  username: string;
  password: string;
}

export interface IGetPicSwiper {
  id: string;
  pass: string;
}

export interface IHookInterface<T> {
  value: T;
  setValue: React.Dispatch<React.SetStateAction<T>>;
}

export interface IGetPicThemeArr {
  imageIndex: string;
}

export interface IDeletePicTheme {
  picName: string;
}
export interface IGetTodoList {
  tab: string;
}
export interface IUploadPic {
  tempFiles: string | any[];
  tempFilePaths: string[];
}
export interface IPostPicTheme {
  imageIndex: string;
  file: string;
}
export type tabType = "qing" | "song" | "";
export interface ITodoItem {
  title: string;
  detail: string;
  timeStart: string;
  timeEnd: string;
  isDone: 0 | -1 | 1|2;
  whos: tabType;
  createTime: string; //不向后端上传，只从后端接收，且不展示
}
export interface IUpdateItem {
  title: string;
  whos: string;
  createTime: string;
}
export interface ISendSubscribeToBack {
  todoInfo: IUpdateItem;
  remindTime: string; //时间戳
}
export interface ISendCodeToBack {
  todoInfo: IUpdateItem;
  remindTime: string; //时间戳
  code: string;
}

// export const BASEURL = "http://127.0.0.1:4523/m1/3245380-0-default";
// export const BASEURL = "http://192.168.130.2:8080";
export const BASEURL = "http://localhost:8080";
// export const BASEURL = "https://zqsongsong.top:8000";
export const TEMPLIdS = "E1LpkkP8-8XoNI9dRXRrS7UzLJ3z80zrWlYC8rYUJbY"
// export const msgToken
// export const msgEncodingAESKey

// 解决weapp不接受FormData问题，手动拼接转换https://segmentfault.com/a/1190000023360087?utm_source=tag-newest
export function createFormData(params = {}, boundary = "") {
  let result = "";
  for (let i in params) {
    result += `\r\n--${boundary}`;
    result += `\r\nContent-Disposition: form-data; name="${i}"`;
    result += "\r\n";
    result += `\r\n${params[i]}`;
  }
  // 如果obj不为空，则最后一行加上boundary
  if (result) {
    result += `\r\n--${boundary}`;
  }
  return result;
}
