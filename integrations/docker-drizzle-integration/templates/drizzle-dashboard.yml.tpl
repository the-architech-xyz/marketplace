apiVersion: 1

providers:
  - name: 'drizzle-dashboards'
    orgId: 1
    folder: 'Drizzle'
    type: file
    disableDeletion: false
    updateIntervalSeconds: 10
    allowUiUpdates: true
    options:
      path: /etc/grafana/provisioning/dashboards/drizzle
