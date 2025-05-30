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
        'ya29.a0AW4XtxjI7-UmOfbNompIXWLnKc0UAwfHag_EXkj4KCHEy5sPoN9-3HI_2TmkueKhmIKI3VatruDo9P5CzRN3Wsh3j4X4PtwSH21y2XQgNNCtnbIzNUGdApnVl810DlOsaTpG7h09lZrJ4_vkrkxJyvDm-eaAh_DPMvDTcPgraCgYKAYcSARYSFQHGX2MiWaa3owsqXM4DTMWGlzAPfg0175',
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

  getTasksClient() {
    return google.tasks({
      version: 'v1',
      auth: this.getOAuth2Client() /* or service account auth */,
    });
  }

  // Add more client getters as needed (Sheets, Docs, etc.)
}
