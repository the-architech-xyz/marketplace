version: '3.8'

services:
  # Drizzle-specific database service
  drizzle-db:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: {{project.name}}_drizzle
      POSTGRES_USER: drizzle_user
      POSTGRES_PASSWORD: drizzle_password
    ports:
      - "5433:5432"
    volumes:
      - drizzle_data:/var/lib/postgresql/data
      - ./database/drizzle-init.sql:/docker-entrypoint-initdb.d/init.sql
    restart: unless-stopped
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U drizzle_user -d {{project.name}}_drizzle"]
      interval: 10s
      timeout: 5s
      retries: 5

  # Drizzle migration service
  drizzle-migrate:
    build:
      context: .
      dockerfile: database/Dockerfile.migration
    depends_on:
      drizzle-db:
        condition: service_healthy
    environment:
      DATABASE_URL: postgresql://drizzle_user:drizzle_password@drizzle-db:5432/{{project.name}}_drizzle
    volumes:
      - ./database/drizzle-migrations:/migrations
    command: ["drizzle-kit", "migrate"]

volumes:
  drizzle_data:
