import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'

const CourseDetail = lazy(() => import('./pages/CourseDetail'))

function App() {
  return (
    <Router>
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#fdfbf7]"><div className="w-12 h-12 border-4 border-amber-800 border-t-transparent rounded-full animate-spin"></div></div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:slug" element={<CourseDetail />} />
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App
