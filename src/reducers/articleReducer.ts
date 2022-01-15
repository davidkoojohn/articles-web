import { IArticleItem, IArticleActionsTypes } from "../types/articleTypes"

interface IArticleReducer {
  articleList: IArticleItem[]
}

const initialState: IArticleReducer = {
  articleList: []
}

export default function articleReducer(state = initialState, action: IArticleActionsTypes): IArticleReducer {
  switch (action.type) {
    case "SET_ARTICLES":
      return {
        ...state,
        articleList: action.items.map((item: IArticleItem) => ({ ...item, key: item.id }))
      }
    default:
      return {
        ...state,
        articleList: state.articleList.map((item: IArticleItem) => ({ ...item, key: item.id }))
      }
  }
}
