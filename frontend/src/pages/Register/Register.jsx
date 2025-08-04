
import { Link } from "react-router-dom"
import { useState } from "react"
import "./Register.css"



export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setLoading(false)

  }




  return (
    <div className="login-container">
      <h1> REGISTRATI</h1>
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
        <Link> Hai già un account? </Link>
        <button>Accedi</button>
      </div>

    </div>
  )
}