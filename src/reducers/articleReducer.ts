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
        articleList: action.items
      }
    default:
      return state
  }
}
