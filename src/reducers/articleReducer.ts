import { IArticle, GET_ARTICLES } from "../types/articleTypes"

interface IArticleReducer {
  articles: IArticle[]
}

const initialState: IArticleReducer = {
  articles: [
    {
      id: "1",
      title: "胡彦斌西湖区湖底公园1号",
      tags: ["西湖区", "湖底", "公园1号"],
      author: "koo",
      created_at: "2022-01-02 12:32:21",
    },
    {
      id: "2",
      title: "11胡彦斌西湖区湖底公园1号",
      tags: ["湖底", "公园1号"],
      author: "koo",
      created_at: "2022-01-12 12:32:21",
    },
    {
      id: "3",
      title: "22胡彦斌西湖区湖底公园1号",
      tags: ["湖底", "公园1号", "hah"],
      author: "koo",
      created_at: "2022-01-13 12:32:21",
    },
  ]
}

export default function articleReducer(state = initialState, action: any): IArticleReducer {
  return state
}


