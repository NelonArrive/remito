FROM gradle:8.7-jdk21 AS builder

WORKDIR /app

COPY build.gradle.kts settings.gradle.kts ./
COPY gradle gradle

RUN gradle dependencies --no-daemon || true

COPY src src
RUN gradle bootJar --no-daemon -x test

# Stage 2: Run
FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

# Create user
RUN addgroup -S remito && adduser -S remito -G remito

COPY --from=builder /app/build/libs/*.jar app.jar

RUN chown remito:remito app.jar

USER remito

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]