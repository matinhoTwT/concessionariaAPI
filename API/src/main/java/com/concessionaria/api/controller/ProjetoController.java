package com.concessionaria.api.controller;

import com.concessionaria.api.dto.ProjetoDTO;
import com.concessionaria.api.model.Projeto;
import com.concessionaria.api.repository.ProjetoRepository;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/projetos")
public class ProjetoController {

	private final ProjetoRepository repository;

	public ProjetoController(ProjetoRepository repository) {
		this.repository = repository;
	}

	@GetMapping
	public List<ProjetoDTO> listar(@RequestParam(required = false) String tipo) {
		List<Projeto> projetos = (tipo == null || tipo.isBlank())
				? repository.findAll()
				: repository.findByTipo(tipo);

		return projetos.stream()
				.sorted(Comparator.comparing(p -> p.getId()))
				.map(ProjetoDTO::de)
				.toList();
	}

	@GetMapping("/{id}")
	public ResponseEntity<?> buscarPorId(@PathVariable Long id) {
		return repository.findById(id)
				.<ResponseEntity<?>>map(p -> ResponseEntity.ok(ProjetoDTO.de(p)))
				.orElseGet(() -> ResponseEntity.status(404).body(Map.of("erro", "Projeto não encontrado")));
	}
}
