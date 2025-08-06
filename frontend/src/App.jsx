
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { lazy, Suspense, useEffect } from 'react'
import Navbar from './components/Navbar'
import { useDispatch } from 'react-redux'
import { logout, login } from "./features/authSlice"
import { useSelector } from 'react-redux'

import { PublicRoutes } from "./components/PublicRoutes";
import { ProtectedRoutes } from "./components/ProtectedRoutes";



function App() {
  const Login = lazy(() => import('./pages/Login/Login'))
  const Register = lazy(() => import('./pages/Register/Register'))
  const Home = lazy(() => import('./pages/Home/Home'))
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)


  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      dispatch(login());
    } else {
      dispatch(logout());
    }
  });




  return (
    <Router>
      <Navbar />
      <Suspense fallback={<div>Caricamento pagina....</div>}>
        <Routes>
          <Route path='/login' element={<PublicRoutes isAuthenticated={isAuthenticated}><Login /></PublicRoutes>} />

          <Route path='/register' element={<PublicRoutes isAuthenticated={isAuthenticated}><Register /></PublicRoutes>} />

          <Route path='/' element={<ProtectedRoutes isAuthenticated={isAuthenticated}><Home /></ProtectedRoutes>} />
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App
