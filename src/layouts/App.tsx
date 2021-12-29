import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app">
      <p>
        <button
          type="button"
          onClick={
            () => setCount((count) => count + 1)
          }
        >
          count is: {count}
        </button>
      </p>
    </div>
  )
}

export default App
