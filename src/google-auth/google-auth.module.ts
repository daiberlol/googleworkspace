import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GoogleAuthService } from './google-auth.service';

@Global() // Make GoogleAuthService available globally if needed
@Module({
  imports: [
    ConfigModule.forRoot({
      // Ensure ConfigModule is set up, or use your existing config solution
      // isGlobal: true, // if you want config to be global
      // envFilePath: '.env', // specify your .env file
    }),
  ],
  providers: [GoogleAuthService],
  exports: [GoogleAuthService],
})
export class GoogleAuthModule {}
