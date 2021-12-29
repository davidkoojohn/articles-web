import { lazy, Suspense } from "react"
import { Routes, Route } from "react-router-dom"

import MobileLayout from "../layouts/Mobile"
import AdminLayout from "../layouts/Admin"
const AdminLandingPage = lazy(() => import("../admin-pages/Landing"))
const AdminArticlePage = lazy(() => import("../admin-pages/Article"))
const AdminArticleIndexPage = lazy(() => import("../admin-pages/article-pages/Index"))
const AdminArticleShowPage = lazy(() => import("../admin-pages/article-pages/Show"))
const AdminArticleCreatePage = lazy(() => import("../admin-pages/article-pages/Create"))
const AdminArticleEditPage = lazy(() => import("../admin-pages/article-pages/Edit"))
const AdminAboutPage = lazy(() => import("../admin-pages/About"))

function App () {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path={"/"} element={<MobileLayout/>} />
        <Route path={"/admin"} element={ <AdminLayout/> }>
          <Route index element={ <AdminLandingPage/> } />
          <Route path={"article"} element={ <AdminArticlePage/> }>
            <Route index element={ <AdminArticleIndexPage/> } />
            <Route path={"new"} element={ <AdminArticleCreatePage/> } />
            <Route path={":id/edit"} element={ <AdminArticleEditPage/> } />
            <Route path={":id"} element={ <AdminArticleShowPage/> } />
          </Route>
          <Route path={"about"} element={ <AdminAboutPage/> } />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App
