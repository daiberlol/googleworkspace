import { Module } from '@nestjs/common';
import { GoogleAuthModule } from '../google-auth/google-auth.module';
import { GoogleCalendarResolver } from './resolvers/google-calendar.resolver';
import { GoogleCalendarService } from './services/google-calendar.service';

@Module({
  imports: [GoogleAuthModule], // Importing GoogleAuthModule to use GoogleAuthService
  providers: [
    GoogleCalendarService,
    GoogleCalendarResolver,
  ],
  exports: [GoogleCalendarService], // Export if other modules need to use it directly
})
export class GoogleCalendarModule {}
