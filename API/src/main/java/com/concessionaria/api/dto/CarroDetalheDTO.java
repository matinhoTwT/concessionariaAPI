package com.concessionaria.api.dto;

import com.concessionaria.api.model.Carro;
import java.util.Arrays;
import java.util.List;

public record CarroDetalheDTO(
		Long id,
		String categoria,
		String marca,
		String modelo,
		Integer ano,
		String motor,
		String potencia,
		Integer preco,
		Boolean destaque,
		List<String> itens,
		String foto,
		CreditoDTO credito) {

	public static CarroDetalheDTO de(Carro c) {
		return new CarroDetalheDTO(c.getId(), c.getCategoria(), c.getMarca(), c.getModelo(), c.getAno(),
				c.getMotor(), c.getPotencia(), c.getPreco(), c.getDestaque(),
				Arrays.asList(c.getItens().split(";")), c.getFoto(),
				new CreditoDTO(c.getCreditoAutor(), c.getCreditoLicenca(), c.getCreditoLink()));
	}
}
