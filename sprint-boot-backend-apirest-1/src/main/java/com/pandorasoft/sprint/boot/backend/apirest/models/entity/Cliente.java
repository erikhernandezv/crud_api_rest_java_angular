package com.pandorasoft.sprint.boot.backend.apirest.models.entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.PrePersist;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

@Entity
@Table(name="clientes")
public class Cliente implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	private Long id;
	
	@NotEmpty(message = "no puede ser vacío")
	@Size(min=4, max=60, message = "el tamaño tiene que estar entre 4 y 60 caracteres.")
	@Column(nullable = false)
	private String name;
	
	@NotEmpty(message = "no puede ser vacío")
	@Size(min=4, max=60, message = "el tamaño tiene que estar entre 4 y 60 caracteres.")
	@Column(nullable = false)
	private String lastname;
	
	@NotEmpty(message = "no puede ser vacío")
	@Email(message = "ingrese un correo electronico valido")
	@Column(nullable = false, unique=true)
	private String email;
	
	@Column(name="created_at")
	@Temporal(TemporalType.TIMESTAMP)
	private Date createAt;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getLastname() {
		return lastname;
	}

	public void setLastname(String lastname) {
		this.lastname = lastname;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Date getCreateAt() {
		return createAt;
	}

	public void setCreateAt(Date date) {
		this.createAt = date;
	}
	
	// Before persisting the data, create the data
	@PrePersist
	public void prePersist() {
		this.setCreateAt(new Date());
	}

}
