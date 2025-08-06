package com.mushroomtrail.backend.exception;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.MethodArgumentNotValidException;

@RestControllerAdvice
public class ValidationExceptionHandler {

  // Questo metodo intercetta tutte le eccezioni generate dalla validazione con
  // @Valid
  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<Map<String, String>> handleValidationExceptions(MethodArgumentNotValidException ex) {
    Map<String, String> errors = new HashMap<>();

    // Itera su tutti gli errori di campo

    ex.getBindingResult().getFieldErrors().forEach(error -> {
      String fieldName = error.getField();// campo
      String errorMessage = error.getDefaultMessage();// messaggio di errore del campo
      errors.put(fieldName, errorMessage);
    });

    // ritorno JSON con tutti gli errori
    return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
  }
}
