package com.concessionaria.api.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "projetos")
public class Projeto {

	@Id
	private Long id;

	private String tipo;
	private String nome;
	private String estilo;

	@Column(length = 1000)
	private String descricao;

	private String spec1Label;
	private String spec1Valor;
	private String spec2Label;
	private String spec2Valor;

	@Column(length = 1000)
	private String modificacoes;

	@Column(length = 500)
	private String foto;

	private String creditoAutor;
	private String creditoLicenca;

	@Column(length = 500)
	private String creditoLink;

	protected Projeto() {
	}

	public Long getId() { return id; }
	public String getTipo() { return tipo; }
	public String getNome() { return nome; }
	public String getEstilo() { return estilo; }
	public String getDescricao() { return descricao; }
	public String getSpec1Label() { return spec1Label; }
	public String getSpec1Valor() { return spec1Valor; }
	public String getSpec2Label() { return spec2Label; }
	public String getSpec2Valor() { return spec2Valor; }
	public String getModificacoes() { return modificacoes; }
	public String getFoto() { return foto; }
	public String getCreditoAutor() { return creditoAutor; }
	public String getCreditoLicenca() { return creditoLicenca; }
	public String getCreditoLink() { return creditoLink; }
}
