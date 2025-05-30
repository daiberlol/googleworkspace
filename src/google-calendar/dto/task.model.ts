import { ObjectType, Field, ID } from '@nestjs/graphql';
import { GoogleTaskStatus } from './task-status.enum';

@ObjectType({ description: 'Represents a Google Task' })
export class GoogleTask {
  @Field(() => ID, { nullable: true })
  id?: string;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  notes?: string;

  @Field(() => GoogleTaskStatus, { nullable: true })
  status?: GoogleTaskStatus;

  @Field({ nullable: true })
  due?: string; // ISO date string

  @Field({ nullable: true })
  completed?: string; // ISO date string

  @Field({ nullable: true })
  updated?: string; // ISO date string

  @Field({ nullable: true })
  parent?: string; // Parent task ID for subtasks

  @Field({ nullable: true })
  position?: string; // Position in the task list

  @Field({ nullable: true })
  selfLink?: string; // URL pointing to this task

  @Field({ nullable: true })
  etag?: string; // ETag of the resource

  @Field({ nullable: true })
  kind?: string; // Type of the resource

  @Field({ nullable: true })
  deleted?: boolean; // Whether the task has been deleted
}
