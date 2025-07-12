package model;



import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Data
public class Candidato {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String cpf;
    private String nome;
    private String email;
    private String senha;
    private LocalDate dataNascimento;
}
