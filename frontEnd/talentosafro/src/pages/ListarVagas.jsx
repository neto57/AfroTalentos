import { useEffect, useState } from "react";
import axios from "axios";

function ListarVagas() {
  const [vagas, setVagas] = useState([]);
  const idCandidato = localStorage.getItem("idCandidato");

  useEffect(() => {
    axios.get("http://localhost:8080/vagas")
      .then(response => setVagas(response.data))
      .catch(error => console.error("Erro ao buscar vagas:", error));
  }, []);

  const candidatar = (idVaga) => {
    axios.post(`http://localhost:8080/candidaturas?idCandidato=${idCandidato}&idVaga=${idVaga}`)
      .then(() => alert("Candidatura enviada com sucesso!"))
      .catch(() => alert("Erro ao enviar candidatura."));
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Vagas Disponíveis</h2>
      {vagas.length === 0 ? (
        <p>Nenhuma vaga disponível no momento.</p>
      ) : (
        <div  className="row"> 
          {vagas.map((vaga) => (
            <div className="col-md-6 mb-4" key={vaga.id}>
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{vaga.titulo}</h5>
                  <p className="card-text">{vaga.descricao}</p>
                  <p><strong>Local:</strong> {vaga.local}</p>
                  <p><strong>Requisitos:</strong> {vaga.requisitos}</p>
                  <button className="btn btn-primary" onClick={() => candidatar(vaga.id)}>
                    Candidatar-se
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ListarVagas;
