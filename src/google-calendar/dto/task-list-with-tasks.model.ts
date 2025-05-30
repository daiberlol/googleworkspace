import { ObjectType, Field } from '@nestjs/graphql';
import { GoogleTask } from './task.model';
import { GoogleTaskList } from './task-list.model';

@ObjectType({ description: 'Represents a Google Task List with its tasks' })
export class GoogleTaskListWithTasks {
  @Field(() => GoogleTaskList)
  taskList: GoogleTaskList;

  @Field(() => [GoogleTask])
  tasks: GoogleTask[];
}
