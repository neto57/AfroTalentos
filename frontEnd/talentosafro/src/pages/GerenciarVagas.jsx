import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
export default function GerenciarVagas() {
  const [vagas, setVagas] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  const [form, setForm] = useState({
    titulo: "",
    descricao: "",
    local: "",
    requisitos: ""
  });
const navigate = useNavigate();
  const idEmpresa = localStorage.getItem("idEmpresa");

  useEffect(() => {
    axios.get(`http://localhost:8080/vagas/empresa/${idEmpresa}`)
      .then(res => setVagas(res.data))
      .catch(() => alert("Erro ao carregar vagas"));
  }, [idEmpresa]);

  const handleDelete = (id) => {
    if (window.confirm("Deseja excluir esta vaga?")) {
      axios.delete(`http://localhost:8080/vagas/${id}`)
        .then(() => setVagas(vagas.filter(v => v.id !== id)))
        .catch(() => alert("Erro ao excluir vaga"));
    }
  };

  const handleEdit = (vaga) => {
    setEditandoId(vaga.id);
    setForm({
      titulo: vaga.titulo,
      descricao: vaga.descricao,
      local: vaga.local,
      requisitos: vaga.requisitos
    });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    axios.put(`http://localhost:8080/vagas/${editandoId}`, form)
      .then(() => {
        setVagas(vagas.map(v => v.id === editandoId ? { ...v, ...form } : v));
        setEditandoId(null);
        alert("Vaga atualizada com sucesso!");
      })
      .catch(() => alert("Erro ao atualizar vaga"));
  };

  return (
    <div className="container mt-4">
      <h2>Minhas Vagas</h2>
      {vagas.length === 0 ? (
        <p>Nenhuma vaga cadastrada.</p>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Título</th>
              <th>Descrição</th>
              <th>Local</th>
              <th>Requisitos</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {vagas.map((vaga) => (
              <tr key={vaga.id}>
                <td>
                  {editandoId === vaga.id ? (
                    <input name="titulo" value={form.titulo} onChange={handleChange} />
                  ) : vaga.titulo}
                </td>
                <td>
                  {editandoId === vaga.id ? (
                    <textarea name="descricao" value={form.descricao} onChange={handleChange} />
                  ) : vaga.descricao}
                </td>
                <td>
                  {editandoId === vaga.id ? (
                    <input name="local" value={form.local} onChange={handleChange} />
                  ) : vaga.local}
                </td>
                <td>
                  {editandoId === vaga.id ? (
                    <input name="requisitos" value={form.requisitos} onChange={handleChange} />
                  ) : vaga.requisitos}
                </td>
                <td>
                  {editandoId === vaga.id ? (
                    <button className="btn btn-success btn-sm" onClick={handleUpdate}>Salvar</button>
                  ) : (
                    <button className="btn btn-primary btn-sm me-2" onClick={() => handleEdit(vaga)}>Editar</button>
                  )}
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(vaga.id)}>Excluir</button>
                   <button className="btn" onClick={() => navigate('/home')}>Sair</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
