import { CSSProperties } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { PageHeader, Button } from "antd"

import wbb from "@/assets/wbb.jpeg"

const styled: Record<string, CSSProperties> = {
  bordered: {
    border: "1px solid rgb(235, 237, 240)",
    backgroundColor: "#fff"
  }
}

export default function Article() {
  const navigate = useNavigate()

  return (
    <>
      <PageHeader
        style={styled.bordered}
        avatar={{ src: wbb }}
        title="文章管理"
        subTitle="This is a subtitle"
        extra={
          <Button onClick={() => navigate("/admin/article/new")}>新建文章</Button>
        }
      />
      <Outlet/>
    </>
  )
}
