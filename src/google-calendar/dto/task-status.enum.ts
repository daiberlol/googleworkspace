import { registerEnumType } from '@nestjs/graphql';

export enum GoogleTaskStatus {
  NEEDS_ACTION = 'needsAction',
  COMPLETED = 'completed',
}

registerEnumType(GoogleTaskStatus, {
  name: 'GoogleTaskStatus',
  description: 'Possible status values for Google Tasks',
});
