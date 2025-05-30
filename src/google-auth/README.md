# Google Auth Service Documentation

## Overview

The Google Auth Service provides OAuth2 authentication for all Google Workspace services. It handles token management, credential storage, and provides authenticated API clients for various Google services.

## Features

- **OAuth2 Authentication**: Complete OAuth2 flow implementation
- **Token Management**: Automatic token refresh and credential handling
- **Multi-Service Support**: Provides clients for Calendar, Tasks, Drive, Gmail
- **Type Safety**: Full TypeScript support with proper type definitions
- **Error Handling**: Comprehensive error handling with custom exceptions

## Configuration

### Environment Variables

```env
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=http://localhost:3000/auth/google/callback
```

### Required Scopes

The service requests the following scopes by default:
- `https://www.googleapis.com/auth/calendar` - Calendar access
- `https://www.googleapis.com/auth/tasks` - Tasks access
- `https://www.googleapis.com/auth/drive` - Drive access
- `https://www.googleapis.com/auth/gmail.modify` - Gmail access

## API Reference

### GoogleAuthService

#### Methods

##### `setCredentials(credentials: GoogleAuthCredentials): void`
Sets OAuth2 credentials for the current session.

##### `getOAuth2Client(): Auth.OAuth2Client`
Returns the configured OAuth2 client with current credentials.

##### `generateAuthUrl(): string`
Generates the authorization URL for OAuth2 flow.

##### `getTokenFromCode(code: string): Promise<GoogleAuthCredentials>`
Exchanges authorization code for access tokens.

##### `refreshAccessToken(): Promise<GoogleAuthCredentials>`
Refreshes the access token using refresh token.

#### API Client Factory Methods

##### `getCalendarClient(): calendar_v3.Calendar`
Returns an authenticated Google Calendar client.

##### `getTasksClient(): tasks_v1.Tasks`
Returns an authenticated Google Tasks client.

##### `getDriveClient(): drive_v3.Drive`
Returns an authenticated Google Drive client.

##### `getGmailClient(): gmail_v1.Gmail`
Returns an authenticated Gmail client.

## Usage Example

```typescript
import { GoogleAuthService } from './google-auth.service';

@Injectable()
export class MyService {
  constructor(private googleAuth: GoogleAuthService) {}

  async example() {
    // Get authorization URL
    const authUrl = this.googleAuth.generateAuthUrl();
    
    // After user authorization, exchange code for tokens
    const tokens = await this.googleAuth.getTokenFromCode(code);
    
    // Get authenticated client
    const calendar = this.googleAuth.getCalendarClient();
  }
}
```

## Module Integration

```typescript
import { GoogleAuthModule } from './google-auth.module';

@Module({
  imports: [GoogleAuthModule],
  // ...
})
export class AppModule {}
```

## Error Handling

The service uses `GoogleUtils.handleError()` to provide consistent error handling across all methods. All errors are wrapped in `GoogleServiceError` for better debugging and error management.

## Security Notes

- **Token Storage**: Currently uses temporary token storage. Implement persistent storage for production.
- **Scope Management**: Only request necessary scopes for your application.
- **Credential Security**: Never expose client secrets in client-side code.
- **Token Refresh**: Implement automatic token refresh for long-running applications.
