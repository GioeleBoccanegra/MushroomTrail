# Usa un'immagine JDK per build
FROM eclipse-temurin:21-jdk AS build
WORKDIR /app

# Copia il progetto e crea il jar
COPY . .
RUN ./mvnw clean package -DskipTests

# Immagine finale più leggera
FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar

# Porta di ascolto
EXPOSE 8080

# Comando di avvio
ENTRYPOINT ["java", "-jar", "app.jar"]
