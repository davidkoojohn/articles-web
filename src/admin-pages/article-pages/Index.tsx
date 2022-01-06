import { useState, Key } from "react";
import { Table, Space, Button, Tag } from "antd"
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons"
import "./Article.less"

interface IDataType {
  id: string
  key: string
  title: string
  tags: string[]
  author: string
  created_at: string
}

const dataSource: IDataType[] = [
  {
    id: "1",
    key: "1",
    title: "胡彦斌西湖区湖底公园1号",
    tags: ["西湖区", "湖底", "公园1号"],
    author: "koo",
    created_at: "2022-01-02 12:32:21",
  },
];

const columns = [
  {
    title: "#",
    dataIndex: "id",
    key: "id",
    align: "center",
    className: "gray",
    width: 100
  },
  {
    title: "标题",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "标签",
    dataIndex: "tags",
    key: "tags",
    width: 160,
    render: (tags: string[]) => {
      return <>
        {tags.map((tag, index) => {
          let color = index % 2 === 0 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag.charCodeAt(0)}>{tag}</Tag>
          );
        })}
      </>
    }
  },
  {
    align: "center",
    title: "发布者",
    dataIndex: "author",
    key: "author",
    width: 100,
  },
  {
    align: "center",
    title: "发布时间",
    dataIndex: "created_at",
    key: "created_at",
    width: 150,
  },
  {
    align: "center",
    title: '操作',
    key: 'action',
    width: 130,
    render: (row: IDataType) => {
      return (
        <Space size="middle">
          <Button type={"ghost"} shape={"circle"} size={"small"} icon={<EyeOutlined/>}/>
          <Button type={"primary"} shape={"circle"} size={"small"} icon={<EditOutlined/>}/>
          <Button danger={true} shape={"circle"} size={"small"} icon={<DeleteOutlined/>}/>
        </Space>
      )
    },
  },
];

export default function ArticleIndex() {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  return (
    <Table
      bordered={true}
      loading={isLoading}
      dataSource={dataSource}
      columns={columns}
      rowSelection={{
        type: "checkbox",
        onChange: (selectedRowKeys: Key[], selectedRows: IDataType[]) => {
          console.log(selectedRowKeys, selectedRows)
        }
      }}
      pagination={{ position: ["bottomCenter"] }}
    />
  )
}
