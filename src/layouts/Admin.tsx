import React, {ReactNode, useState} from "react"
import { Outlet, useLocation, Link } from "react-router-dom"
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

interface IPath {
  path: string
  title: string
  icon: ReactNode
  activePattern: RegExp
}

const PATH: IPath[] = [
  {
    path: "/admin",
    activePattern: new RegExp("^/admin$"),
    title: "Home",
    icon: <BarsOutlined />
  },
  {
    path: "/admin/article",
    activePattern: new RegExp("^/admin/article"),
    title: "Article",
    icon: <AppstoreOutlined />
  },
  {
    path: "/admin/about",
    activePattern: new RegExp("^/admin/about$"),
    title: "About",
    icon: <InfoCircleOutlined />
  }
]

export default function Admin() {
  const [collapsed, setCollapsed] = useState<boolean>(false)
  const location = useLocation()

  const menuItems = PATH.map((it, index) => (
    <Menu.Item
      className={ it.activePattern.test(location.pathname) ? "ant-menu-item-selected" : "" }
      key={index}
      icon={it.icon}
    >
      <Link
        to={it.path}
      >
        { it.title }
      </Link>
    </Menu.Item>
  ))

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className={"logo "+`${!collapsed ? "open" : ""}` }>
          <img src={ logo } alt="logo"/>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectable={false}
        >
          {menuItems}
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
