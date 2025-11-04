{
  "$schema": "./node_modules/nx/schemas/nx-schema.json",
  "nxCloudAccessToken": <% if (module.parameters.nxCloud) { %>"<YOUR_NX_CLOUD_TOKEN>"<% } else { %>"<% } %>,
  "defaultBase": "main",
  "namedInputs": {
    "default": [
      "{projectRoot}/**/*",
      "sharedGlobals"
    ],
    "production": [
      "default",
      "!{projectRoot}/**/?(*.)+(spec|test).[jt]s?(x)?(.snap)",
      "!{projectRoot}/tsconfig.spec.json",
      "!{projectRoot}/**/?(*.)+(spec|test).[jt]s?(x)?"
    ],
    "sharedGlobals": [
      "{workspaceRoot}/.github/workflows/**/*",
      "{workspaceRoot}/tsconfig.base.json",
      "{workspaceRoot}/nx.json"
    ]
  },
  "targetDefaults": {
    "build": {
      "dependsOn": ["^build"],
      "inputs": ["production", "^production"],
      "outputs": [
        "{projectRoot}/dist",
        "{projectRoot}/.next",
        "{projectRoot}/build",
        "{projectRoot}/.turbo"
      ],
      "cache": true
    },
    "dev": {
      "cache": false,
      "persistent": true,
      "dependsOn": ["^build"]
    },
    "lint": {
      "inputs": ["default", "{workspaceRoot}/.eslintrc.json"],
      "outputs": [],
      "cache": true
    },
    "test": {
      "inputs": [
        "default",
        "^production",
        "{workspaceRoot}/jest.preset.js"
      ],
      "outputs": ["{projectRoot}/coverage"],
      "dependsOn": ["^build"],
      "cache": true
    },
    "type-check": {
      "inputs": ["default", "^production"],
      "outputs": [],
      "dependsOn": ["^build"],
      "cache": true
    },
    "clean": {
      "cache": false
    }
  },
  "generators": {
    "@nx/next:application": {
      "style": "css",
      "linter": "eslint"
    },
    "@nx/react:component": {
      "style": "css"
    }
  },
  "affected": {
    "defaultBase": "main"
  },
  "tasksRunnerOptions": {
    "default": {
      "runner": "nx/tasks-runners/default",
      "options": {
        "cacheableOperations": ["build", "lint", "test", "type-check"]
      }
    }
  }
}

