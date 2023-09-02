import { TabBar } from "antd-mobile";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export function MainPage() {
  const navigate = useNavigate();
  const tabs = [
    {
      key: "pages/home",
      title: "首页",
    },
    {
      key: "pages/todo",
      title: "待办",
    },
    {
      key: "pages/message",
      title: "消息",
      badge: "99+",
    },
    {
      key: "pages/my",
      title: "我的",
      badge: "1",
    },
  ];
  const location = useLocation();
  const { pathname } = location;
  const setRouteActive = (value: string) => {
    console.log(value);
    navigate(value);
  };
  return (
    <>
      <Outlet />
      <TabBar activeKey={pathname} onChange={(value) => setRouteActive(value)}>
        {tabs.map((item) => {
          return <TabBar.Item key={item.key} title={item.title} />;
        })}
      </TabBar>
    </>
  );
}
