package com.concessionaria.api.dto;

import com.concessionaria.api.model.Projeto;
import java.util.Arrays;
import java.util.List;

public record ProjetoDTO(
		Long id,
		String tipo,
		String nome,
		String estilo,
		String descricao,
		List<SpecDTO> specs,
		List<String> modificacoes,
		String foto,
		CreditoDTO credito) {

	public static ProjetoDTO de(Projeto p) {
		return new ProjetoDTO(p.getId(), p.getTipo(), p.getNome(), p.getEstilo(), p.getDescricao(),
				List.of(new SpecDTO(p.getSpec1Label(), p.getSpec1Valor()),
						new SpecDTO(p.getSpec2Label(), p.getSpec2Valor())),
				Arrays.asList(p.getModificacoes().split(";")), p.getFoto(),
				new CreditoDTO(p.getCreditoAutor(), p.getCreditoLicenca(), p.getCreditoLink()));
	}
}
