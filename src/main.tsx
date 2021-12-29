import React from "react"
import ReactDOM from "react-dom"
import { HashRouter } from "react-router-dom"
import "antd/dist/antd.compact.less"
import "./index.less"
import App from "./layouts/App"

ReactDOM.render(
  <HashRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </HashRouter>,
  document.getElementById("root")
)
