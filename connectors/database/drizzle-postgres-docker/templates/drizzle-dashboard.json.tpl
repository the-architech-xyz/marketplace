{
  "dashboard": {
    "id": null,
    "title": "Drizzle Database Dashboard",
    "tags": ["drizzle", "database", "postgresql"],
    "timezone": "browser",
    "panels": [
      {
        "id": 1,
        "title": "Database Connections",
        "type": "stat",
        "targets": [
          {
            "expr": "pg_stat_database_numbackends{datname=\"<%= project.name %>_drizzle\"}",
            "legendFormat": "Active Connections"
          }
        ]
      },
      {
        "id": 2,
        "title": "Database Size",
        "type": "stat",
        "targets": [
          {
            "expr": "pg_database_size_bytes{datname=\"<%= project.name %>_drizzle\"}",
            "legendFormat": "Database Size"
          }
        ]
      }
    ],
    "time": {
      "from": "now-1h",
      "to": "now"
    },
    "refresh": "5s"
  }
}
