package repository;



import model.Candidato;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CandidatoRepository extends JpaRepository<Candidato, Long> {
	Optional<Candidato> findByEmailAndSenha(String email, String senha);
}


