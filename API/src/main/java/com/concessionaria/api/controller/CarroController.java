package com.concessionaria.api.controller;

import com.concessionaria.api.dto.CarroDetalheDTO;
import com.concessionaria.api.dto.CarroResumoDTO;
import com.concessionaria.api.repository.CarroRepository;
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
@RequestMapping("/carros")
public class CarroController {

	private final CarroRepository repository;

	public CarroController(CarroRepository repository) {
		this.repository = repository;
	}

	@GetMapping
	public List<CarroResumoDTO> listar(
			@RequestParam(required = false) String categoria,
			@RequestParam(required = false) String marca,
			@RequestParam(required = false) String busca,
			@RequestParam(required = false) Boolean destaque) {

		return repository.findAll().stream()
				.filter(c -> categoria == null || categoria.isBlank() || c.getCategoria().equals(categoria))
				.filter(c -> marca == null || marca.isBlank() || c.getMarca().equalsIgnoreCase(marca))
				.filter(c -> destaque == null || !destaque || c.getDestaque())
				.filter(c -> busca == null || busca.isBlank()
						|| (c.getMarca() + " " + c.getModelo()).toLowerCase().contains(busca.toLowerCase()))
				.sorted(Comparator.comparing(c -> c.getId()))
				.map(CarroResumoDTO::de)
				.toList();
	}

	@GetMapping("/{id}")
	public ResponseEntity<?> buscarPorId(@PathVariable Long id) {
		return repository.findById(id)
				.<ResponseEntity<?>>map(c -> ResponseEntity.ok(CarroDetalheDTO.de(c)))
				.orElseGet(() -> ResponseEntity.status(404).body(Map.of("erro", "Carro não encontrado")));
	}
}
