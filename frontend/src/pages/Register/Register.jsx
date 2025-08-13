
import { Link, Navigate } from "react-router-dom"
import { useState } from "react"
import "./Register.css"
import { registerUser } from "../../api/registerUser"
import { useNavigate } from "react-router-dom"
import Loader from "../../components/Loader"



export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("")
    try {
      const response = await registerUser(username, email, password);
      if (response) {
        navigate("/login", { state: { successoRegistrazione: true } })
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false);
    }


  }




  return (
    <div className="login-container">
      <h1> REGISTRATI</h1>
      {error && <p style={{ color: "red" }} aria-live="assertive">{error}</p>}
      {loading && <Loader />}
      {loading && <p>caric...</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="username" >
          Username:
        </label>
        <input type="text" value={username} name="username" id="username" onChange={(e) => setUsername(e.target.value)} required disabled={loading} />

        <label htmlFor="email" >
          Email:
        </label>
        <input type="email" value={email} name="email" id="email" onChange={(e) => setEmail(e.target.value)} required disabled={loading} />

        <label htmlFor="password" >
          Password:
        </label>
        <input type="password" value={password} name="password" id="password" onChange={(e) => setPassword(e.target.value)} required disabled={loading} />

        <button type="submit">Registrati</button>
      </form>
      <div>
        <Link to="/login"> Hai già un account?
          <button disabled={loading}>Accedi</button>
        </Link>
      </div>

    </div>
  )
}