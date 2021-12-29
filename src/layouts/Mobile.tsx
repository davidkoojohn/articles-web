import { Outlet, Link } from "react-router-dom"

export default function Mobile() {
  return (
    <>
      <h1>Mobile Layout</h1>
      <nav>
        <Link to={"/admin"}>to admin</Link>
      </nav>
      <Outlet/>
    </>
  )
}
