/* eslint-disable jsx-quotes */
import { Like, PhotoOutlined, Clear } from "@taroify/icons";
import {
  Divider,
  Swiper,
  Uploader,
  Button,
  Dialog,
  Notify,
} from "@taroify/core";
import { BASEURL, IUploadPic } from "@/globe/inter";
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
  picArr: string[] | null;
}

export function Home() {
  // let themePicArr;
  const location = useLocation();
  const [themePicArr, setThemePicArr] = useState<(string[] | null)[]>();
  //标记上传或删除
  const [uploadFlag, setUploadFlag] = useState<boolean>(false);
  const [atest, setAtest] = useState("");

  useEffect(() => {
    console.log("token:", Taro.getStorageSync("token"));
    Service.getPicThemeArr({ imageIndex: "theme" }).then((res) => {
      const ArrNum = res.data.data;
      //TODO：后期功能——动态添加主题
      // themePicArr = Array.from({ length: ArrNum.length });
      console.log("ArrNum:", ArrNum, "res:", res);

      setThemePicArr(
        ArrNum !== null ? Array.from({ length: ArrNum.length }) : undefined
      );
      //例如ArrNum = [[0,1], [0,2], [0], [0,1,2]] 则
      let tempArr = [] as Array<any>;
      if (ArrNum !== null) {
        for (let index = 0; index < ArrNum.length; index++) {
          const item = ArrNum[index];
          if (item === null) {
            tempArr.push("");
            continue;
          }
          let itemArr = [] as Array<any>;
          console.log(itemArr)

          for (let _index = 0; _index < item.length; _index++) {
            const item2 = item[_index];
            Service.getPicTheme({ id: `${index + 1}-${item2}` }).then(
              (resImg) => {
                const imgCode = resImg.data;
                const blob = new Blob([imgCode], { type: "image/jpeg" });
                const imageUrl = window.URL.createObjectURL(blob);
                itemArr.push(imageUrl);

                if (itemArr.length === item.length) {
                  tempArr.push(itemArr);
                }
              }
            );
          }
        }
        console.log("2:", tempArr);

        // 等待所有异步操作完成
        Promise.all(tempArr.flat())
          .then((result) => {
            // 处理所有图片 URL
            console.log(result);
          })
          .catch((error) => {
            console.error("Error loading images:", error);
          });

        console.log("3:", tempArr);
        // tempArr = ArrNum.map((item, index) => {
        //   //themePicArr[0]赋值为 长度为2的数组，每个元素包含着对应图片的url
        //   if (item === null) {
        //     return null;
        //   }
        //   return item.map((item2, _index) => {
        //     //_index为数组下标,item2为元素
        //     Service.getPicTheme({ id: `${index + 1}-${item2}` }).then(
        //       (resImg) => {
        //         const imgCode = resImg.data;
        //         const blob = new Blob([imgCode], { type: "image/jpeg" }); // 根据实际图片类型设置 MIME 类型
        //         const imageUrl = window.URL.createObjectURL(blob);
        //         setAtest(imageUrl);
        //         // console.log(imageUrl);
        //       }
        //     );
        //     return atest;

        //     // return (
        //     //   BASEURL +
        //     //   appendParams2Path("/main/getPicTheme", {
        //     //     //index+1为图片主题 - i为该主题下的图片
        //     //     //TODO：i需要根据查询数据库结果得到，待修改
        //     //     id: `${index + 1}-${item2}`,
        //     //   })
        //     // );
        //   });
        // });
      }
      setThemePicArr(tempArr);
    });
    console.log("1:", themePicArr);
  }, [uploadFlag]);

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
      <></>
      // <Swiper className="image-swiper" lazyRender autoplay={4000}>
      //   <Swiper.Indicator />
      //   <Swiper.Item>
      //     <img rel="preload" className="image" src={swiperPicArr[0]} />
      //   </Swiper.Item>
      //   <Swiper.Item>
      //     <img rel="preload" className="image" src={swiperPicArr[1]} />
      //   </Swiper.Item>
      //   <Swiper.Item>
      //     <img rel="preload" className="image" src={swiperPicArr[2]} />
      //   </Swiper.Item>
      // </Swiper>
    );
  }
  function ImageTheme() {
    interface IDeleteConfirm {
      isOpen: boolean;
      isDelete: boolean;
      getImageUrl: string;
    }
    const [deleteConfirm, setDeleteConfirm] = useState<IDeleteConfirm>({
      isOpen: false,
      isDelete: false,
      getImageUrl: "",
    });

    function imageDelete(getImageUrl: string) {
      const regex = new RegExp("(?!id=)\\d+-\\d+(?=&)");
      const match = getImageUrl.match(regex);
      console.log(getImageUrl, match);
      if (match === null) {
        Notify.open("呜呜呜删除失败了");
      } else {
        console.log("theme" + match[0]);
        Service.deletePicTheme({ picName: "theme" + match[0] }).then((res) => {
          console.log(res);
          if (res.data.data === true) {
            setUploadFlag(!uploadFlag);
          } else {
            Notify.open("呜呜呜删除失败了");
          }
        });
      }
    }
    function ConfirmDialog() {
      return (
        <>
          <Dialog open={deleteConfirm.isOpen} onClose={() => setDeleteConfirm}>
            <Dialog.Header>提醒</Dialog.Header>
            <Dialog.Content>宝宝确定要删除该图片吗？</Dialog.Content>
            <Dialog.Actions>
              <Button
                onClick={() =>
                  setDeleteConfirm({
                    isOpen: false,
                    isDelete: false,
                    getImageUrl: "",
                  })
                }
              >
                取消
              </Button>
              <Button
                onClick={() => {
                  imageDelete(deleteConfirm.getImageUrl);
                  setDeleteConfirm({
                    isOpen: false,
                    isDelete: false,
                    getImageUrl: "",
                  });
                }}
              >
                确认
              </Button>
            </Dialog.Actions>
          </Dialog>
        </>
      );
    }

    function ImageLine(props: IImageLine) {
      // console.log(props);
      // if (props === null) {
      //   return <>暂无图片，快上传吧！</>;
      // }
      function ImageUploader() {
        const [file, setFile] = useState<Uploader.File>();
        const successFunc = async (res: IUploadPic) => {
          const fileArr = res.tempFilePaths;
          let isUpLoad = false;
          for (let i = 0; i < res.tempFiles.length; i++) {
            await Service.postPicTheme({
              imageIndex: props.theme.key,
              file: fileArr[i],
            }).then(() => {
              isUpLoad = true;
            });
          }
          if (isUpLoad) {
            setUploadFlag(!uploadFlag);
          }
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
            {props.picArr != null ? (
              props.picArr.map((item) => (
                <>
                  <div key={item} className="img">
                    <div className="delete-button">
                      <Clear
                        onClick={() =>
                          setDeleteConfirm({
                            isOpen: true,
                            isDelete: true,
                            getImageUrl: item,
                          })
                        }
                      />
                    </div>
                    <Image
                      style="border-radius: 15%;height: 100%; width:100%"
                      src={item}
                      onClick={() => {
                        console.log(item);
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
              ))
            ) : (
              <>暂无图片，快上传吧！</>
            )}
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
            <ConfirmDialog />
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
      <Notify id="notify" />
      {/* <div className="title">
        <div>
          宋宋
          <Like color="red" />
          晴宝
        </div>
      </div> */}
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
