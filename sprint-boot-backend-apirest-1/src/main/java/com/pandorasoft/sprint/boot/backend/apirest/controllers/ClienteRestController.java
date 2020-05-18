package com.pandorasoft.sprint.boot.backend.apirest.controllers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pandorasoft.sprint.boot.backend.apirest.models.entity.Cliente;
import com.pandorasoft.sprint.boot.backend.apirest.models.services.IClienteService;

@CrossOrigin(origins = {"http://localhost:4200"}) 
@RestController
@RequestMapping("/api")
public class ClienteRestController {
	@Autowired
	private IClienteService clienteService;
	
	@GetMapping("/clientes")
	public List<Cliente> index(){
		return clienteService.findAll();
	}
	
	@GetMapping("/clientes/{id}")
	public ResponseEntity<?> show(@PathVariable Long id) {
		
		Cliente cliente = null;
		Map<String, Object> response = new HashMap<>();
		
		try {
			cliente = clienteService.findById(id);
		}catch(DataAccessException e) {
			response.put("message", "Failed to query client from database!");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR );
		}
		
		if ( cliente == null ) {
			response.put("message", "The client with ID ".concat(id.toString().concat(" does not exist in the database")));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND );
		}
		return new ResponseEntity<Cliente>(cliente, HttpStatus.OK );
	}
	
	@PostMapping("/clientes")
	public ResponseEntity<?> create(@Valid @RequestBody Cliente cliente, BindingResult result) {
		
		Cliente clienteNew = null;
		Map<String, Object> response = new HashMap<>();
		
		/*Validamos si llegan los datos con errores*/
		if ( result.hasErrors() ) {
			List<String> errors = result.getFieldErrors()
					.stream()
					.map(err -> "Field '" + err.getField() + "' " + err.getDefaultMessage())
					.collect( Collectors.toList() );
			
			response.put("errors", errors);
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST );
		}
		
		try {
			clienteNew = clienteService.save(cliente);
		}catch(DataAccessException e) {
			response.put("message", "Failed to create client from database!");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR );
		}
		
		response.put("message", "The client has saved sussefuly!.");
		response.put("dataResponse", clienteNew);
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED );
	}
	
	// Ésta anotación es para eliminar un warning que genera eclipse
	@SuppressWarnings("unused")
	@PutMapping("/clientes/{id}")
	public ResponseEntity<?> update(@RequestBody Cliente cliente, @PathVariable Long id) {
		
		Cliente clienteActual =clienteService.findById(id);
		Cliente ClienteUpdate = null;
		
		Map<String, Object> response = new HashMap<>();
		
		if ( clienteActual == null ) {
			response.put("message", "The client with ID ".concat(id.toString().concat(" does not exist in the database")));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND );
		}
		
		try {
			clienteActual.setName( cliente.getName() );
			clienteActual.setLastname( cliente.getLastname() );
			clienteActual.setEmail( cliente.getEmail() );
			
			// Methods <Save> is used for update and save
			ClienteUpdate = clienteService.save( clienteActual );
		}catch(DataAccessException e) {
			response.put("message", "Failed to update client from database!");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR );
		}
		
		response.put("message", "The client has been updated sussefuly!.");
		response.put("dataResponse", clienteActual);
		
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED );
	}
	
	@DeleteMapping("/clientes/{id}")
	public ResponseEntity<?> delete(@PathVariable Long id) {
		
		Map<String, Object> response = new HashMap<>();
		
		try {
			clienteService.delete(id);
		}catch(DataAccessException e) {
			response.put("message", "Failed to delete client from database!");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR );
		}
		
		response.put("message", "The client has been deleted sussefuly!.");
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK );
	}
}
