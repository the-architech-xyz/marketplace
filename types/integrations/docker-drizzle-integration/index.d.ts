/**
 * Docker Drizzle Integration
 * 
 * Complete Docker containerization for Drizzle ORM with database services, migrations, and production-ready configuration
 */

export interface DockerDrizzleIntegrationParams {

  /** PostgreSQL database service with Docker */
  postgresService: boolean;

  /** Drizzle migration service with Docker */
  migrationService: boolean;

  /** Database backup and restore service */
  backupService: boolean;

  /** Database monitoring with Prometheus and Grafana */
  monitoringService: boolean;

  /** Database seeding with sample data */
  seedData: boolean;

  /** SSL/TLS encryption for database connections */
  sslSupport: boolean;

  /** Database replication setup */
  replication: boolean;

  /** Database clustering configuration */
  clustering: boolean;

  /** Database performance optimization */
  performanceTuning: boolean;

  /** Database security hardening and best practices */
  securityHardening: boolean;

  /** Docker volumes for database persistence */
  volumeManagement: boolean;

  /** Database networking and service discovery */
  networking: boolean;
}

// 🚀 Auto-discovered artifacts with ownership info
export declare const DockerDrizzleIntegrationArtifacts: {
  creates: [
    'docker-compose.database.yml',
    'docker-compose.migration.yml',
    'docker-compose.backup.yml',
    'database/Dockerfile.postgres',
    'database/Dockerfile.migration',
    'database/init.sql',
    'database/seed.sql',
    'database/migrations/001_initial.sql',
    'database/migrations/002_add_indexes.sql',
    'database/migrations/003_add_constraints.sql',
    'scripts/db-setup.sh',
    'scripts/db-migrate.sh',
    'scripts/db-seed.sh',
    'scripts/db-backup.sh',
    'scripts/db-restore.sh',
    'scripts/db-reset.sh',
    'scripts/db-health.sh',
    'scripts/db-shell.sh',
    'scripts/db-logs.sh',
    'monitoring/database/prometheus.yml',
    'monitoring/database/grafana/dashboards/postgres.json',
    'monitoring/database/grafana/provisioning/dashboards/dashboard.yml',
    'monitoring/database/grafana/provisioning/datasources/postgres.yml',
    'backup/backup.sh',
    'backup/restore.sh',
    'backup/cleanup.sh'
  ],
  enhances: [
    { path: 'package.json' }
  ],
  installs: [],
  envVars: [
    { key: 'POSTGRES_DB', value: 'myapp', description: 'PostgreSQL database name' },
    { key: 'POSTGRES_USER', value: 'postgres', description: 'PostgreSQL username' },
    { key: 'POSTGRES_PASSWORD', value: 'postgres', description: 'PostgreSQL password' },
    { key: 'DATABASE_URL', value: 'postgresql://postgres:postgres@localhost:5432/myapp', description: 'Database connection URL' }
  ]
};

// Type-safe artifact access
export type DockerDrizzleIntegrationCreates = typeof DockerDrizzleIntegrationArtifacts.creates[number];
export type DockerDrizzleIntegrationEnhances = typeof DockerDrizzleIntegrationArtifacts.enhances[number];
