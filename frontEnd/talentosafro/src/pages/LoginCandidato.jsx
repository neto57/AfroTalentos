import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginCandidato() {
  const [login, setLogin] = useState({ email: "", senha: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8080/candidatos/login", login)
      .then((res) => {
        const id = res.data.id;
        localStorage.setItem("idCandidato", id); // guarda o id real
        alert("Login realizado com sucesso!");
        navigate("/vagas");
      })
      .catch(() => {
        alert("Credenciais inválidas.");
      });
  };

  return (
    <div className="container mt-4">
      <h2>Login de Candidato</h2>
      <form onSubmit={handleSubmit}>
        <input name="email" className="form-control mb-2" placeholder="Email" onChange={handleChange} />
        <input name="senha" className="form-control mb-2" placeholder="Senha" type="password" onChange={handleChange} />
        <button className="btn btn-primary" type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default LoginCandidato;
