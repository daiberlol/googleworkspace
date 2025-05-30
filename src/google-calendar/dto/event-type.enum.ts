import { registerEnumType } from '@nestjs/graphql';

export enum GoogleCalendarEventType {
  DEFAULT = 'default',
  FOCUS_TIME = 'focusTime',
  OUT_OF_OFFICE = 'outOfOffice',
  WORKING_LOCATION = 'workingLocation',
  BIRTHDAY = 'birthday',
  // Add other event types as needed from Google Calendar API
}

registerEnumType(GoogleCalendarEventType, {
  name: 'GoogleCalendarEventType',
  description: 'Possible types for Google Calendar entries',
});
