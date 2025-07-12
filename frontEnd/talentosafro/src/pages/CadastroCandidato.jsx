import { useState } from 'react'
import axios from 'axios'
import './FormPadrao.css';
export default function CadastroCandidato() {
  const [candidato, setCandidato] = useState({
    cpf: '', nome: '', email: '', senha: '', dataNascimento: ''
  })

  function handleChange(e) {
    setCandidato({ ...candidato, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    axios.post('http://localhost:8080/candidatos', candidato)
      .then(() => alert('Candidato cadastrado!'))
      
      .catch(() => alert('Erro ao cadastrar candidato'))
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="cpf" placeholder="CPF" onChange={handleChange} />
      <input name="nome" placeholder="Nome" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="senha" type="password" placeholder="Senha" onChange={handleChange} />
      <input name="dataNascimento" type="date" onChange={handleChange} />
      <button type="submit">Cadastrar Candidato</button>
    </form>
    
  )
}
