package com.mushroomtrail.backend.config;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.mushroomtrail.backend.service.UserService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {
  // OncePerRequestFilter: assicura che il filtro venga eseguito una sola volta
  // per ogni richiesta HTTP, evitando duplicazioni.

  // Inietta automaticamente le dipendenze JwtUtils (per gestire il token) e
  // UserService (per ottenere l'utente dal DB dato un ID).
  @Autowired
  private JwtUtils jwtUtils;

  @Autowired
  private UserService userService;

  // aggiungo lazy per ritardare l'esecuzione così che non si crei un ciclo di
  // diepndenza tra i bean

  public JwtAuthFilter(@Lazy JwtUtils jwtUtils, @Lazy UserService userService) {
    this.jwtUtils = jwtUtils;
    this.userService = userService;
  }

  @Override
  protected void doFilterInternal(HttpServletRequest request,
      HttpServletResponse response,
      FilterChain filterChain)
      throws ServletException, IOException {

    String authHeader = request.getHeader("Authorization"); // Estrae l’header "Authorization" dalla richiesta HTTP

    // Verifica che l’header esista e che segua il formato standard "Bearer
    if (authHeader != null && authHeader.startsWith("Bearer")) {
      String token = authHeader.substring(7);// rimuove "Bearer"

      if (!jwtUtils.validateJwtToken(token)) {// token non validato

        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);

        response.getWriter().write("token non valido o scaduto, rieffettuare l'accesso");
        return;
      }

      Long id = jwtUtils.getUserIdFromJwtToken(token);// estrae id

      userService.getUserById(id).ifPresent(user -> {
        // Crea un oggetto di autenticazione contenente l’utente (senza credenziali e
        // senza ruoli, che sono opzionali).
        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(user, null,
            List.of());
        // Aggiunge dettagli alla richiesta corrente (es. indirizzo IP, user-agent)
        authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
        // Imposta l’utente come autenticato nel contesto di sicurezza di Spring,
        // permettendo l’accesso a risorse protette.
        SecurityContextHolder.getContext().setAuthentication(authentication);

      });
    }
    // Passa la richiesta al filtro successivo nella catena. Se l’autenticazione è
    // andata bene, l’utente è già autenticato.
    filterChain.doFilter(request, response);
  }

}
