import "./Navbar.css"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { logout } from "../features/authSlice"


export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login")
  }
  return (
    <nav>

      <div className="logo-navbar">
        <Link to="/">
          <img src="../../public/MushroomTrailNavbar.png" className="image-logo"></img>
        </Link>
      </div>

      <div className="button-navbar">
        <button className="logout-button" onClick={() => handleLogout()}>Logout</button>
      </div>
    </nav >
  )
}