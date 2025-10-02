global:
  scrape_interval: 15s
  evaluation_interval: 15s

rule_files:
  # - "first_rules.yml"
  # - "second_rules.yml"

scrape_configs:
  - job_name: 'drizzle-database'
    static_configs:
      - targets: ['drizzle-db:5432']
    metrics_path: /metrics
    scrape_interval: 5s

  - job_name: 'drizzle-migration'
    static_configs:
      - targets: ['drizzle-migrate:8080']
    metrics_path: /metrics
    scrape_interval: 10s
