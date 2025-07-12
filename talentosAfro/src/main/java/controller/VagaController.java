package controller;


import model.Vaga;
import repository.VagaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/vagas")
public class VagaController {

    @Autowired
    private VagaRepository vagaRepository;

    @PostMapping
    public Vaga cadastrar(@RequestBody Vaga vaga) {
        return vagaRepository.save(vaga);
    }

    @GetMapping
    public List<Vaga> listar() {
        return vagaRepository.findAll();
    }
}

