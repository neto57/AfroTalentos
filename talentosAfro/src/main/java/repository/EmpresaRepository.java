package repository;




import model.Empresa;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface EmpresaRepository extends JpaRepository<Empresa, Long> {
	Optional<Empresa> findByEmailAndSenha(String email, String senha);

}
