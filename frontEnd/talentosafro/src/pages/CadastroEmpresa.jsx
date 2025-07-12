import { useState } from 'react';
import axios from 'axios';
import './CadastroEmpresa.css';


export default function CadastroEmpresa() {
  const [empresa, setEmpresa] = useState({
    nomeFantasia: '',
    razaoSocial: '',
    cnpj: '',
    email: '',
    senha: ''
  });

  function handleChange(e) {
    setEmpresa({ ...empresa, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    axios.post('http://localhost:8080/empresas', empresa)
      .then(() => alert('Empresa cadastrada!'))
      .catch(() => alert('Erro ao cadastrar empresa'));
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="nomeFantasia" placeholder="Nome Fantasia" onChange={handleChange} />
      <input name="razaoSocial" placeholder="Razão Social" onChange={handleChange} />
      <input name="cnpj" placeholder="CNPJ" onChange={handleChange} />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
      <input type="password" name="senha" placeholder="Senha" onChange={handleChange} required />
      <button type="submit">Cadastrar Empresa</button>
    </form>
  );
}
