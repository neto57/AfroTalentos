//package controller;
package com.example.talentosAfro.repository;


import model.Candidato;
import repository.CandidatoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import dto.LoginRequest;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/candidatos")
public class CandidatoController {
	

    @Autowired
    private CandidatoRepository candidatoRepository;

    @PostMapping
    public Candidato cadastrar(@RequestBody Candidato candidato) {
        return candidatoRepository.save(candidato);
    }

    @GetMapping
    public List<Candidato> listar() {
        return candidatoRepository.findAll();
    }
    @PostMapping("/login")
    public ResponseEntity<?> loginCandidato(@RequestBody LoginRequest login) {
        Optional<Candidato> candidato = candidatoRepository.findByEmailAndSenha(login.getEmail(), login.getSenha());
        if (candidato.isPresent()) {
            return ResponseEntity.ok().body("Login de candidato bem-sucedido!");
        } else {
            return ResponseEntity.status(401).body("Credenciais inválidas.");
        }
    }

    
}

