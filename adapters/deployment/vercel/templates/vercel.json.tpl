{
  "version": 2,
  "framework": "{{context..framework || 'nextjs'}}",
  "buildCommand": "{{context..buildCommand || 'npm run build'}}",
  "outputDirectory": "{{context..outputDirectory || '.next'}}",
  "installCommand": "{{context..installCommand || 'npm install'}}",
  "devCommand": "{{context..devCommand || 'npm run dev'}}",
  "functions": {
    "src/app/api/**/*.ts": {
      "runtime": "nodejs18.x",
      "regions": {{JSON.stringify(module.parameters.functions?.regions || ['iad1'])}},
      "maxDuration": {{context..functions?.maxDuration || 10}}
    }
  },
  "env": {
    {{#each module.parameters.envVars}}
    "{{this.name}}": "{{this.value}}",
    {{/each}}
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
