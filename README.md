# Google Workspace NestJS API

A NestJS-based GraphQL API for interacting with Google Workspace services, specifically Google Calendar. This project provides a modern, type-safe interface for managing calendar events and entries.

## 🚀 Features

- **Google Calendar Integration**: List, filter, and manage calendar events
- **GraphQL API**: Modern GraphQL endpoint with Apollo Server
- **Type Safety**: Full TypeScript support with strongly typed GraphQL schemas
- **Event Type Filtering**: Support for different calendar event types (default, focusTime, outOfOffice, workingLocation)
- **OAuth2 Authentication**: Secure Google OAuth2 integration
- **Modular Architecture**: Clean, maintainable NestJS module structure

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js (v18 or higher)
- npm or yarn
- Google Cloud Console project with Calendar API enabled
- Google OAuth2 credentials

## 🛠️ Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/daiberlol/googleworkspace.git
   cd googleworkspace
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:

   ```env
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   GOOGLE_REDIRECT_URI=http://localhost:3000/auth/google/callback
   ```

4. **Google Cloud Console Setup**
   - Create a new project in [Google Cloud Console](https://console.cloud.google.com/)
   - Enable the Google Calendar API
   - Create OAuth2 credentials (Web application)
   - Add authorized redirect URIs

## 🚀 Running the Application

```bash
# Development mode
npm run start:dev

# Production mode
npm run start:prod

# Debug mode
npm run start:debug
```

The application will be available at:

- GraphQL Playground: `http://localhost:3000/graphql`
- API: `http://localhost:3000`

## 📊 GraphQL API

### Available Queries

#### 1. Get Calendar Events

```graphql
query {
  googleCalendarEvents(calendarId: "primary", maxResults: 10) {
    id
    summary
    description
    startTime
    endTime
    location
    htmlLink
  }
}
```

#### 2. Get Calendar Entries with Type Filtering

```graphql
query {
  googleCalendarEntries(
    calendarId: "primary"
    maxResults: 5
    eventTypes: [DEFAULT, FOCUS_TIME]
    timeMin: "2024-01-01T00:00:00Z"
  ) {
    id
    summary
    description
    startTime
    endTime
    location
    htmlLink
    eventType
  }
}
```

### Event Types Enum

The API supports the following event types:

- `DEFAULT`: Regular calendar events
- `FOCUS_TIME`: Focus time blocks
- `OUT_OF_OFFICE`: Out of office events
- `WORKING_LOCATION`: Working location indicators

## 🏗️ Project Structure

```
src/
├── app.module.ts              # Main application module
├── main.ts                    # Application entry point
├── schema.gql                 # Auto-generated GraphQL schema
├── google-auth/               # Google authentication module
│   ├── google-auth.module.ts
│   └── google-auth.service.ts
├── google-calendar/           # Google Calendar module
│   ├── google-calendar.module.ts
│   ├── google-calendar.service.ts
│   ├── google-calendar.resolver.ts
│   └── dto/
│       ├── event.model.ts     # GraphQL event model
│       └── event-type.enum.ts # Event types enum
└── hello/                     # Example hello module
    └── hello.resolver.ts
```

## 🔧 Development

### Code Style

```bash
# Format code
npm run format

# Lint code
npm run lint
```

### Testing

```bash
# Unit tests
npm run test

# End-to-end tests
npm run test:e2e

# Test coverage
npm run test:cov

# Watch mode
npm run test:watch
```

### Building

```bash
# Build for production
npm run build
```

## 🔐 Authentication Flow

1. The application uses Google OAuth2 for authentication
2. Users authenticate through Google's OAuth consent screen
3. The application receives and stores access tokens
4. API calls to Google Calendar are made using these tokens

## 📝 API Documentation

### Services

#### GoogleAuthService

Handles Google OAuth2 authentication and provides authenticated clients.

#### GoogleCalendarService

- `listEvents(calendarId, maxResults)`: Get basic calendar events
- `listCalendarEntries(calendarId, maxResults, eventTypes, timeMin)`: Get filtered calendar entries with type support

### GraphQL Resolvers

#### GoogleCalendarResolver

- `googleCalendarEvents`: Query for basic calendar events
- `googleCalendarEntries`: Query for filtered calendar entries with event type support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the UNLICENSED License.

## 🆘 Support

For support and questions:

- Create an issue in the GitHub repository
- Check the [NestJS Documentation](https://docs.nestjs.com)
- Review [Google Calendar API Documentation](https://developers.google.com/calendar)

## 🔮 Roadmap

- [ ] Google Tasks integration
- [ ] Event creation and modification
- [ ] Calendar management (create, update, delete calendars)
- [ ] Recurring events support
- [ ] Email notifications integration
- [ ] Advanced filtering and search
- [ ] Batch operations support
