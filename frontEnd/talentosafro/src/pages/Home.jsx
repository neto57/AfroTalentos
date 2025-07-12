import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  return (
    
    <div className="home-container">
      <img src="public/img/img-home.png" alt="" className="home-image" />

    <div className="home-content">
      
        <h1>Bem-vindo ao <strong>TalentosAfro</strong></h1>
        <p>Conectando talentos negros com oportunidades incríveis</p>

    <div className="home-buttons">
          <button className="btn" onClick={() => navigate('/candidato/cadastro')}>Sou Candidato</button>
          <button className="btn" onClick={() => navigate('/empresa/cadastro')}>Sou Empresa</button>
          <button className="btn" onClick={() => navigate('/login')}>Entrar</button>
        </div>
      </div>
    </div>
  );
}

export default Home;
