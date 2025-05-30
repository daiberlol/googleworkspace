import { Module } from '@nestjs/common';
import { GoogleAuthModule } from '../google-auth/google-auth.module';
import { GoogleTasksService } from './services/google-tasks.service';
import { GoogleTasksResolver } from './resolvers/google-tasks.resolver';

@Module({
  imports: [GoogleAuthModule],
  providers: [GoogleTasksService, GoogleTasksResolver],
  exports: [GoogleTasksService],
})
export class GoogleTasksModule {}
