export const GET_ARTICLES = "GET_ARTICLES"
export const GET_ARTICLE = "GET_ARTICLE"
export const ADD_ARTICLE = "ADD_ARTICLE"
export const UPDATE_ARTICLE = "UPDATE_ARTICLE"
export const DELETE_ARTICLE = "DELETE_ARTICLE"

export interface IArticle {
  id: string
  title: string
  tags: string[]
  author: string
  created_at: string
}

