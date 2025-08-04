import "./Navbar.css"
import { Link } from "react-router-dom"


export default function Navbar() {
  return (
    <nav>
      <div className="logo-navbar">
        <Link to="/home">
          <img src="../../public/MushroomTrailNavbar.png" className="image-logo"></img>
        </Link>
      </div>

      <div className="button-navbar">
        <Link className="link-page" to="/home">Home</Link>
        <button className="logout-button">Logout</button>
      </div>
    </nav>
  )
}