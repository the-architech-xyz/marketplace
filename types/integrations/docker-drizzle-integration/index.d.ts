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
    'docker-compose.drizzle.yml',
    'database/Dockerfile.postgres',
    'database/Dockerfile.migration',
    'database/drizzle-init.sql',
    'database/drizzle-seed.sql',
    'database/drizzle-migrations/001_initial.sql',
    'database/drizzle-migrations/002_add_indexes.sql',
    'database/drizzle-migrations/003_add_constraints.sql',
    'scripts/drizzle-setup.sh',
    'scripts/drizzle-migrate.sh',
    'scripts/drizzle-seed.sh',
    'scripts/drizzle-backup.sh',
    'scripts/drizzle-restore.sh',
    'scripts/drizzle-reset.sh',
    'scripts/drizzle-health.sh',
    'scripts/drizzle-shell.sh',
    'scripts/drizzle-logs.sh',
    'monitoring/drizzle/prometheus.yml',
    'monitoring/drizzle/grafana/dashboards/drizzle.json',
    'monitoring/drizzle/grafana/provisioning/dashboards/dashboard.yml',
    'monitoring/drizzle/grafana/provisioning/datasources/drizzle.yml',
    'backup/drizzle-backup.sh',
    'backup/drizzle-restore.sh',
    'backup/drizzle-cleanup.sh'
  ],
  enhances: [
    { path: 'docker-compose.yml' },
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
