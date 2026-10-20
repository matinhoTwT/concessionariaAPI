package com.concessionaria.api.repository;

import com.concessionaria.api.model.Projeto;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjetoRepository extends JpaRepository<Projeto, Long> {

	List<Projeto> findByTipo(String tipo);
}
