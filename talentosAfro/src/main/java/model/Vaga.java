package model;



import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Vaga {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String titulo;
    private String setor;
    private Double salario;

    @ManyToOne
    private Empresa empresa;
}
