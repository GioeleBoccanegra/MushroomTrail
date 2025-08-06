package com.mushroomtrail.backend.dto;

import jakarta.persistence.Column;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class UserResponseDto {
  @Column(nullable = false, unique = true)
  private Long id;

  @NotBlank(message = "nomeutente obbligatorio")
  @Size(min = 3, max = 20, message = "L'username deve avere tra i 3 e i 20 caratteri")
  @Column(nullable = false, unique = true)
  private String username;

  @NotBlank(message = "la mail è obbligatoria")
  @Email(message = "la mail non è valida")
  @Column(nullable = false, unique = true)
  private String email;

  public UserResponseDto(Long id, String username, String email) {
    this.id = id;
    this.username = username;
    this.email = email;
  }

  // getters e setters

  public String getUsername() {
    return username;
  }

  public Long getId() {
    return id;
  }

  public String getEmail() {
    return email;
  }

}
