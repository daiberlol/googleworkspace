import { ObjectType, Field, ID } from '@nestjs/graphql';
import { GoogleCalendarEventType } from './event-type.enum'; // Import the enum

@ObjectType({ description: 'Represents a Google Calendar event' })
export class CalendarEvent {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  summary?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  startTime?: string; // Or GraphQLDateTime

  @Field({ nullable: true })
  endTime?: string; // Or GraphQLDateTime

  @Field({ nullable: true })
  location?: string;

  @Field({ nullable: true })
  htmlLink?: string;

  @Field(() => GoogleCalendarEventType, { nullable: true }) // Use the enum here
  eventType?: GoogleCalendarEventType;
}
