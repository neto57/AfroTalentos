import { Link, useNavigate } from "react-router-dom";
import './MenuEmpresa.css'
export default function MenuEmpresa() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("idEmpresa");
    navigate("/login");
  };

  return (
    
    <div className="container mt-4">
      <img src="public/img/home-empresa.png" alt="" />
      <h2>Conecte-se ao talento que impulsiona o futuro. Anuncie suas vagas aqui</h2>
      <div className="d-flex gap-3 mb-4">
        <Link to="/vaga/cadastro" className="btn btn-primary">Cadastrar Vaga</Link> 
        <Link to="/vagas/gerenciar" className="btn btn-secondary">Minhas Vagas</Link>
        <button onClick={handleLogout} className="btn btn-danger">Sair</button>
      </div>
    </div>
  );
}
