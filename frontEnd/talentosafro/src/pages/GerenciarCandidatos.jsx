import { useEffect, useState } from "react";
import axios from "axios";

export default function GerenciarCandidatos() {
  const [candidatos, setCandidatos] = useState([]);
  const [editando, setEditando] = useState(null);
  const [form, setForm] = useState({ nome: "", email: "", senha: "", telefone: "", endereco: "" });

  useEffect(() => {
    buscarCandidatos();
  }, []);

  const buscarCandidatos = () => {
    axios.get("http://localhost:8080/candidatos")
      .then(res => setCandidatos(res.data))
      .catch(err => console.error("Erro ao buscar candidatos", err));
  };

  const handleDelete = (id) => {
    if (window.confirm("Deseja realmente excluir este candidato?")) {
      axios.delete(`http://localhost:8080/candidatos/${id}`)
        .then(() => buscarCandidatos())
        .catch(() => alert("Erro ao excluir candidato"));
    }
  };

  const handleEdit = (candidato) => {
    setEditando(candidato.id);
    setForm({ ...candidato });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    axios.put(`http://localhost:8080/candidatos/${editando}`, form)
      .then(() => {
        buscarCandidatos();
        setEditando(null);
        alert("Candidato atualizado!");
      })
      .catch(() => alert("Erro ao atualizar candidato"));
  };

  return (
    <div className="container mt-4">
      <h2>Gerenciar Candidatos</h2>
      {candidatos.length === 0 ? (
        <p>Nenhum candidato cadastrado.</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Telefone</th>
              <th>Endereço</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {candidatos.map((candidato) => (
              <tr key={candidato.id}>
                <td>{editando === candidato.id ? <input name="nome" value={form.nome} onChange={handleChange} /> : candidato.nome}</td>
                <td>{editando === candidato.id ? <input name="email" value={form.email} onChange={handleChange} /> : candidato.email}</td>
                <td>{editando === candidato.id ? <input name="telefone" value={form.telefone} onChange={handleChange} /> : candidato.telefone}</td>
                <td>{editando === candidato.id ? <input name="endereco" value={form.endereco} onChange={handleChange} /> : candidato.endereco}</td>
                <td>
                  {editando === candidato.id ? (
                    <button className="btn btn-success btn-sm" onClick={handleUpdate}>Salvar</button>
                  ) : (
                    <button className="btn btn-primary btn-sm me-2" onClick={() => handleEdit(candidato)}>Editar</button>
                  )}
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(candidato.id)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
