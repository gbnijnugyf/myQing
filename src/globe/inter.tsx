export interface ILogin {
  username: string;
  password: string;
}

export interface IGetPicSwiper {
  id: string;
  pass: string;
}

export interface IGetPicThemeArr {
  imageIndex: string;
}

export interface IPostPicTheme {
  imageIndex: string;
  files: FormData[];
}

export interface IDeletePicTheme{
  picName: string
}

// export const BASEURL = "http://127.0.0.1:4523/m1/3245380-0-default";
// export const BASEURL = "http://localhost:8080";
export const BASEURL = "https://zqsongsong.top:8000";
