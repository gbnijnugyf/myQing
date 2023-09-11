/* eslint-disable jsx-quotes */
import { Like } from "@taroify/icons";
import { Swiper } from "@taroify/core";
import { BASEURL } from "@/globe/inter";
import { Service, appendParams2Path } from "@/globe/service";

import "./index.scss";

export function Home() {
  function ImageSwiper() {
    // const imgUrl = BASEURL + "/images/";
    const swiperPicArr = [
      BASEURL + appendParams2Path("/getPicSwiper", { id: "1", pass: "songzq12" }),
      BASEURL + appendParams2Path("/getPicSwiper", { id: "2", pass: "songzq12" }),
      BASEURL + appendParams2Path("/getPicSwiper", { id: "3", pass: "songzq12" }),
    ];

    return (
      <Swiper className="image-swiper" lazyRender autoplay={4000}>
        <Swiper.Indicator />
        <Swiper.Item>
          <img className="image" src={swiperPicArr[0]}></img>
        </Swiper.Item>
        <Swiper.Item>
          <img className="image" src={swiperPicArr[1]}></img>
        </Swiper.Item>
        <Swiper.Item>
          <img className="image" src={swiperPicArr[2]}></img>
        </Swiper.Item>
      </Swiper>
    );
  }

  return (
    <div className="home-page">
      <div className="title">
        <div>
          宋宋
          <Like />
          晴宝
        </div>
      </div>
      <div className="pic-swiper">
        <ImageSwiper />
      </div>
      {/* <img
        src={
          BASEURL +
          appendParams2Path("/getPicSwiper", { id: "1", pass: "songzq12" })
        }
      />
      <button
        onClick={() => {
          Service.getPicSwiper({
            id: "1",
            pass: "songzq12",
          }).then((res) => {
            console.log(res);
          });
        }}
      >
        csd
      </button> */}
    </div>
  );
}
