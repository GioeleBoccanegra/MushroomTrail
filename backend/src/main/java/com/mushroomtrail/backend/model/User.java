package com.mushroomtrail.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity

@Table(name = "users")
public class User {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY) // autoincrement
  private Long id;

  @NotBlank(message = "nomeutente obbligatorio")
  @Size(min = 3, max = 20, message = "L'username deve avere tra i 3 e i 20 caratteri")
  @Column(nullable = false, unique = true)
  private String username;

  @NotBlank(message = "la mail è obbligatoria")
  @Email(message = "la mail non è valida")
  @Column(nullable = false, unique = true)
  private String email;

  @NotBlank(message = "la password è obbligatoria")
  @Size(min = 8, message = "la password essere lunga almeno 8 caratteri")
  @Column(nullable = false)
  private String password;

  public User() {

  }

  public User(String username, String email, String password) {
    this.username = username;
    this.email = email;
    this.password = password;
  }

  // getter e setters

  public Long getId() {
    return id;
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

}
