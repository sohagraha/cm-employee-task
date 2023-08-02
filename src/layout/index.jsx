import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { Footer, Header } from "antd/es/layout/layout";
import { Link } from "react-router-dom";
import "./layout.css";

const MainLayout = (props) => {
  return (
    <div>
      <Layout>
        <Sider breakpoint="lg" collapsedWidth="0">
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1" icon={<UserOutlined />}>
              <Link to="/employee">Employee</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<VideoCameraOutlined />}>
              <Link to="/task">Task</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<UploadOutlined />}>
              <Link to="/assign_task">Assign Task</Link>
            </Menu.Item>
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
            }}
          >
            ©2018 Created by Sohag Raha
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
};

export default MainLayout;
