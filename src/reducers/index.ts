import { combineReducers } from "redux"

const initialState = ["item1", "item2"]

function todo(state = initialState, action: any) {
  return state
}

const rootReducer = combineReducers({
  todo
})
export type RootState = ReturnType<typeof rootReducer>
export default rootReducer
