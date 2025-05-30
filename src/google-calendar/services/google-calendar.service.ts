import { Injectable } from '@nestjs/common';
import { calendar_v3 } from 'googleapis';
import { GoogleAuthService } from 'src/google-auth/services/google-auth.service';

@Injectable()
export class GoogleCalendarService {
  private calendar: calendar_v3.Calendar;

  constructor(private googleAuthService: GoogleAuthService) {
    this.calendar = this.googleAuthService.getCalendarClient();
  }

  async listEvents(calendarId: string = 'primary', maxResults: number = 10) {
    try {
      const res = await this.calendar.events.list({
        calendarId: calendarId,
        timeMin: new Date().toISOString(),
        maxResults: maxResults,
        singleEvents: true,
        orderBy: 'startTime',
      });
      return res.data.items || [];
    } catch (error) {
      console.error('Error fetching calendar events:', error);
      throw error; // Or handle more gracefully
    }
  }

  // Add more methods for Google Calendar interactions (create event, update event, etc.)
  // Example: Creating an event
  // async createEvent(calendarId: string = 'primary', eventDetails: calendar_v3.Schema$Event) {
  //   try {
  //     const res = await this.calendar.events.insert({
  //       calendarId: calendarId,
  //       requestBody: eventDetails,
  //     });
  //     return res.data;
  //   } catch (error) {
  //     console.error('Error creating calendar event:', error);
  //     throw error;
  //   }
  // }

  async listCalendarEntries(
    calendarId: string = 'primary',
    maxResults: number = 10,
    eventTypes?: string[], // Por ejemplo: ['default', 'focusTime', 'outOfOffice', 'workingLocation']
    timeMin: string = new Date().toISOString(),
  ): Promise<calendar_v3.Schema$Event[]> {
    try {
      const requestOptions: calendar_v3.Params$Resource$Events$List = {
        calendarId,
        timeMin,
        maxResults,
        singleEvents: true,
        orderBy: 'startTime',
      };

      if (eventTypes && eventTypes.length > 0) {
        requestOptions.eventTypes = eventTypes;
      }

      const res = await this.calendar.events.list(requestOptions);
      return res.data.items || [];
    } catch (error) {
      console.error('Error fetching calendar entries:', error);
      throw error; // O maneja el error de forma más específica
    }
  }
}
