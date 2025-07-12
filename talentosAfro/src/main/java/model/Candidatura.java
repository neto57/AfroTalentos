package model;



import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Candidatura {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Candidato candidato;

    @ManyToOne
    private Vaga vaga;
}

