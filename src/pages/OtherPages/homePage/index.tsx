/* eslint-disable jsx-quotes */
import { Like } from "@taroify/icons";
import { Divider, Swiper } from "@taroify/core";
import { BASEURL } from "@/globe/inter";
import { Service, appendParams2Path } from "@/globe/service";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import "./index.scss";

export function Home() {
  // let themePicArr;
  const location = useLocation()
  const [themePicArr, setThemePicArr] = useState<string[][]>();
  useEffect(() => {
    Service.getPicThemeArrNum({ imageIndex: "theme" }).then((res) => {
      const ArrNum = res.data.data;
      // themePicArr = Array.from({ length: ArrNum.length });
      setThemePicArr(Array.from({ length: ArrNum.length }));
      //例如ArrNum = [2, 2, 1, 3] 则
      const tempArr = ArrNum.map((item, index) => {
        //themePicArr[0]赋值为 长度为2的数组，每个元素包含着对应图片的url
        return Array.from({ length: item }).map((_item, i) => {
          //i为数组下标
          return (
            BASEURL +
            appendParams2Path("/getPicTheme", {
              //index+1为图片主题-i+1为该主题下的图片
              id: `${index + 1}-${i}`,
              pass: "songzq12",
            })
          );
        });
      });
      setThemePicArr(tempArr);
    });
    console.log(themePicArr);
  },[location]);

  function ImageSwiper() {
    // const imgUrl = BASEURL + "/images/";
  
    const swiperPicArr = Array.from({ length: 3 }).map((_item, index) => {
      return (
        BASEURL +
        appendParams2Path("/getPicSwiper", {
          id: (index + 1).toString(),
          pass: "songzq12",
        })
      );
    });
    // const swiperPicArr = [
    //   BASEURL +
    //     appendParams2Path("/getPicSwiper", { id: "1", pass: "songzq12" }),
    //   BASEURL +
    //     appendParams2Path("/getPicSwiper", { id: "2", pass: "songzq12" }),
    //   BASEURL +
    //     appendParams2Path("/getPicSwiper", { id: "3", pass: "songzq12" }),
    // ];

    return (
      <Swiper className="image-swiper" lazyRender autoplay={4000}>
        <Swiper.Indicator />
        <Swiper.Item>
          {/* TODO:图片首次加载缓慢以及再次get请求url出错 */}
          <img rel="preload" className="image" src={swiperPicArr[0]} />
        </Swiper.Item>
        <Swiper.Item>
          <img rel="preload" className="image" src={swiperPicArr[1]} />
        </Swiper.Item>
        <Swiper.Item>
          <img rel="preload" className="image" src={swiperPicArr[2]} />
        </Swiper.Item>
      </Swiper>
    );
  }
  function ImageTheme() {
    // const themePicArr = [
    //   BASEURL +
    //     appendParams2Path("/getPicTheme", { id: "1-0", pass: "songzq12" }),
    //   BASEURL +
    //     appendParams2Path("/getPicTheme", { id: "2-0", pass: "songzq12" }),
    //   BASEURL +
    //     appendParams2Path("/getPicTheme", { id: "3-0", pass: "songzq12" }),
    //   BASEURL +
    //     appendParams2Path("/getPicTheme", { id: "4-0", pass: "songzq12" }),
    // ];
    console.log(themePicArr)
    function ImageLine() {}

    return (
      <>
        {/* <div className="dif-theme">
          <p>我们</p>
          <div className="img-line">
            <div
              className="img a"
              style={{ backgroundImage: `url(${themePicArr[0][0]})` }}
            ></div>
            <div
              className="img a"
              style={{ backgroundImage: `url(${themePicArr[0][0]})` }}
            ></div>
            <div
              className="img a"
              style={{ backgroundImage: `url(${themePicArr[0][0]})` }}
            ></div>
            <div
              className="img a"
              style={{ backgroundImage: `url(${themePicArr[0][0]})` }}
            ></div>
            <div
              className="img a"
              style={{ backgroundImage: `url(${themePicArr[0][0]})` }}
            ></div>
            <div
              className="img a"
              style={{ backgroundImage: `url(${themePicArr[0][0]})` }}
            ></div>
          </div>
          <Divider className="divider2" style={{ color: "black" }} dashed />
        </div>

        <div className="dif-theme">
          <p>美食</p>
          <div className="img-line">
            <div
              className="img b"
              style={{ backgroundImage: `url(${themePicArr[1][0]})` }}
            ></div>
          </div>
          <Divider className="divider2" style={{ color: "black" }} dashed />
        </div>
        <div className="dif-theme">
          <p>晴宝</p>
          <div className="img-line">
            <div
              className="img c"
              style={{ backgroundImage: `url(${themePicArr[2][0]})` }}
            ></div>
          </div>
          <Divider className="divider2" style={{ color: "black" }} dashed />
        </div>
        <div className="dif-theme">
          <p>宋宋</p>
          <div className="img-line">
            <div
              className="img d"
              style={{ backgroundImage: `url(${themePicArr[3][0]})` }}
            ></div>
          </div>
          <Divider className="divider2" style={{ color: "black" }} dashed />
        </div> */}
      </>
    );
  }

  return (
    <div className="home-page">
      <div className="title">
        <div>
          宋宋
          <Like color="red" />
          晴宝
        </div>
      </div>
      <div className="pic-swiper">
        <ImageSwiper />
      </div>
      <Divider className="divider1" style={{ color: "black" }} />
      <div className="pic-theme">
        <ImageTheme />
      </div>
    </div>
  );
}
