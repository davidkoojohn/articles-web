import React, {ReactNode, useState} from "react"
import { Outlet, useNavigate, Link } from "react-router-dom"
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  AppstoreOutlined,
  BarsOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';
const { Header, Sider, Content } = Layout;
import "./Admin.less"
import logo from "../assets/logo.svg"

const PATH = [
  {
    path: "/admin",
    title: "Home",
    icon: <AppstoreOutlined />
  },
  {
    path: "/admin/article",
    title: "Article",
    icon: <AppstoreOutlined />
  },
  {
    path: "/admin/about",
    title: "About",
    icon: <AppstoreOutlined />
  }
] as {
  path: string
  title: string
  icon: ReactNode
}[]

export default function Admin() {
  const [collapsed, setCollapsed] = useState<boolean>(false)

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className={"logo "+`${!collapsed ? "open" : ""}` }>
          <img src={ logo } alt="logo"/>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["0"]}
        >
          {PATH.map((it, index) => (
            <Menu.Item key={index} icon={it.icon}>
              <Link to={it.path}>{ it.title }</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          <span
            style={{ color: "#fff", marginLeft: "1em" }}
            onClick={
              () => setCollapsed(!collapsed)
            }
          >
            { collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/> }
          </span>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            minHeight: "calc(100vh - 64px)",
            boxSizing: "border-box"
          }}
        >
          <Outlet/>
        </Content>
      </Layout>
    </Layout>
  );
}
