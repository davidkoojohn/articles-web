import React from "react"
import ReactDOM from "react-dom"
import { HashRouter } from "react-router-dom"
import { Provider } from "react-redux"
import store from "./store"
import "antd/dist/antd.compact.less"
import "./index.less"
import App from "./layouts/App"

ReactDOM.render(
  <HashRouter>
    <React.StrictMode>
      <Provider store={ store }>
        <App />
      </Provider>
    </React.StrictMode>
  </HashRouter>,
  document.getElementById("root")
)
