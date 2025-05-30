import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { google, Auth } from 'googleapis';

@Injectable()
export class GoogleAuthService {
  private oauth2Client: Auth.OAuth2Client;

  constructor(private configService: ConfigService) {
    const clientId = this.configService.get<string>('GOOGLE_CLIENT_ID');
    const clientSecret = this.configService.get<string>('GOOGLE_CLIENT_SECRET');
    const redirectUri = this.configService.get<string>('GOOGLE_REDIRECT_URI');

    if (!clientId || !clientSecret) {
      throw new Error('Missing Google OAuth2 credentials in configuration');
    }

    this.oauth2Client = new google.auth.OAuth2(
      clientId,
      clientSecret,
      redirectUri, // This can be optional if you only use service accounts
    );
  }

  // Method to get an authenticated OAuth2 client
  // You'll need to implement the token handling (get, set, refresh)
  getOAuth2Client(): Auth.OAuth2Client {
    // TEMPORARY: For testing, set a manually obtained access token
    this.oauth2Client.setCredentials({
      access_token:
        'ya29.a0AW4XtxjGOD2aCmwDjR7CIBS7XO2ekmjB4Y_xhm4ab4O17v4CoixfZTQQwejkOPOMxRvmHwxU6Bkg9hwGC8Gagl0N8qb5FDFsM1y3sb9_HjPq1h2187-oil-OepV2MU86NtPcuvoVuc68S4N2zTwRttZxzBX5jzl6Zo07nXhWaCgYKAekSARYSFQHGX2Mi0COm78AbcAFDrcDw4EEgrg0175',
      // refresh_token: 'YOUR_REFRESH_TOKEN', // if you have one
      // scope: 'https://www.googleapis.com/auth/calendar.readonly',
      // token_type: 'Bearer',
      // expiry_date: ... // (timestamp in ms)
    });
    return this.oauth2Client;
  }

  // Method to get an authenticated client using a Service Account
  // async getServiceAccountClient(scopes: string | string[]): Promise<Auth.GoogleAuth> {
  //   const keyFile = this.configService.get<string>('GOOGLE_SERVICE_ACCOUNT_KEY_FILE_PATH');
  //   if (!keyFile) {
  //     throw new Error('Missing Google Service Account key file path in configuration');
  //   }
  //   const auth = new google.auth.GoogleAuth({
  //     keyFile: keyFile,
  //     scopes: scopes,
  //   });
  //   return auth;
  // }

  // --- Methods to provide specific API clients ---

  getCalendarClient() {
    // Ensure OAuth2 client has credentials or use a service account client
    return google.calendar({
      version: 'v3',
      auth: this.getOAuth2Client() /* or service account auth */,
    });
  }

  getDriveClient() {
    return google.drive({
      version: 'v3',
      auth: this.getOAuth2Client() /* or service account auth */,
    });
  }

  getGmailClient() {
    return google.gmail({
      version: 'v1',
      auth: this.getOAuth2Client() /* or service account auth */,
    });
  }

  // Add more client getters as needed (Sheets, Docs, etc.)
}
