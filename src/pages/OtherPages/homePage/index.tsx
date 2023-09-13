/* eslint-disable jsx-quotes */
import { Like } from "@taroify/icons";
import { Divider, Swiper, Image } from "@taroify/core";
import { BASEURL } from "@/globe/inter";
import { Service, appendParams2Path } from "@/globe/service";

import "./index.scss";

export function Home() {
  function ImageSwiper() {
    // const imgUrl = BASEURL + "/images/";
    const swiperPicArr = [
      BASEURL +
        appendParams2Path("/getPicSwiper", { id: "1", pass: "songzq12" }),
      BASEURL +
        appendParams2Path("/getPicSwiper", { id: "2", pass: "songzq12" }),
      BASEURL +
        appendParams2Path("/getPicSwiper", { id: "3", pass: "songzq12" }),
    ];

    return (
      <Swiper className="image-swiper" autoplay={4000}>
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
    const ThemePicArr = [
      BASEURL +
        appendParams2Path("/getPicTheme", { id: "1", pass: "songzq12" }),
      BASEURL +
        appendParams2Path("/getPicTheme", { id: "2", pass: "songzq12" }),
      BASEURL +
        appendParams2Path("/getPicTheme", { id: "3", pass: "songzq12" }),
      BASEURL +
        appendParams2Path("/getPicTheme", { id: "4", pass: "songzq12" }),
    ];

    function ImageLine() {}

    return (
      <>
        <div className="dif-theme">
          <p>我们</p>
          <div className="img-line">
            <div
              className="img a"
              style={{ backgroundImage: `url(${ThemePicArr[0]})` }}
            ></div>
            <div
              className="img a"
              style={{ backgroundImage: `url(${ThemePicArr[0]})` }}
            ></div>
            <div
              className="img a"
              style={{ backgroundImage: `url(${ThemePicArr[0]})` }}
            ></div>
            <div
              className="img a"
              style={{ backgroundImage: `url(${ThemePicArr[0]})` }}
            ></div>
            <div
              className="img a"
              style={{ backgroundImage: `url(${ThemePicArr[0]})` }}
            ></div>
          </div>
          <Divider className="divider2" style={{ color: "black" }} dashed />
        </div>

        <div className="dif-theme">
          <p>美食</p>
          <div className="img-line">
            <div className="img b"></div>
          </div>
          <Divider className="divider2" style={{ color: "black" }} dashed />
        </div>
        <div className="dif-theme">
          <p>晴宝</p>
          <div className="img-line">
            <div className="img c"></div>
          </div>
          <Divider className="divider2" style={{ color: "black" }} dashed />
        </div>
        <div className="dif-theme">
          <p>宋宋</p>
          <div className="img-line">
            <div className="img d"></div>
          </div>
          <Divider className="divider2" style={{ color: "black" }} dashed />
        </div>
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
