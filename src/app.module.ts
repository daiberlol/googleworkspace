import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { HelloResolver } from './hello/hello.resolver';
import { join } from 'path';
import { GraphQLError } from 'graphql';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ConfigModule } from '@nestjs/config';
import { GoogleAuthModule } from './google-auth/google-auth.module';
import { GoogleCalendarModule } from './google-calendar/google-calendar.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      context: (ctx) => ctx,
      subscriptions: {
        'subscriptions-transport-ws': {
          onConnect: (params) => ({ connectionParams: params }),
          path: '/graphql',
        },
        'graphql-ws': {
          onConnect: (ctx: any) => {
            ctx.headers = {
              authorization: ctx?.connectionParams?.Authorization,
              language: null,
            };
          },
        },
      },
      formatError: (formattedError: GraphQLError, error: any) => {
        return {
          message: formattedError.message,
          code: formattedError.extensions.code,
          status: error.extensions.status,
          path: process.env.STATE === 'prod' ? undefined : formattedError.path,
          locations:
            process.env.STATE === 'prod' ? undefined : formattedError.locations,
        };
      },
    }),
    GoogleAuthModule,
    GoogleCalendarModule,
  ],
  providers: [HelloResolver],
})
export class AppModule {}
