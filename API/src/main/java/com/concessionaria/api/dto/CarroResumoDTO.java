package com.concessionaria.api.dto;

import com.concessionaria.api.model.Carro;

public record CarroResumoDTO(
		Long id,
		String categoria,
		String marca,
		String modelo,
		Integer ano,
		String potencia,
		Integer preco,
		String foto,
		Boolean destaque) {

	public static CarroResumoDTO de(Carro c) {
		return new CarroResumoDTO(c.getId(), c.getCategoria(), c.getMarca(), c.getModelo(), c.getAno(),
				c.getPotencia(), c.getPreco(), c.getFoto(), c.getDestaque());
	}
}
