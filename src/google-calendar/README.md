# Google Calendar Service Documentation

## Overview

The Google Calendar Service provides comprehensive integration with Google Calendar API, allowing you to manage calendar events, retrieve calendar information, and handle different event types through a GraphQL interface.

## Features

- **Event Management**: List, filter, and retrieve calendar events
- **Event Type Support**: Handle different event types (default, focusTime, outOfOffice, workingLocation)
- **GraphQL Integration**: Complete GraphQL schema and resolvers
- **Time-based Filtering**: Filter events by date ranges
- **Type Safety**: Full TypeScript support with strongly typed schemas

## GraphQL Schema

### Types

#### GoogleCalendarEvent
```graphql
type GoogleCalendarEvent {
  id: String
  summary: String
  description: String
  start: GoogleCalendarEventDateTime
  end: GoogleCalendarEventDateTime
  location: String
  attendees: [GoogleCalendarAttendee]
  creator: GoogleCalendarPerson
  organizer: GoogleCalendarPerson
  status: String
  htmlLink: String
  created: String
  updated: String
  eventType: GoogleCalendarEventType
}
```

#### GoogleCalendarEventType
```graphql
enum GoogleCalendarEventType {
  DEFAULT
  FOCUS_TIME
  OUT_OF_OFFICE
  WORKING_LOCATION
  BIRTHDAY
}
```

### Queries

Following the standardized naming convention: `google{Service}{Action}`

#### `googleCalendarListEvents`
```graphql
query GoogleCalendarListEvents(
  $calendarId: String = "primary"
  $maxResults: Int = 10
  $timeMin: String
  $timeMax: String
  $eventTypes: [String]
) {
  googleCalendarListEvents(
    calendarId: $calendarId
    maxResults: $maxResults
    timeMin: $timeMin
    timeMax: $timeMax
    eventTypes: $eventTypes
  ) {
    id
    summary
    description
    start {
      dateTime
      date
      timeZone
    }
    end {
      dateTime
      date
      timeZone
    }
    location
    status
    eventType
  }
}
```

#### `googleCalendarListEntries`
```graphql
query GoogleCalendarListEntries(
  $calendarId: String = "primary"
  $maxResults: Int = 10
  $timeMin: String
  $eventTypes: [String]
) {
  googleCalendarListEntries(
    calendarId: $calendarId
    maxResults: $maxResults
    timeMin: $timeMin
    eventTypes: $eventTypes
  ) {
    id
    summary
    description
    start {
      dateTime
      date
    }
    end {
      dateTime
      date
    }
    eventType
  }
}
```

## Service API Reference

### GoogleCalendarService

#### Methods

##### `listEvents(calendarId?, maxResults?): Promise<calendar_v3.Schema$Event[]>`
Lists calendar events with basic filtering.

**Parameters:**
- `calendarId` (string, optional): Calendar ID (default: 'primary')
- `maxResults` (number, optional): Maximum number of events to return (default: 10)

##### `listCalendarEntries(calendarId?, maxResults?, eventTypes?, timeMin?): Promise<calendar_v3.Schema$Event[]>`
Lists calendar entries with advanced filtering options.

**Parameters:**
- `calendarId` (string, optional): Calendar ID (default: 'primary')
- `maxResults` (number, optional): Maximum number of events (default: 10)
- `eventTypes` (string[], optional): Filter by event types
- `timeMin` (string, optional): Lower bound for event start time (ISO format)

## Usage Examples

### Basic Event Listing
```typescript
import { GoogleCalendarService } from './google-calendar.service';

@Injectable()
export class MyService {
  constructor(private calendarService: GoogleCalendarService) {}

  async getUpcomingEvents() {
    const events = await this.calendarService.listEvents('primary', 20);
    return events;
  }
}
```

### Advanced Filtering
```typescript
async getWorkEvents() {
  const events = await this.calendarService.listCalendarEntries(
    'primary',
    50,
    ['default', 'focusTime'],
    new Date().toISOString()
  );
  return events;
}
```

### GraphQL Query Example
```javascript
const GET_EVENTS = gql`
  query GetCalendarEvents {
    googleCalendarListEvents(maxResults: 20) {
      id
      summary
      start {
        dateTime
      }
      end {
        dateTime
      }
      eventType
    }
  }
`;
```

## Event Type Mapping

| Google API Type | GraphQL Enum | Description |
|----------------|--------------|-------------|
| `default` | `DEFAULT` | Regular calendar events |
| `focusTime` | `FOCUS_TIME` | Focus time blocks |
| `outOfOffice` | `OUT_OF_OFFICE` | Out of office events |
| `workingLocation` | `WORKING_LOCATION` | Working location events |
| `birthday` | `BIRTHDAY` | Birthday events |

## Error Handling

The service provides comprehensive error handling:
- Invalid calendar IDs
- Authentication errors
- API rate limiting
- Network connectivity issues

All errors are logged and re-thrown for proper handling at the resolver level.

## Related Documentation

- [Google Tasks Queries](./GOOGLE_TASKS_QUERIES.md)
- [Naming Standards](./NAMING_STANDARD.md)
- [Google Auth Service](../google-auth/README.md)
