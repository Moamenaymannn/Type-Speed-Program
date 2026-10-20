# ==========================================
# Multi-stage Dockerfile for Type Speed Program
# Stage 1: Build Angular Frontend
# Stage 2: Build Spring Boot Backend with embedded static frontend
# Stage 3: Lightweight JRE runtime
# ==========================================

# ----- Stage 1: Frontend Build -----
FROM node:18-alpine AS frontend-builder
WORKDIR /app/frontend

COPY frontend/package*.json ./
RUN npm install

COPY frontend/ ./
RUN npm run build

# ----- Stage 2: Backend Build -----
FROM maven:3.8.8-eclipse-temurin-17-alpine AS backend-builder
WORKDIR /app/backend

COPY backend/pom.xml ./
RUN mvn dependency:go-offline -B

COPY backend/src ./src

# Copy compiled Angular assets into Spring Boot's static resources
COPY --from=frontend-builder /app/frontend/dist/type-speed-frontend/ ./src/main/resources/static/

RUN mvn clean package -DskipTests -B

# ----- Stage 3: Production Runtime -----
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Add non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

COPY --from=backend-builder /app/backend/target/type-speed-backend-1.0.0.jar app.jar

ENV PORT=8080
EXPOSE 8080

ENTRYPOINT ["java", "-Djava.security.egd=file:/dev/./urandom", "-jar", "app.jar"]
