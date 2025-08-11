package com.mushroomtrail.backend.config;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.mushroomtrail.backend.service.UserService;

// Questo package contiene le classi di configurazione dell'applicazione
// Questa annotazione dice a Spring che questa classe contiene dei bean da gestire
@Configuration
public class SecurityConfig {

  private final UserService userService;
  private final JwtUtils jwtUtils;

  public SecurityConfig(@Lazy UserService userService, JwtUtils jwtUtils) {
    this.userService = userService;
    this.jwtUtils = jwtUtils;
  }

  @Bean
  public JwtAuthFilter jwtAuthFilter() {
    return new JwtAuthFilter(jwtUtils, userService);
  }

  // Questo metodo crea un bean di tipo PasswordEncoder che sarà gestito da Spring
  @Bean
  public PasswordEncoder passwordEncoder() {
    // Restituisce un'istanza di BCryptPasswordEncoder, un'implementazione sicura
    // per la cifratura delle password
    return new BCryptPasswordEncoder();
  }

  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

    http
        .csrf(csrf -> csrf.disable())// disabilitiamo CSRF perché lavoriamo con API REST
        // attiva cors personalizzato
        .cors(cors -> cors.configurationSource(CorsConfigurationSource()))
        .authorizeHttpRequests(auth -> auth

            .requestMatchers(HttpMethod.POST, "/api/users").permitAll()
            .requestMatchers(HttpMethod.POST, "/api/login").permitAll()
            .anyRequest().authenticated())
        // inseriamo il filtro prima di quello standard
        .addFilterBefore(jwtAuthFilter(), UsernamePasswordAuthenticationFilter.class)
        .formLogin(form -> form.disable())
        .httpBasic(httpBasic -> httpBasic.disable());
    return http.build();
  }

  // cross origin
  @Bean
  public CorsConfigurationSource CorsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();
    configuration.setAllowedOrigins(List.of(
        "http://localhost:5173",
        "http://192.168.1.200:5173"));

    configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));

    configuration.setAllowedHeaders(List.of("*"));
    // Permetti l'invio di cookie e credenziali (utile se li usi)
    configuration.setAllowCredentials(true);

    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();

    source.registerCorsConfiguration("/**", configuration);
    return source;

  }

}
