import { Blueprint } from '@thearchitech.xyz/types';

const dockerDrizzleIntegrationBlueprint: Blueprint = {
  id: 'docker-drizzle-integration',
  name: 'Docker Drizzle Integration',
  description: 'Complete Docker containerization for Drizzle ORM with database services, migrations, and production-ready configuration',
  version: '1.0.0',
  actions: [
    // Create Docker Compose Files
    {
      type: 'CREATE_FILE',
      path: 'docker-compose.database.yml',
      template: 'templates/docker-compose.database.yml.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'docker-compose.migration.yml',
      template: 'templates/docker-compose.migration.yml.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'docker-compose.backup.yml',
      template: 'templates/docker-compose.backup.yml.tpl'
    },
    // Create Database Dockerfiles
    {
      type: 'CREATE_FILE',
      path: 'database/Dockerfile.postgres',
      template: 'templates/Dockerfile.postgres.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'database/Dockerfile.migration',
      template: 'templates/Dockerfile.migration.tpl'
    },
    // Create Database Scripts
    {
      type: 'CREATE_FILE',
      path: 'database/init.sql',
      template: 'templates/init.sql.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'database/seed.sql',
      template: 'templates/seed.sql.tpl'
    },
    // Create Migration Files
    {
      type: 'CREATE_FILE',
      path: 'database/migrations/001_initial.sql',
      template: 'templates/001_initial.sql.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'database/migrations/002_add_indexes.sql',
      template: 'templates/002_add_indexes.sql.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'database/migrations/003_add_constraints.sql',
      template: 'templates/003_add_constraints.sql.tpl'
    },
    // Create Database Management Scripts
    {
      type: 'CREATE_FILE',
      path: 'scripts/db-setup.sh',
      template: 'templates/db-setup.sh.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'scripts/db-migrate.sh',
      template: 'templates/db-migrate.sh.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'scripts/db-seed.sh', 
      template: 'templates/db-seed.sh.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'scripts/db-backup.sh',
      template: 'templates/db-backup.sh.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'scripts/db-restore.sh',
      template: 'templates/db-restore.sh.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'scripts/db-reset.sh',
      template: 'templates/db-reset.sh.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'scripts/db-health.sh',
      template: 'templates/db-health.sh.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'scripts/db-shell.sh',
      template: 'templates/db-shell.sh.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'scripts/db-logs.sh',
      template: 'templates/db-logs.sh.tpl'
    },
    // Create Monitoring Configuration
    {
      type: 'CREATE_FILE',
      path: 'monitoring/database/prometheus.yml',
      template: 'templates/prometheus.yml.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'monitoring/database/grafana/dashboards/postgres.json',
      template: 'templates/postgres.json.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'monitoring/database/grafana/provisioning/dashboards/dashboard.yml',
      template: 'templates/dashboard.yml.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'monitoring/database/grafana/provisioning/datasources/postgres.yml',
      template: 'templates/postgres.yml.tpl'
    },
    // Create Backup Scripts
    {
      type: 'CREATE_FILE',
      path: 'backup/backup.sh',
      template: 'templates/backup.sh.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'backup/restore.sh',
      template: 'templates/restore.sh.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'backup/cleanup.sh',
      template: 'templates/cleanup.sh.tpl'
    },
    // Add Database Scripts to package.json
    {
      type: 'ENHANCE_FILE',
      path: 'package.json',
      modifier: 'package-json-merger',
      params: {
        scriptsToAdd: {
          'db:setup': 'bash scripts/db-setup.sh',
          'db:migrate': 'bash scripts/db-migrate.sh',
          'db:seed': 'bash scripts/db-seed.sh',
          'db:backup': 'bash scripts/db-backup.sh',
          'db:restore': 'bash scripts/db-restore.sh',
          'db:reset': 'bash scripts/db-reset.sh',
          'db:health': 'bash scripts/db-health.sh',
          'db:shell': 'bash scripts/db-shell.sh',
          'db:logs': 'bash scripts/db-logs.sh',
          'docker:db:up': 'docker-compose -f docker-compose.database.yml up -d',
          'docker:db:down': 'docker-compose -f docker-compose.database.yml down',
          'docker:db:logs': 'docker-compose -f docker-compose.database.yml logs -f',
          'docker:migrate:up': 'docker-compose -f docker-compose.migration.yml up',
          'docker:backup:up': 'docker-compose -f docker-compose.backup.yml up'
        }
      }
    },
    // Add Environment Variables
    {
      type: 'ADD_ENV_VAR',
      key: 'POSTGRES_DB',
      value: 'myapp',
      description: 'PostgreSQL database name'
    },
    {
      type: 'ADD_ENV_VAR',
      key: 'POSTGRES_USER',
      value: 'postgres',
      description: 'PostgreSQL username'
    },
    {
      type: 'ADD_ENV_VAR',
      key: 'POSTGRES_PASSWORD',
      value: 'postgres',
      description: 'PostgreSQL password'
    },
    {
      type: 'ADD_ENV_VAR',
      key: 'DATABASE_URL',
      value: 'postgresql://postgres:postgres@localhost:5432/myapp',
      description: 'Database connection URL'
    }
  ]
};

export default dockerDrizzleIntegrationBlueprint;