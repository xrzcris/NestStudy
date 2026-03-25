import './App.css'
import { Route, Routes , Navigate} from 'react-router-dom'
import Home from './views/Home'
import PostDetail from './views/PostDetail'
import { useEffect } from 'react'

function App() {

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-[#191919]">
    <Routes>
      <Route path='/home' element={<Home />} />
      <Route path="/posts/:id" element={<PostDetail />} />
      <Route path="*" element={<Navigate to="/"/> } />
    </Routes>
    </div>
  )
}


export default App
