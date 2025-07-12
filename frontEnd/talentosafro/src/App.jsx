import { Routes, Route } from 'react-router-dom';
import CadastroEmpresa from './pages/CadastroEmpresa';
import CadastroCandidato from './pages/CadastroCandidato';
import CadastroVaga from './pages/CadastroVaga';
import Home from './pages/Home';
import Login from './pages/login';
import ListarVagas from './pages/ListarVagas';
import LoginCandidato from './pages/LoginCandidato';
import PrivateRoute from './pages/PrivateRoute'; 
import GerenciarCandidatos from './pages/GerenciarCandidatos';
import GerenciarEmpresas from './pages/GerenciarEmpresas';
import GerenciarVagas from './pages/GerenciarVagas';
import HomeEmpresa from './pages/HomeEmpresa';
import MenuEmpresa from './pages/MenuEmpresa';



function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/empresa/cadastro" element={<CadastroEmpresa />} />
      <Route path="/candidato/cadastro" element={<CadastroCandidato />} />
      <Route path="/vaga/cadastro" element={<CadastroVaga />} />
      <Route path="/login/candidato" element={<LoginCandidato />} />
      <Route path="/candidatos/gerenciar" element={<GerenciarCandidatos />} />
      <Route path="/empresas/gerenciar" element={<GerenciarEmpresas />} />
      <Route path="/vagas/gerenciar" element={<GerenciarVagas />} />
      <Route path="/empresa/home" element={<HomeEmpresa />} />
     <Route path="/empresa/menu" element={<MenuEmpresa />} />
       
      
      <Route
        path="/vagas"
        element={
          <PrivateRoute>
            <ListarVagas />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
