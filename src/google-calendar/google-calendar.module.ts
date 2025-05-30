import { Module } from '@nestjs/common';
import { GoogleAuthModule } from '../google-auth/google-auth.module';
import { GoogleCalendarService } from './google-calendar.service';
import { GoogleCalendarResolver } from './google-calendar.resolver';

@Module({
  imports: [GoogleAuthModule], // Importing GoogleAuthModule to use GoogleAuthService
  providers: [GoogleCalendarService, GoogleCalendarResolver],
  exports: [GoogleCalendarService], // Export if other modules need to use it directly
})
export class GoogleCalendarModule {}
