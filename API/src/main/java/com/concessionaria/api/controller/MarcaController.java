package com.concessionaria.api.controller;

import com.concessionaria.api.dto.MarcaDTO;
import com.concessionaria.api.model.Carro;
import com.concessionaria.api.repository.CarroRepository;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import java.util.stream.Collectors;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/marcas")
public class MarcaController {

	private final CarroRepository repository;

	public MarcaController(CarroRepository repository) {
		this.repository = repository;
	}

	@GetMapping
	public List<MarcaDTO> listar() {
		Map<String, Long> contagem = repository.findAll().stream()
				.collect(Collectors.groupingBy(Carro::getMarca, TreeMap::new, Collectors.counting()));

		return contagem.entrySet().stream()
				.map(e -> new MarcaDTO(e.getKey(), e.getValue()))
				.toList();
	}
}
