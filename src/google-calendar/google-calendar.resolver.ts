import { Resolver, Query, Args } from '@nestjs/graphql';
import { GoogleCalendarService } from './google-calendar.service';
import { CalendarEvent } from './dto/event.model';
import { GoogleCalendarEventType } from './dto/event-type.enum'; // Import the enum

@Resolver(() => CalendarEvent) // Specify the type the resolver primarily handles
export class GoogleCalendarResolver {
  constructor(private googleCalendarService: GoogleCalendarService) {}

  @Query(() => [CalendarEvent], { name: 'googleCalendarEvents' }) // Return an array of CalendarEvent
  async getCalendarEvents(
    @Args('calendarId', { type: () => String, defaultValue: 'primary' })
    calendarId: string,
    @Args('maxResults', { type: () => Number, defaultValue: 10 })
    maxResults: number,
  ): Promise<CalendarEvent[]> {
    const events = await this.googleCalendarService.listEvents(
      calendarId,
      maxResults,
    );
    // Map the Google API response to our CalendarEvent DTO
    return events.map((event: any) => ({
      id: event.id,
      summary: event.summary,
      description: event.description,
      startTime: event.start?.dateTime || event.start?.date,
      endTime: event.end?.dateTime || event.end?.date,
      location: event.location,
      htmlLink: event.htmlLink,
    }));
  }

  // Add more queries or mutations here
  // Example: Mutation to create an event (you'd need an InputType for event details)
  // @Mutation(() => CalendarEvent, { name: 'createGoogleCalendarEvent' })
  // async createEvent(
  //   @Args('calendarId', { type: () => String, defaultValue: 'primary' })
  //   calendarId: string,
  //   @Args('eventInput') eventInput: CreateEventInput, // Define CreateEventInput as an InputType
  // ): Promise<CalendarEvent> {
  //   const newEvent = await this.googleCalendarService.createEvent(calendarId, eventInput as any);
  //   return {
  //     id: newEvent.id,
  //     summary: newEvent.summary,
  //     description: newEvent.description,
  //     startTime: newEvent.start?.dateTime || newEvent.start?.date,
  //     endTime: newEvent.end?.dateTime || newEvent.end?.date,
  //     location: newEvent.location,
  //     htmlLink: newEvent.htmlLink,
  //   };
  // }

  @Query(() => [CalendarEvent], { name: 'googleCalendarEntries' })
  async getCalendarEntries(
    @Args('calendarId', { type: () => String, defaultValue: 'primary' })
    calendarId: string,
    @Args('maxResults', { type: () => Number, defaultValue: 10 })
    maxResults: number,
    @Args('eventTypes', {
      type: () => [GoogleCalendarEventType],
      nullable: true,
    }) // Use the enum here
    eventTypes?: GoogleCalendarEventType[],
    @Args('timeMin', {
      type: () => String,
      nullable: true,
      defaultValue: new Date().toISOString(),
    })
    timeMin?: string,
  ): Promise<CalendarEvent[]> {
    const events = await this.googleCalendarService.listCalendarEntries(
      calendarId,
      maxResults,
      eventTypes,
      timeMin,
    );
    // Map the Google API response to our CalendarEvent DTO
    return events.map((event: any) => ({
      id: event.id,
      summary: event.summary,
      description: event.description,
      startTime: event.start?.dateTime || event.start?.date,
      endTime: event.end?.dateTime || event.end?.date,
      location: event.location,
      htmlLink: event.htmlLink,
      eventType: event.eventType as GoogleCalendarEventType, // Cast to the enum type
    }));
  }
}
