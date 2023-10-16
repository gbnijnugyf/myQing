import { JSEncrypt } from "jsencrypt";

export interface ILogin {
  username: string | false;
  password: string | false;
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
  isDone: 0 | -1 | 1 | 2;
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
export const TEMPLIdS = "E1LpkkP8-8XoNI9dRXRrS7UzLJ3z80zrWlYC8rYUJbY";
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

export function importPublicKey(publicKey) {
  // 创建 JSEncrypt 实例
  const encryptor = new JSEncrypt();
  // 设置公钥
  // const tkey = `-----BEGIN RSA Public Key-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0y7Ykc7zt5amMSbwTplP\nFHekdvxiVC9ipIydTyNUn3r/X6Dl7yidg5z+ygJvqeS+flu+Jgbt1Wctri4lP3L+\n7Uts6aAsUBP5F66qQ8/cSyi5wxqx3De0HiYMi6ekxdAN6+zmY/Bg/fbxUPHV1HcQ\nXGC+2jABqhVqFmpTe2ZeNyA4X9IETZm0EBWYFtI8AM3ONFHfGkriPIL1xvehd1/W\nJorK8N416Ml8Y3+lbIOZYzj7BgSBL8lI+eYPXAItaSWH8c2AOMDYovCAfZlvD3xo\nZZ0SI5qWPGTVV+nSUOGMjEsBBzpVjwnA1UOwoLG78APUfFE6h0DFjoJwz5wyf0ZK\nuQIDAQAB\n-----END RSA Public Key-----\n`;
  encryptor.setPublicKey(publicKey);
  return encryptor;
}
