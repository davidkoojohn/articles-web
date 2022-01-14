import { combineReducers } from "redux"
import articleReducer from "./articleReducer"
const initialState = ["item1", "item2"]

function todo(state = initialState, action: any) {
  return state
}

const allReducer = {
  todo,
  articleReducer
}

const rootReducer = combineReducers(allReducer)
export type RootState = ReturnType<typeof rootReducer>
export default rootReducer
