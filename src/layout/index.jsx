import {
  UploadOutlined,
  UserOutlined,
  // VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { Footer, Header } from "antd/es/layout/layout";
import { Link } from "react-router-dom";
import "./layout.css";
import SubMenu from "antd/es/menu/SubMenu";

const MainLayout = (props) => {
  const menuItems = [
    {
      key: "1",
      icon: <UserOutlined />,
      link: "/employee",
      title: "Employee",
    },
    {
      key: "3",
      icon: <UploadOutlined />,
      link: "/assign_task",
      title: "Assign Task",
    },
  ];
  return (
    <div>
      <Layout>
        <Sider breakpoint="lg" collapsedWidth="0">
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            {menuItems.map((item) => {
              if (item?.subMenu?.length) {
                return (
                  <SubMenu key={item.key} icon={item.icon} title={item.title}>
                    {item?.subMenu?.map((subItem) => (
                      <Menu.Item key={subItem.key}>
                        <Link to={subItem.link}>{subItem.title}</Link>
                      </Menu.Item>
                    ))}
                  </SubMenu>
                );
              }
              return (
                <Menu.Item key={item.key} icon={item.icon}>
                  <Link to={item.link}>{item.title}</Link>
                </Menu.Item>
              );
            })}
          </Menu>
        </Sider>
        <Layout>
          <Header
            className="site-layout-sub-header-background"
            style={{
              padding: 0,
            }}
          />
          <div>
            <div
              className="site-layout-background"
              style={{ padding: 2, minHeight: "calc(100vh - 150px)" }}
            >
              {
                // eslint-disable-next-line react/prop-types
                props?.children
              }
            </div>
          </div>
          <Footer
            style={{
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            ©2023 Created by Sohag Raha
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
};

export default MainLayout;
