# Usa un'immagine JDK per build
FROM eclipse-temurin:21-jdk AS build
WORKDIR /app

# Copia il progetto
COPY . .

# Rendi eseguibile mvnw
RUN chmod +x mvnw

# Build del jar saltando i test
RUN ./mvnw clean package -DskipTests

# Immagine finale più leggera
FROM eclipse-temurin:21-jre
WORKDIR /app

# Copia il jar dalla build precedente
COPY --from=build /app/target/*.jar app.jar

# Porta di ascolto
EXPOSE 8080

# Comando di avvio
ENTRYPOINT ["java", "-jar", "app.jar"]
