# Google Workspace Ecosystem API

A comprehensive NestJS-based GraphQL API for interacting with Google Workspace services. This modular project provides a modern, type-safe interface for managing Google Calendar events, Tasks, and other Google services with a focus on creating reusable npm packages.

## 🚀 Features

- **🗓️ Google Calendar Integration**: Complete calendar event management with advanced filtering
- **✅ Google Tasks Integration**: Full task and task list management with CRUD operations
- **🔐 OAuth2 Authentication**: Secure Google OAuth2 integration with token management
- **📊 GraphQL API**: Modern GraphQL endpoint with Apollo Server and type-safe schemas
- **🏗️ Modular Architecture**: Each Google service as an independent, reusable module
- **📦 NPM Package Ready**: Designed for future npm package distribution
- **🎯 Standardized Naming**: Consistent naming convention across all services
- **💪 Type Safety**: Full TypeScript support with strongly typed GraphQL schemas

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js (v18 or higher)
- npm or yarn
- Google Cloud Console project with the following APIs enabled:
  - Google Calendar API
  - Google Tasks API
  - (Optional) Google Drive API, Gmail API for future extensions
- Google OAuth2 credentials

## 🏗️ Project Structure

This project is organized in a modular architecture where each Google service is independent and ready for npm package distribution:

```
src/
├── google-auth/           # 🔐 Authentication service
│   ├── README.md         # Auth service documentation
│   └── services/
├── google-calendar/       # 🗓️ Calendar & Tasks services
│   ├── README.md         # Calendar service documentation
│   ├── GOOGLE_TASKS_README.md  # Tasks service documentation
│   ├── GOOGLE_TASKS_QUERIES.md # GraphQL query examples
│   ├── NAMING_STANDARD.md      # Naming conventions
│   ├── dto/              # Data Transfer Objects
│   ├── resolvers/        # GraphQL resolvers
│   └── services/         # Business logic services
└── app.module.ts         # Main application module
```

### 📚 Service Documentation

Each service has its own comprehensive documentation:

| Service | Documentation | Description |
|---------|---------------|-------------|
| **Google Auth** | [📖 README](./src/google-auth/README.md) | OAuth2 authentication and API client management |
| **Google Calendar** | [📖 README](./src/google-calendar/README.md) | Calendar events management and filtering |
| **Google Tasks** | [📖 README](./src/google-calendar/GOOGLE_TASKS_README.md) | Task lists and tasks CRUD operations |
| **GraphQL Queries** | [📖 Examples](./src/google-calendar/GOOGLE_TASKS_QUERIES.md) | Ready-to-use GraphQL query examples |
| **Naming Standards** | [📖 Standards](./src/google-calendar/NAMING_STANDARD.md) | Consistent naming conventions |

## 🚀 Quick Start

### 1. Installation

```bash
# Clone the repository
git clone <repository-url>
cd google-workspace-api

# Install dependencies
npm install
```

### 2. Environment Setup

Create a `.env` file in the root directory:

```env
# Google OAuth2 Configuration
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=http://localhost:3000/auth/google/callback

# Application Configuration
PORT=3000
NODE_ENV=development
```

### 3. Google Cloud Console Setup

1. Create a new project in [Google Cloud Console](https://console.cloud.google.com/)
2. Enable the required APIs:
   - Google Calendar API
   - Google Tasks API
3. Create OAuth2 credentials (Web application)
4. Add authorized redirect URIs
5. Download the credentials and update your `.env` file

### 4. Run the Application

```bash
# Development mode with hot reload
npm run start:dev

# Production mode
npm run start:prod

# Build the project
npm run build
```

The GraphQL playground will be available at: `http://localhost:3000/graphql`

## 🔍 GraphQL API Overview

### Naming Convention

All GraphQL operations follow the standardized pattern: `google{Service}{Action}`

Examples:
- `googleCalendarListEvents` - List calendar events
- `googleTasksListTaskLists` - List task lists  
- `googleTasksCreateTask` - Create a new task

### Quick Examples

#### 📅 Calendar Events
```graphql
query GetCalendarEvents {
  googleCalendarListEvents(maxResults: 10) {
    id
    summary
    start { dateTime }
    end { dateTime }
    eventType
  }
}
```

#### ✅ Tasks Management
```graphql
# List all task lists
query GetTaskLists {
  googleTasksListTaskLists {
    id
    title
  }
}

# Create a new task
mutation CreateTask($taskListId: String!, $taskData: CreateTaskInput!) {
  googleTasksCreateTask(taskListId: $taskListId, taskData: $taskData) {
    id
    title
    status
  }
}
```

For complete GraphQL documentation, see: [📖 GraphQL Query Examples](./src/google-calendar/GOOGLE_TASKS_QUERIES.md)

## 🛠️ Development

### Available Scripts

```bash
# Development
npm run start:dev      # Start with hot reload
npm run start:debug    # Start in debug mode

# Building
npm run build          # Build for production
npm run start:prod     # Run production build

# Code Quality
npm run lint           # Run ESLint
npm run format         # Format code with Prettier

# Testing
npm run test           # Run unit tests
npm run test:watch     # Run tests in watch mode
npm run test:cov       # Run tests with coverage
npm run test:e2e       # Run end-to-end tests
```

### Project Dependencies

**Core Framework:**
- NestJS v11 - Progressive Node.js framework
- GraphQL with Apollo Server - API query language
- TypeScript - Type-safe JavaScript

**Google Integration:**
- googleapis v149 - Official Google APIs client library

**Development Tools:**
- ESLint & Prettier - Code quality and formatting
- Jest - Testing framework

## 🔮 Future Plans

### NPM Package Distribution

This project is designed with modularity in mind for future npm package distribution:

```
@google-ecosystem/auth         # Authentication service
@google-ecosystem/calendar     # Calendar service
@google-ecosystem/tasks        # Tasks service
@google-ecosystem/drive        # Drive service (planned)
@google-ecosystem/gmail        # Gmail service (planned)
@google-ecosystem/common       # Shared utilities and types
```

### Planned Services

- **Google Drive**: File management and sharing
- **Gmail**: Email management and automation
- **Google Docs**: Document creation and editing
- **Google Sheets**: Spreadsheet operations
- **Google Meet**: Meeting management

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Follow the [naming standards](./src/google-calendar/NAMING_STANDARD.md)
4. Add documentation for new services
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

If you encounter any issues or need help:

1. Check the service-specific documentation
2. Review the [GraphQL query examples](./src/google-calendar/GOOGLE_TASKS_QUERIES.md)
3. Ensure your Google Cloud Console is properly configured
4. Verify your OAuth2 credentials and scopes

## 📞 Contact

For questions, suggestions, or contributions, please open an issue in the repository.

---

**Happy coding!** 🚀
