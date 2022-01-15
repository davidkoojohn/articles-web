import { useState, Key, useEffect } from "react";
import { Link } from "react-router-dom"
import { Table, Space, Button, Tag, message } from "antd"
import { ColumnsType } from "antd/es/table"
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons"
import "./Article.less"
import { connect, ConnectedProps } from "react-redux"
import { RootState } from "../../reducers"
import { IArticleItem } from "../../types/articleTypes"
import * as articleActions from "../../actions/articleActions"

interface IOperationProps {
  id: string
}
function Operation({ id }: IOperationProps) {
  return (
    <Space size="middle">
      <Link to={`/admin/article/${id}`}>
        <Button type={"ghost"} shape={"circle"} size={"small"} icon={<EyeOutlined/>}/>
      </Link>
      <Link to={`/admin/article/${id}/edit`}>
        <Button type={"primary"} shape={"circle"} size={"small"} icon={<EditOutlined/>}/>
      </Link>
      <Button
        danger={true}
        shape={"circle"}
        size={"small"}
        icon={<DeleteOutlined/>}
        onClick={
          () => {
            console.log("delete", id)
          }
        }
      />
    </Space>
  )
}

const columns: ColumnsType<IArticleItem> = [
  {
    title: "#",
    dataIndex: "id",
    key: "id",
    align: "center",
    className: "gray",
    width: 80
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
    render: (row: IArticleItem) => {
      return (
        <Operation id={row.id}/>
      )
    },
  },
];

const connectArticleIndex = connect(
  (state: RootState) => {
    const { articleList } = state.articleReducer
    return { articles: articleList }
  },
  (dispatch, ownProps) => {
    return {
      getArticles: () => dispatch<any>(articleActions.getArticles())
    }
  }
)
type TArticlePropsFromRedux = ConnectedProps<typeof connectArticleIndex>
type TArticleProps = TArticlePropsFromRedux & {

}
const Article = connectArticleIndex(({ articles, getArticles }: TArticleProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const init = async () => {
    try {
      setIsLoading(true)
      await getArticles()
    } catch (e) {
      message.error("网络错误，请刷新重试！");
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    init()
  }, [])

  return (
    <Table
      bordered={true}
      loading={isLoading}
      dataSource={articles}
      rowKey={"id"}
      columns={columns}
      rowSelection={{
        type: "checkbox",
        onChange: (selectedRowKeys: Key[], selectedRows: IArticleItem[]) => {
          console.log(selectedRowKeys, selectedRows)
        }
      }}
      pagination={{
        position: ["bottomCenter"],
      }}
    />
  )
})

export default function ArticleIndex() {
  return <>
    <Article />
  </>
}
