import { useState } from 'react'
import SitemapUrlList from './SitemapUrlList.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <SitemapUrlList />
    </>
  )
}

export default App
