
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Navbar from './components/Navbar'



function App() {
  const Login = lazy(() => import('./pages/Login/Login'))
  const Register = lazy(() => import('./pages/Register/Register'))
  const Home = lazy(() => import('./pages/Home/Home'))




  return (
    <Router>
      <Navbar />
      <Suspense fallback={<div>Caricamento pagina....</div>}>
        <Routes>
          <Route path='/' element={<Login />} />

          <Route path='/register' element={<Register />} />

          <Route path='/home' element={<Home />} />
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App
