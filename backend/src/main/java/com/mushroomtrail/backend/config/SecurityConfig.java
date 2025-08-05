package com.mushroomtrail.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

// Questo package contiene le classi di configurazione dell'applicazione
// Questa annotazione dice a Spring che questa classe contiene dei bean da gestire
@Configuration
public class SecurityConfig {

  // Questo metodo crea un bean di tipo PasswordEncoder che sarà gestito da Spring
  @Bean
  public PasswordEncoder passwordEncoder() {
    // Restituisce un'istanza di BCryptPasswordEncoder, un'implementazione sicura
    // per la cifratura delle password
    return new BCryptPasswordEncoder();
  }

  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http.csrf(csrf -> csrf.disable())
        .authorizeHttpRequests(auth -> auth
            .requestMatchers("/api/users").permitAll()
            .anyRequest().authenticated())
        .httpBasic(Customizer.withDefaults());
    return http.build();
  }

}

/*
 * Un bean è un oggetto gestito dal contenitore di Spring.
 * 
 * In pratica, quando scrivi una classe e dici a Spring:
 * 
 * "Gestiscilo tu, crealo tu, dammelo tu quando serve"
 * 
 * … allora quello è un bean.
 */
