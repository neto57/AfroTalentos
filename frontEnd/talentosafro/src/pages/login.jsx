import { useState } from 'react';
import axios from 'axios';
import './Login.css';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [tipo, setTipo] = useState('candidato');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();

    const rota = tipo === 'empresa' ? '/empresas/login' : '/candidatos/login';

    axios.post(`http://localhost:8080${rota}`, { email, senha })
      .then((res) => {
        if (res.data && res.data.id) {
          if (tipo === 'empresa') {
            localStorage.setItem('idEmpresa', res.data.id);
            alert('Login da empresa bem-sucedido!');
            navigate('/empresa/home');
          } else {
            localStorage.setItem('idCandidato', res.data.id);
            alert('Login do candidato bem-sucedido!');
            navigate('/vagas');
          }
        } else {
          alert("Erro: resposta inválida do servidor.");
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          alert('Credenciais inválidas. Verifique email e senha.');
        } else {
          alert('Erro ao conectar com o servidor.');
        }
      });
  }

  return (
    <div className="login-container">
      <h2>Login - TalantosAfro</h2>

      <form onSubmit={handleLogin}>
        <select onChange={(e) => setTipo(e.target.value)} value={tipo}>
          <option value="candidato">Sou Candidato</option>
          <option value="empresa">Sou Empresa</option>
        </select>

        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />

        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}
