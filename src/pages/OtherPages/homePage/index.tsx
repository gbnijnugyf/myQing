/* eslint-disable jsx-quotes */
import { Like } from "@taroify/icons";
import { Swiper } from "@taroify/core";
import { BASEURL } from "@/globe/inter";


import "./index.scss";

export function Home() {
  function ImageSwiper() {
    const imgUrl = BASEURL + "/images/";
    const swiperPicArr = [
      imgUrl + "img_swiper.jpg",
      imgUrl + "img_swiper2.jpg",
      imgUrl + "img_swiper3.jpg",
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
    </div>
  );
}
