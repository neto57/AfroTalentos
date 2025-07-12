import { useEffect, useState } from "react";
import axios from "axios";

export default function GerenciarEmpresas() {
  const [empresas, setEmpresas] = useState([]);
  const [editando, setEditando] = useState(null);
  const [form, setForm] = useState({
    nomeFantasia: "",
    razaoSocial: "",
    cnpj: "",
    email: "",
    senha: ""
  });

  useEffect(() => {
    buscarEmpresas();
  }, []);

  const buscarEmpresas = () => {
    axios.get("http://localhost:8080/empresas")
      .then(res => setEmpresas(res.data))
      .catch(err => console.error("Erro ao buscar empresas", err));
  };

  const handleDelete = (id) => {
    if (window.confirm("Deseja excluir esta empresa?")) {
      axios.delete(`http://localhost:8080/empresas/${id}`)
        .then(() => buscarEmpresas())
        .catch(() => alert("Erro ao excluir empresa"));
    }
  };

  const handleEdit = (empresa) => {
    setEditando(empresa.id);
    setForm({ ...empresa });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    axios.put(`http://localhost:8080/empresas/${editando}`, form)
      .then(() => {
        buscarEmpresas();
        setEditando(null);
        alert("Empresa atualizada com sucesso!");
      })
      .catch(() => alert("Erro ao atualizar empresa"));
  };

  return (
    <div className="container mt-4">
      <h2>Gerenciar Empresas</h2>
      {empresas.length === 0 ? (
        <p>Nenhuma empresa cadastrada.</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Nome Fantasia</th>
              <th>Razão Social</th>
              <th>CNPJ</th>
              <th>Email</th>
              <th>Senha</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {empresas.map((empresa) => (
              <tr key={empresa.id}>
                <td>{editando === empresa.id ? <input name="nomeFantasia" value={form.nomeFantasia} onChange={handleChange} /> : empresa.nomeFantasia}</td>
                <td>{editando === empresa.id ? <input name="razaoSocial" value={form.razaoSocial} onChange={handleChange} /> : empresa.razaoSocial}</td>
                <td>{editando === empresa.id ? <input name="cnpj" value={form.cnpj} onChange={handleChange} /> : empresa.cnpj}</td>
                <td>{editando === empresa.id ? <input name="email" value={form.email} onChange={handleChange} /> : empresa.email}</td>
                <td>
  {editando === empresa.id ? (
    <input
      name="senha"
      type="password"
      value={form.senha}
      onChange={handleChange}
    />
  ) : (
    "••••••••" 
  )}
</td>

                <td>
                  {editando === empresa.id ? (
                    <button className="btn btn-success btn-sm" onClick={handleUpdate}>Salvar</button>
                  ) : (
                    <button className="btn btn-primary btn-sm me-2" onClick={() => handleEdit(empresa)}>Editar</button>
                  )}
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(empresa.id)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
