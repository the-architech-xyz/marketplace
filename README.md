# The Architech Marketplace

This repository contains all the adapters and integrations for The Architech CLI.

## Structure

```
marketplace/
├── adapters/           # Framework, database, auth, etc. adapters
│   ├── framework/
│   ├── database/
│   ├── auth/
│   ├── ui/
│   ├── testing/
│   ├── deployment/
│   ├── state/
│   ├── payment/
│   ├── email/
│   ├── observability/
│   ├── content/
│   └── blockchain/
├── integrations/       # Cross-adapter integrations
│   ├── connect/
│   └── ...
└── manifest.json       # Auto-generated module manifest
```

## Adding New Modules

1. Create your module in the appropriate directory
2. Follow the blueprint format (see examples)
3. Run `npm run generate-manifest` to update the manifest
4. Submit a pull request

## Module Format

Each module should have:
- `blueprint.yaml` - The blueprint definition
- `adapter.json` or `integration.json` - Module metadata
- `templates/` - Template files (if applicable)

## Contributing

See the main CLI repository for contribution guidelines.

## Installation

This marketplace is automatically used by The Architech CLI. No manual installation required.

## License

MIT License - see LICENSE file for details.
