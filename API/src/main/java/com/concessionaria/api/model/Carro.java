package com.concessionaria.api.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "carros")
public class Carro {

	@Id
	private Long id;

	private String categoria;
	private String marca;
	private String modelo;
	private Integer ano;
	private String motor;
	private String potencia;
	private Integer preco;
	private Boolean destaque;

	@Column(length = 1000)
	private String itens;

	@Column(length = 500)
	private String foto;

	private String creditoAutor;
	private String creditoLicenca;

	@Column(length = 500)
	private String creditoLink;

	protected Carro() {
	}

	public Long getId() { return id; }
	public String getCategoria() { return categoria; }
	public String getMarca() { return marca; }
	public String getModelo() { return modelo; }
	public Integer getAno() { return ano; }
	public String getMotor() { return motor; }
	public String getPotencia() { return potencia; }
	public Integer getPreco() { return preco; }
	public Boolean getDestaque() { return destaque; }
	public String getItens() { return itens; }
	public String getFoto() { return foto; }
	public String getCreditoAutor() { return creditoAutor; }
	public String getCreditoLicenca() { return creditoLicenca; }
	public String getCreditoLink() { return creditoLink; }
}
