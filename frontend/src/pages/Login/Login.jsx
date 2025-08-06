
import { Link } from "react-router-dom"
import { useState } from "react"
import "./Login.css"
import { useLocation } from "react-router-dom";
import { loginUser } from "../../api/loginUser"



export default function Login() {
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successoRegistrazione, setSuccessoRegistrazione] = useState(location.state?.successoRegistrazione || false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessoRegistrazione(false);
    setLoading(true);
    try {
      const response = await loginUser(email, password);
      if (response) {
        console.log("autenticato");
      }
    } catch (err) {
      setError(err.message)
    }
    finally {
      setLoading(false);
    }
  }




  return (
    <div className="login-container">
      <h1> ACCEDI</h1>
      {error && <p style={{ color: "red" }} aria-live="assertive">{error}</p>}
      {successoRegistrazione && <p style={{ color: "green" }} aria-live="polite">Registrazione effettuata con successo, ora puoi accedere con le tue credenziali</p>}
      <form onSubmit={handleSubmit}>

        <label htmlFor="email" >
          Email:
        </label>
        <input type="email" value={email} name="email" id="email" onChange={(e) => setEmail(e.target.value)} required disabled={loading} />

        <label htmlFor="password" >
          Password:
        </label>
        <input type="password" value={password} name="password" id="password" onChange={(e) => setPassword(e.target.value)} required disabled={loading} />

        <button type="submit">Accedi</button>
      </form>
      <div>
        <Link to="/register"> Non hai ancora un account?
          <button>Registrati</button>
        </Link>
      </div>

    </div>
  )
}