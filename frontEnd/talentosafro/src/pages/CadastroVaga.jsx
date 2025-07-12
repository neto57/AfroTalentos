import { useState, useEffect } from 'react';
import axios from 'axios';

export default function CadastroVaga() {
  
  const [vaga, setVaga] = useState({ 
    titulo: '', 
    setor: '', 
    descricao: '',
    local: '',
    requisitos: '', 
    salario: '' 
  });

  const [empresas, setEmpresas] = useState([]);
  // Um estado separado para armazenar apenas o ID da empresa selecionada
  const [selectedEmpresaId, setSelectedEmpresaId] = useState(''); // Estado para o ID da empresa selecionada

  const API_BASE_URL = 'http://localhost:8080'; // Constante para a URL base

  useEffect(() => {
    // Ajustado para usar a constante API_BASE_URL
    axios.get(`${API_BASE_URL}/vagas/empresas`) // Endpoint que lista as empresas
      .then(res => {
        setEmpresas(res.data);
      })
      .catch(error => {
        console.error('Erro ao buscar empresas:', error);
        alert('Erro ao carregar lista de empresas.');
      });
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    // Se o campo alterado for o dropdown de empresa
    if (name === 'empresaId') {
      setSelectedEmpresaId(value); // Atualiza o estado do ID da empresa selecionada
    } else {
      // Para os outros campos da vaga
      setVaga({ ...vaga, [name]: value });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!selectedEmpresaId) {
      alert('Por favor, selecione uma empresa.');
      return;
    }

    
    axios.post(`${API_BASE_URL}/vagas?empresaId=${selectedEmpresaId}`, vaga)
      .then(() => {
        alert('Vaga cadastrada com sucesso!');
       
        setVaga({ titulo: '', setor: '', descricao:'',local:'',requisitos:'', salario: '' });
        setSelectedEmpresaId('');
      })
      .catch(error => {
        console.error('Erro ao cadastrar vaga:', error.response ? error.response.data : error.message);
        
        alert('Erro ao cadastrar vaga. Verifique os dados e tente novamente.');
      });
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '20px', maxWidth: '400px', margin: 'auto', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h3>Cadastrar Nova Vaga</h3>
      <input 
        name="titulo" 
        placeholder="Título" 
        onChange={handleChange} 
        value={vaga.titulo} 
        required 
      />
      {}
      <input 
        name="setor" 
        placeholder="Setor" 
        onChange={handleChange} 
        value={vaga.setor} 
      />
      <input 
        name="descricao" 
        placeholder="Descricao" 
        onChange={handleChange} 
        value={vaga.descricao} 
        required 
      />
      <input 
        name="local" 
        placeholder="Local" 
        onChange={handleChange} 
        value={vaga.local} 
        required 
      />
      <input 
        name="requisitos" 
        placeholder="Requisitos" 
        onChange={handleChange} 
        value={vaga.requisitos} 
        required 
      />
      <input 
        name="salario" 
        placeholder="Salário" 
        type="number" 
        onChange={handleChange} 
        value={vaga.salario} 
      />

      <select 
        name="empresaId" 
        onChange={handleChange} 
        value={selectedEmpresaId} // Controla o valor selecionado
        required 
      >
        <option value="">Selecione a empresa</option>
        {empresas.map(emp => (
          
          <option key={emp.id} value={emp.id}>{emp.nomeFantasia}</option> 
        ))}
      </select>
      <button type="submit" style={{ padding: '10px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
        Cadastrar Vaga
      </button>
    </form>
  );
}