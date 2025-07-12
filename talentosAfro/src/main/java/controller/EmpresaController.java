package controller;


import model.Empresa;
import repository.EmpresaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

import dto.LoginRequest;

import java.util.List;
import java.util.Optional;
@Repository
@RestController
@RequestMapping("/empresas")
public class EmpresaController {

    @Autowired
    private EmpresaRepository empresaRepository;

    @PostMapping
    public Empresa cadastrar(@RequestBody Empresa empresa) {
        return empresaRepository.save(empresa);
    }

    @GetMapping
    public List<Empresa> listar() {
        return empresaRepository.findAll();
    }
    @PostMapping("/login")
    public ResponseEntity<?> loginEmpresa(@RequestBody LoginRequest login) {
        Optional<Empresa> empresa = empresaRepository.findByEmailAndSenha(login.getEmail(), login.getSenha());
        if (empresa.isPresent()) {
            return ResponseEntity.ok().body("Login de empresa bem-sucedido!");
        } else {
            return ResponseEntity.status(401).body("Credenciais inválidas.");
        }
    }

}
