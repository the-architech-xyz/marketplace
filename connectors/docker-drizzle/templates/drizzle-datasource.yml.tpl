apiVersion: 1

datasources:
  - name: 'Drizzle PostgreSQL'
    type: 'postgres'
    access: 'proxy'
    url: drizzle-db:5432
    database: {{project.name}}_drizzle
    user: drizzle_user
    secureJsonData:
      password: drizzle_password
    jsonData:
      sslmode: 'disable'
      maxOpenConns: 100
      maxIdleConns: 100
      connMaxLifetime: 14400
