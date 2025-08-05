package com.mushroomtrail.backend.dto;

public class UserResponseDto {
  private Long id;
  private String username;
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
