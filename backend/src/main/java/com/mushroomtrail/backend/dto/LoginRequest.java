package com.mushroomtrail.backend.dto;

public class LoginRequest {
  private String email;
  private String password;

  public LoginRequest(String email, String password) {
    this.email = email;
    this.password = password;
  }

  // getters e setters

  public String getEmail() {
    return email;
  }

  public String getPassword() {
    return password;
  }

}
