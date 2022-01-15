export const SET_ARTICLES = "SET_ARTICLES"

export interface IArticleItem {
  id: string
  title: string
  tags: string[]
  author: string
  created_at: string
}

interface IRequestArticles {
  type: typeof SET_ARTICLES
  items: IArticleItem[]
}

export type IArticleActionsTypes = IRequestArticles
