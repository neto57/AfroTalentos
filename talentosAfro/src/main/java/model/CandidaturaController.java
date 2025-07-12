package model;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import repository.CandidaturaRepository;

import java.util.List;

@RestController
@RequestMapping("/candidaturas")
public class CandidaturaController {

    @Autowired
    private CandidaturaRepository candidaturaRepository;

    @PostMapping
    public Candidatura candidatar(@RequestBody Candidatura candidatura) {
        return candidaturaRepository.save(candidatura);
    }

    @GetMapping
    public List<Candidatura> listar() {
        return candidaturaRepository.findAll();
    }
}
