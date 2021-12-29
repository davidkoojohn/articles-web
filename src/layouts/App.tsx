import { useState } from "react"
import { Button, Divider } from "antd"

function App () {
  const [count, setCount] = useState(0)
  console.log(count)
  return (
    <div className="app">
      <div>
        <Button type="primary">Primary Button</Button>
        <Button>Default Button</Button>
        <Button type="dashed">Dashed Button</Button>
        <Divider />
        <Divider />
        <Divider />
        <Button type="text">Text Button</Button>
        <Button type="link">Link Button</Button>
        <button
          type="button"
          onClick={
            () => setCount(count + 1)
          }
        >
          count is: {count}
        </button>
      </div>
    </div>
  )
}

export default App
