import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType({ description: 'Represents a Google Task List' })
export class GoogleTaskList {
  @Field(() => ID, { nullable: true })
  id?: string;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  updated?: string; // ISO date string

  @Field({ nullable: true })
  selfLink?: string; // URL pointing to this task list

  @Field({ nullable: true })
  etag?: string; // ETag of the resource

  @Field({ nullable: true })
  kind?: string; // Type of the resource
}
