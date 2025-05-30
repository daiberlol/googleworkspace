# Google Ecosystem Modules

This directory contains the modular architecture for Google Workspace services, designed for future npm package distribution.

## 📦 Available Modules

| Module | Status | Description |
|--------|--------|-------------|
| **@google-ecosystem/common** | ✅ Ready | Common types, interfaces, and utilities |
| **@google-ecosystem/auth** | ✅ Ready | OAuth2 authentication and API client management |
| **@google-ecosystem/calendar** | 🚧 In Progress | Calendar service (currently in main project) |
| **@google-ecosystem/tasks** | 🚧 In Progress | Tasks service (currently in main project) |
| **@google-ecosystem/drive** | 📋 Planned | Drive file management |
| **@google-ecosystem/gmail** | 📋 Planned | Email management |

## 🏗️ Module Structure

Each module follows a consistent structure:

```
module-name/
├── package.json          # Module configuration
├── tsconfig.json         # TypeScript configuration  
├── src/
│   ├── index.ts          # Main module exports
│   ├── module.ts         # NestJS module (if applicable)
│   ├── service.ts        # Core service implementation
│   └── types/            # Type definitions
└── README.md             # Module documentation
```

## 🚀 Building Modules

Each module can be built independently:

```bash
# Build all modules
cd google-common && npm run build
cd ../google-auth && npm run build

# Or use workspace commands (future implementation)
npm run build:modules
```

## 📋 Usage

### As Individual Packages (Future)

```bash
# Install specific services
npm install @google-ecosystem/auth
npm install @google-ecosystem/calendar
npm install @google-ecosystem/tasks
```

### Current Development Setup

```typescript
// Import from local modules
import { GoogleAuthService } from '../google-modules/google-auth/src';
import { GoogleServiceConfig } from '../google-modules/google-common/src';
```

## 🔧 Development Guidelines

1. **Independence**: Each module should be completely independent
2. **Peer Dependencies**: Use peer dependencies for shared libraries (googleapis, @nestjs/*)
3. **Type Safety**: Full TypeScript support with proper declarations
4. **Documentation**: Comprehensive README for each module
5. **Testing**: Unit tests for each module
6. **Versioning**: Semantic versioning for package releases

## 📚 Module Documentation

- [Common Types & Utilities](./google-common/README.md)
- [Authentication Service](./google-auth/README.md)

## 🚀 Roadmap

### Phase 1: Core Modules (Current)
- [x] Common types and utilities
- [x] Authentication service
- [ ] Calendar service extraction
- [ ] Tasks service extraction

### Phase 2: Extended Services
- [ ] Google Drive integration
- [ ] Gmail integration
- [ ] Google Docs integration
- [ ] Google Sheets integration

### Phase 3: Package Distribution
- [ ] NPM package publishing
- [ ] Workspace configuration
- [ ] Documentation site
- [ ] Example projects

## 🤝 Contributing

When contributing to modules:

1. Follow the module structure guidelines
2. Ensure complete independence from other modules
3. Add comprehensive tests
4. Update module documentation
5. Version appropriately

For more details, see the main project [contributing guidelines](../README.md#contributing).
