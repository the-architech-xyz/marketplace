{
  "version": 2,
  "framework": "<%= module.parameters.framework || 'nextjs' %>",
  "buildCommand": "<%= module.parameters.buildCommand || 'npm run build' %>",
  "outputDirectory": "<%= module.parameters.outputDirectory || '.next' %>",
  "installCommand": "<%= module.parameters.installCommand || 'npm install' %>",
  "devCommand": "<%= module.parameters.devCommand || 'npm run dev' %>",
  "functions": {
    "src/app/api/**/*.ts": {
      "runtime": "nodejs18.x",
      "regions": <%= JSON.stringify(module.parameters.functions?.regions || ['iad1']) %>,
      "maxDuration": <%= module.parameters.functions?.maxDuration || 10 %>
    }
  },
  "env": {
    <% if (module.parameters.envVars && module.parameters.envVars.length > 0) { %>
    <% module.parameters.envVars.forEach((item, index) => { %>
    "<%= item.name %>": "<%= item.value %>"<%= index < module.parameters.envVars.length - 1 ? ',' : '' %>
    <% }); %>
    <% } %>
  },
  "build": {
    "env": {
      "NODE_ENV": "production"
    }
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ],
  "redirects": [],
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "/api/$1"
    }
  ]
}
