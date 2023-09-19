/* eslint-disable jsx-quotes */
import { Like, PhotoOutlined } from "@taroify/icons";
import { Divider, Swiper, Uploader, Button } from "@taroify/core";
import { BASEURL, IPostPicTheme } from "@/globe/inter";
import { Service, appendParams2Path } from "@/globe/service";
import { useEffect, useState } from "react";
import { Image } from "@tarojs/components";
import { useLocation } from "react-router-dom";
import Taro from "@tarojs/taro";

import "./index.scss";

interface ITheme {
  key: string;
  value: string;
}
interface IImageLine {
  theme: ITheme;
  picArr: string[];
}

export function Home() {
  // let themePicArr;
  const location = useLocation();
  const [themePicArr, setThemePicArr] = useState<string[][]>();
  const [uploadFlag, setUploadFlag] = useState<boolean>(false);
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
  }, [location, uploadFlag]);

  function ImageSwiper() {
    const swiperPicArr = Array.from({ length: 3 }).map((_item, index) => {
      return (
        BASEURL +
        appendParams2Path("/getPicSwiper", {
          id: (index + 1).toString(),
          pass: "songzq12",
        })
      );
    });

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
    function ImageLine(props: IImageLine) {
      console.log(props);

      function ImageUploader() {
        const [file, setFile] = useState<Uploader.File>();
        const successFunc = async (res) => {
          const formData = new FormData();
          for (let i = 0; i < res.tempFiles.length; i++) {
            const item = res.tempFiles[i];
            const response = await fetch(item.path);
            const blob = await response.blob();
            formData.append("image[]", blob);
          }
          formData.append("imageIndex", props.theme.key);
          console.log(formData);
          Service.postPicTheme(formData).then((r) => {
            console.log(r);
            setUploadFlag(!uploadFlag);
          });
        };

        function onUpload() {
          Taro.chooseImage({
            count: 3,
            sizeType: ["original", "compressed"],
            sourceType: ["album", "camera"],
            success: successFunc,
            fail: (res) => console.log(res),
          });
        }

        return (
          <Uploader
            className="upload"
            value={file}
            onUpload={onUpload}
            onChange={setFile}
          >
            <Button onClick={onUpload} variant="text" color="default">
              <PhotoOutlined size="45%" />
            </Button>
          </Uploader>
        );
      }

      return (
        <div className="dif-theme">
          <p>{props.theme.value}</p>
          <div className="img-line">
            {props.picArr.map((item) => (
              <>
                <div
                  key={item}
                  className="img"
                >
                  <Image
                    style="border-radius: 15%;height: 100%; width:100%"
                    src={item}
                    onClick={() => {
                      let current = item; //这里获取到的是一张本地的图片
                      Taro.previewImage({
                        current: current, //需要预览的图片链接列表
                        urls: [current], //当前显示图片的链接
                        enablesavephoto: true,
                        enableShowPhotoDownload: true,
                      });
                    }}
                    mode="aspectFill"
                  />
                </div>
              </>
            ))}
            <ImageUploader />
          </div>
          <Divider className="divider2" style={{ color: "black" }} dashed />
        </div>
      );
    }

    return (
      <>
        {themePicArr != undefined ? (
          <>
            {/* <ImageLine
              theme={{ key: "theme1", value: "我们" }}
              picArr={themePicArr[0]}
            /> */}
            <ImageLine
              theme={{ key: "theme2", value: "美食" }}
              picArr={themePicArr[1]}
            />
            {/* <ImageLine
              theme={{ key: "theme3", value: "晴宝" }}
              picArr={themePicArr[2]}
            />
            <ImageLine
              theme={{ key: "theme4", value: "宋宋" }}
              picArr={themePicArr[3]}
            /> */}
          </>
        ) : (
          <>暂无可展示数据</>
        )}
      </>
    );
  }

  return (
    <div className="home-page">
      <div className="title">
        <div>
          {/* 宋宋
          <Like color="red" />
          晴宝 */}
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
