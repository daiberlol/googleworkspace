import { InputType, Field } from '@nestjs/graphql';

@InputType({ description: 'Input for creating a new Google Task' })
export class CreateTaskInput {
  @Field()
  taskListId: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  notes?: string;

  @Field({ nullable: true })
  due?: string; // ISO date string

  @Field({ nullable: true })
  parent?: string; // Parent task ID for subtasks

  @Field({ nullable: true })
  previous?: string; // Previous sibling task ID
}

@InputType({ description: 'Input for updating a Google Task' })
export class UpdateTaskInput {
  @Field()
  taskListId: string;

  @Field()
  taskId: string;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  notes?: string;

  @Field({ nullable: true })
  status?: string;

  @Field({ nullable: true })
  due?: string; // ISO date string

  @Field({ nullable: true })
  completed?: string; // ISO date string
}
