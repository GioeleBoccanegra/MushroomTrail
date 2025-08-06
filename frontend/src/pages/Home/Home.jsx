import "./Home.css"
import { useSelector } from "react-redux"


export default function Home() {


  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

  return (
    <div>

      <h1>SHROOMMAP</h1>
      {isAuthenticated && <p>autneticato</p>}
    </div>
  )

}