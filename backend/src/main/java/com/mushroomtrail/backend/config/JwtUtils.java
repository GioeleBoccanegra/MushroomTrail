package com.mushroomtrail.backend.config;

import java.security.Key;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtils {

  @Value("${jwt.secret}") // Segreto JWT, letto da application.properties tramite @Value.
  private String jwtSecret;

  private final int jwtExpirationMs = 86400000;// Scadenza del token in millisecondi:

  private Key getSigningKey() {
    return Keys.hmacShaKeyFor(jwtSecret.getBytes());
  }

  // Metodo per generare un token JWT a partire dall’ID utente.
  public String generateToken(Long userId) {
    return Jwts.builder().setSubject(userId.toString())// il subject del token è l'id dell'utente (come stringa)
        .setIssuedAt(new Date())// data di emissione
        .setExpiration(new Date(System.currentTimeMillis() + jwtExpirationMs)) // data di scadenza
        .signWith(getSigningKey(), SignatureAlgorithm.HS256)// firma con algoritmo HS256 e chiave segreta
        .compact();// crea il token come stringa
  }

  // Metodo per estrarre l'ID utente dal token ricevuto
  public Long getUserIdFromJwtToken(String token) {
    String idStr = Jwts.parserBuilder()
        .setSigningKey(getSigningKey())
        .build()// stessa chiave usata per firmare
        .parseClaimsJws(token)// analizza il token (e lo valida)
        .getBody().getSubject();// prende il "subject", cioè l'id dell'utente

    return Long.parseLong((idStr));
  }

  // Metodo per verificare che un token JWT sia valido
  public boolean validateJwtToken(String token) {
    try {
      Jwts.parserBuilder()
          .setSigningKey(getSigningKey())
          .build()
          .parseClaimsJws(token);// se va tutto bene, è valido
      return true;
    } catch (Exception e) {
      return false;
    }
  }

}
