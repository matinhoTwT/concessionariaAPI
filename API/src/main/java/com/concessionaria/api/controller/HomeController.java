package com.concessionaria.api.controller;

import java.util.List;
import java.util.Map;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

	@GetMapping("/")
	public Map<String, Object> inicio() {
		return Map.of(
				"nome", "Low & Track Garage API",
				"versao", "1.0.0",
				"swagger", "/swagger-ui.html",
				"endpoints", List.of(
						"GET /carros",
						"GET /carros?categoria=stance|track|classico&marca=Volkswagen&busca=golf&destaque=true",
						"GET /carros/{id}",
						"GET /marcas",
						"GET /projetos",
						"GET /projetos?tipo=stance|classico",
						"GET /projetos/{id}"));
	}
}
