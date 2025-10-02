import { Blueprint } from '@thearchitech.xyz/types';

const dockerDrizzleIntegrationBlueprint: Blueprint = {
  id: 'docker-drizzle-integration',
  name: 'Docker Drizzle Integration',
  description: 'Complete Docker containerization for Drizzle ORM with database services, migrations, and production-ready configuration',
  version: '1.0.0',
  actions: [
    // Create Drizzle-specific Docker Compose Files (enhance existing docker-compose.yml)
    {
      type: 'ENHANCE_FILE',
      path: 'docker-compose.yml',
      modifier: 'yaml-merger',
      params: {
        mergePath: 'templates/docker-compose.drizzle.yml.tpl'
      }
    },
    {
      type: 'CREATE_FILE',
      path: 'docker-compose.drizzle.yml',
      template: 'templates/docker-compose.drizzle.yml.tpl'
    },
    // Create Database-specific Dockerfiles
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
    // Create Drizzle-specific Database Scripts
    {
      type: 'CREATE_FILE',
      path: 'database/drizzle-init.sql',
      template: 'templates/drizzle-init.sql.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'database/drizzle-seed.sql',
      template: 'templates/drizzle-seed.sql.tpl'
    },
    // Create Drizzle Migration Files
    {
      type: 'CREATE_FILE',
      path: 'database/drizzle-migrations/001_initial.sql',
      template: 'templates/001_initial.sql.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'database/drizzle-migrations/002_add_indexes.sql',
      template: 'templates/002_add_indexes.sql.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'database/drizzle-migrations/003_add_constraints.sql',
      template: 'templates/003_add_constraints.sql.tpl'
    },
    // Create Drizzle-specific Database Management Scripts
    {
      type: 'CREATE_FILE',
      path: 'scripts/drizzle-setup.sh',
      template: 'templates/drizzle-setup.sh.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'scripts/drizzle-migrate.sh',
      template: 'templates/drizzle-migrate.sh.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'scripts/drizzle-seed.sh', 
      template: 'templates/drizzle-seed.sh.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'scripts/drizzle-backup.sh',
      template: 'templates/drizzle-backup.sh.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'scripts/drizzle-restore.sh',
      template: 'templates/drizzle-restore.sh.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'scripts/drizzle-reset.sh',
      template: 'templates/drizzle-reset.sh.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'scripts/drizzle-health.sh',
      template: 'templates/drizzle-health.sh.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'scripts/drizzle-shell.sh',
      template: 'templates/drizzle-shell.sh.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'scripts/drizzle-logs.sh',
      template: 'templates/drizzle-logs.sh.tpl'
    },
    // Create Drizzle-specific Monitoring Configuration
    {
      type: 'CREATE_FILE',
      path: 'monitoring/drizzle/prometheus.yml',
      template: 'templates/drizzle-prometheus.yml.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'monitoring/drizzle/grafana/dashboards/drizzle.json',
      template: 'templates/drizzle-dashboard.json.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'monitoring/drizzle/grafana/provisioning/dashboards/dashboard.yml',
      template: 'templates/drizzle-dashboard.yml.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'monitoring/drizzle/grafana/provisioning/datasources/drizzle.yml',
      template: 'templates/drizzle-datasource.yml.tpl'
    },
    // Create Drizzle-specific Backup Scripts
    {
      type: 'CREATE_FILE',
      path: 'backup/drizzle-backup.sh',
      template: 'templates/drizzle-backup.sh.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'backup/drizzle-restore.sh',
      template: 'templates/drizzle-restore.sh.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'backup/drizzle-cleanup.sh',
      template: 'templates/drizzle-cleanup.sh.tpl'
    },
    // Add Database Scripts to package.json
    {
      type: 'ENHANCE_FILE',
      path: 'package.json',
      modifier: 'package-json-merger',
      params: {
        scriptsToAdd: {
          'drizzle:setup': 'bash scripts/drizzle-setup.sh',
          'drizzle:migrate': 'bash scripts/drizzle-migrate.sh',
          'drizzle:seed': 'bash scripts/drizzle-seed.sh',
          'drizzle:backup': 'bash scripts/drizzle-backup.sh',
          'drizzle:restore': 'bash scripts/drizzle-restore.sh',
          'drizzle:reset': 'bash scripts/drizzle-reset.sh',
          'drizzle:health': 'bash scripts/drizzle-health.sh',
          'drizzle:shell': 'bash scripts/drizzle-shell.sh',
          'drizzle:logs': 'bash scripts/drizzle-logs.sh',
          'docker:drizzle:up': 'docker-compose -f docker-compose.drizzle.yml up -d',
          'docker:drizzle:down': 'docker-compose -f docker-compose.drizzle.yml down',
          'docker:drizzle:logs': 'docker-compose -f docker-compose.drizzle.yml logs -f',
          'docker:drizzle:migrate': 'docker-compose -f docker-compose.drizzle.yml run drizzle-migrate',
          'docker:drizzle:backup': 'docker-compose -f docker-compose.drizzle.yml run drizzle-backup'
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