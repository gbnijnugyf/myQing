/* eslint-disable jsx-quotes */
import { TabBar } from "antd-mobile";
import { Badge, Tabbar } from "@taroify/core";
import {
  FriendsOutlined,
  HomeOutlined,
  Search,
  SettingOutlined,
} from "@taroify/icons";
import {
  Outlet,
  createRoutesFromElements,
  useLocation,
  useNavigate,
} from "react-router-dom";

export function MainPage() {
  const navigate = useNavigate();
  // const location = useLocation();

  function BadgeTabbar() {
    // function selectTabs(key: number) {
    //   switch
    // }

    return (
      <Tabbar
        onChange={(props) => {
          console.log(props);
          navigate(props);
        }}
      >
        <Tabbar.TabItem key="home" icon={<HomeOutlined />}>
          首页
        </Tabbar.TabItem>
        <Tabbar.TabItem key="todo" badge icon={<Search />}>
          标签
        </Tabbar.TabItem>
        <Tabbar.TabItem key="message" badge="5" icon={<FriendsOutlined />}>
          标签
        </Tabbar.TabItem>
        <Tabbar.TabItem
          key="my"
          badge={<Badge content={100} max={99} />}
          icon={<SettingOutlined />}
        >
          设置
        </Tabbar.TabItem>
      </Tabbar>
    );
  }

  return (
    <>
      <div className="outlet">
        
        <Outlet />
      </div>
      <BadgeTabbar />
    </>
  );
}
