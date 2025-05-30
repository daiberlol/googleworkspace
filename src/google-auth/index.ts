// Google Auth Module Exports
export { GoogleAuthModule } from './google-auth.module';
export { GoogleAuthService } from './services/google-auth.service';

// Re-export common interfaces and types that other modules might need
export interface GoogleAuthConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  scopes: string[];
}
