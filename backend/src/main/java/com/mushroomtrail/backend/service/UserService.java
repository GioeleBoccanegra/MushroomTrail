package com.mushroomtrail.backend.service;

import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.mushroomtrail.backend.model.User;
import com.mushroomtrail.backend.repository.UserRepository;

@Service
public class UserService {

  private final UserRepository userRepository;

  private final PasswordEncoder passwordEncoder;

  public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
  }

  public Boolean emailExists(String email) {
    return userRepository.findByEmail(email).isPresent();
  }

  public Boolean usernameExists(String username) {
    return userRepository.findByUsername(username).isPresent();
  }

  public Optional<User> getUserById(Long id) {
    return userRepository.findById(id);
  }

  public Optional<User> getUserByUsername(String username) {
    return userRepository.findByUsername(username);
  }

  public Optional<User> getUserByEmail(String email) {
    return userRepository.findByEmail(email);
  }

  public User saveUser(User user) {
    return userRepository.save(user);
  }

  public void deleteUser(Long id) {
    userRepository.deleteById(id);
  }

  // metodo di codifica della password
  public String encodePassword(String rawPassword) {
    return passwordEncoder.encode(rawPassword);
  }

  // metodo autenticazione user

  public Optional<User> authenticateUser(String email, String password) {
    Optional<User> userMail = userRepository.findByEmail(email);

    if (userMail.isPresent()) {
      User user = userMail.get();

      if (passwordEncoder.matches(password, user.getPassword())) {
        return Optional.of(user);
      }
    }
    return Optional.empty();

  }

}
