# Modular Architecture Guide

This document explains the modular architecture of the Google Workspace Ecosystem API and how each service is organized for independent usage and future npm package distribution.

## 🏗️ Architecture Overview

The project follows a modular monorepo architecture where each Google service is implemented as an independent NestJS module. This design enables:

- **Independent Development**: Each service can be developed, tested, and deployed independently
- **Selective Usage**: Users can import only the services they need
- **NPM Package Distribution**: Each module can be published as a separate npm package
- **Consistent Interfaces**: All services follow the same patterns and conventions

## 📦 Current Module Structure

```
src/
├── google-auth/           # 🔐 Core authentication module
│   ├── services/
│   │   └── google-auth.service.ts
│   ├── google-auth.module.ts
│   └── README.md
│
├── google-calendar/       # 🗓️ Calendar events management
│   ├── dto/
│   │   ├── event.model.ts
│   │   └── event-type.enum.ts
│   ├── resolvers/
│   │   └── google-calendar.resolver.ts
│   ├── services/
│   │   └── google-calendar.service.ts
│   ├── google-calendar.module.ts
│   └── README.md
│
├── google-tasks/          # ✅ Tasks and task lists management
│   ├── dto/
│   │   ├── task.model.ts
│   │   ├── task-list.model.ts
│   │   ├── task-status.enum.ts
│   │   ├── task-input.dto.ts
│   │   └── task-list-with-tasks.model.ts
│   ├── resolvers/
│   │   └── google-tasks.resolver.ts
│   ├── services/
│   │   └── google-tasks.service.ts
│   ├── google-tasks.module.ts
│   └── README.md
│
└── app.module.ts          # Main application module
```

## 🔗 Module Dependencies

### Dependency Graph

```
┌─────────────────┐
│   AppModule     │
└─────┬───────────┘
      │
      ├─── GoogleAuthModule (Core)
      │
      ├─── GoogleCalendarModule
      │    └─── depends on: GoogleAuthModule
      │
      └─── GoogleTasksModule
           └─── depends on: GoogleAuthModule
```

### Dependency Rules

1. **GoogleAuthModule**: Core module with no dependencies on other Google modules
2. **Service Modules**: Each service module depends only on GoogleAuthModule
3. **No Cross-Dependencies**: Service modules don't depend on each other
4. **Shared Dependencies**: All modules share common NestJS dependencies

## 🎯 Naming Standards

All modules follow consistent naming patterns:

### Module Names
- **Pattern**: `Google{Service}Module`
- **Examples**: `GoogleCalendarModule`, `GoogleTasksModule`, `GoogleDriveModule`

### Service Names
- **Pattern**: `Google{Service}Service`
- **Examples**: `GoogleCalendarService`, `GoogleTasksService`, `GoogleDriveService`

### Resolver Names
- **Pattern**: `Google{Service}Resolver`
- **Examples**: `GoogleCalendarResolver`, `GoogleTasksResolver`, `GoogleDriveResolver`

### GraphQL Operations
- **Pattern**: `google{Service}{Action}`
- **Examples**: `googleCalendarListEvents`, `googleTasksCreateTask`, `googleDriveUploadFile`

## 📋 Module Implementation Guidelines

### 1. Module Structure

Each service module should have:

```typescript
@Module({
  imports: [GoogleAuthModule], // Always import auth module
  providers: [
    Google{Service}Service,    // Core business logic
    Google{Service}Resolver,   // GraphQL resolver
  ],
  exports: [Google{Service}Service], // Export service for potential reuse
})
export class Google{Service}Module {}
```

### 2. Service Implementation

```typescript
@Injectable()
export class Google{Service}Service {
  private {service}Client: {ServiceType};

  constructor(private googleAuthService: GoogleAuthService) {
    this.{service}Client = this.googleAuthService.get{Service}Client();
  }

  // Service methods...
}
```

### 3. Resolver Implementation

```typescript
@Resolver(() => Google{Entity})
export class Google{Service}Resolver {
  constructor(private readonly google{Service}Service: Google{Service}Service) {}

  // GraphQL operations following naming convention...
}
```

### 4. DTO Structure

```typescript
// Model
@ObjectType()
export class Google{Entity} {
  @Field(() => String, { nullable: true })
  id?: string;
  
  // Other fields...
}

// Input
@InputType()
export class Create{Entity}Input {
  @Field(() => String)
  title: string;
  
  // Other fields...
}
```

## 🚀 Adding New Modules

To add a new Google service module:

### 1. Create Module Structure

```bash
mkdir src/google-{service}
mkdir src/google-{service}/dto
mkdir src/google-{service}/services  
mkdir src/google-{service}/resolvers
```

### 2. Add Auth Client Support

Update `GoogleAuthService` to include the new service client:

```typescript
get{Service}Client(): {service}_v{version}.{Service} {
  return google.{service}({
    version: 'v{version}',
    auth: this.getOAuth2Client()
  });
}
```

### 3. Implement Core Files

- `google-{service}.module.ts` - NestJS module
- `services/google-{service}.service.ts` - Business logic
- `resolvers/google-{service}.resolver.ts` - GraphQL resolver
- `dto/` - Data models and input types
- `README.md` - Service documentation

### 4. Register Module

Add to `app.module.ts`:

```typescript
import { Google{Service}Module } from './google-{service}/google-{service}.module';

@Module({
  imports: [
    // ... other modules
    Google{Service}Module,
  ],
  // ...
})
export class AppModule {}
```

## 📦 Future NPM Package Distribution

### Planned Package Structure

```
@google-ecosystem/
├── auth                   # GoogleAuthModule
├── calendar              # GoogleCalendarModule  
├── tasks                 # GoogleTasksModule
├── drive                 # GoogleDriveModule (planned)
├── gmail                 # GoogleGmailModule (planned)
├── docs                  # GoogleDocsModule (planned)
├── sheets                # GoogleSheetsModule (planned)
└── common                # Shared types and utilities
```

### Package Dependencies

```json
{
  "name": "@google-ecosystem/calendar",
  "peerDependencies": {
    "@google-ecosystem/auth": "^1.0.0",
    "@nestjs/common": "^11.0.0",
    "@nestjs/graphql": "^13.0.0",
    "googleapis": "^149.0.0"
  }
}
```

## 🔧 Development Workflow

### 1. Module Development

1. Develop module in isolation
2. Test module independently  
3. Update documentation
4. Ensure no cross-dependencies

### 2. Integration Testing

1. Test module integration with auth
2. Verify GraphQL schema generation
3. Test in main application context

### 3. Documentation

1. Update module README
2. Add GraphQL query examples
3. Update architecture documentation

## 🤝 Best Practices

### Module Independence
- Each module should work independently
- No direct dependencies between service modules
- Only depend on GoogleAuthModule for authentication

### Consistent Patterns
- Follow established naming conventions
- Use consistent error handling
- Implement similar GraphQL patterns

### Documentation
- Each module has comprehensive documentation
- Include usage examples
- Document GraphQL operations

### Testing
- Unit tests for services
- Integration tests for resolvers
- E2E tests for complete workflows

This modular architecture ensures scalability, maintainability, and enables future package distribution while maintaining a consistent developer experience.
