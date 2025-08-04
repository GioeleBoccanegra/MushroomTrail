
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Navbar from './components/Navbar'


function App() {
  const Login = lazy(() => import('./pages/Login/Login'))




  return (
    <Router>
      <Navbar />
      <Suspense fallback={<div>Caricamento pagina....</div>}>
        <Routes>
          <Route path='/' element={<Login />} />
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App
