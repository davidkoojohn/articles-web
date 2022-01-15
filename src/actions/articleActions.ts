import {IArticleActionsTypes, SET_ARTICLES, IArticleItem} from "../types/articleTypes"
import { RootState } from "../reducers"
import { ThunkAction } from "redux-thunk"
import { Action } from "redux"
import * as articleApi from "../api/article"

export function requestArticles(items: IArticleItem[]): IArticleActionsTypes {
  return {
    type: SET_ARTICLES,
    items
  }
}

export function getArticles(): ThunkAction<void, RootState, unknown, Action<string>> {
  return async (dispatch, getState, extraArgument) => {
    const { data: items = [] } = await articleApi.getArticles()
    dispatch(requestArticles(items))
  }
}

