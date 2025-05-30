import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { tasks_v1 } from 'googleapis';
import { GoogleTasksService } from '../services/google-tasks.service';
import { GoogleTask } from '../dto/task.model';
import { GoogleTaskList } from '../dto/task-list.model';
import { GoogleTaskListWithTasks } from '../dto/task-list-with-tasks.model';
import { CreateTaskInput, UpdateTaskInput } from '../dto/task-input.dto';

@Resolver(() => GoogleTask)
export class GoogleTasksResolver {
  constructor(private readonly googleTasksService: GoogleTasksService) {}

  private mapTaskList(taskList: tasks_v1.Schema$TaskList): GoogleTaskList {
    return {
      id: taskList.id || undefined,
      title: taskList.title || undefined,
      updated: taskList.updated || undefined,
      selfLink: taskList.selfLink || undefined,
      etag: taskList.etag || undefined,
      kind: taskList.kind || undefined,
    };
  }

  private mapTask(task: tasks_v1.Schema$Task): GoogleTask {
    return {
      id: task.id || undefined,
      title: task.title || undefined,
      notes: task.notes || undefined,
      status: task.status as any || undefined,
      due: task.due || undefined,
      completed: task.completed || undefined,
      updated: task.updated || undefined,
      parent: task.parent || undefined,
      position: task.position || undefined,
      selfLink: task.selfLink || undefined,
      etag: task.etag || undefined,
      kind: task.kind || undefined,
      deleted: task.deleted || undefined,
    };
  }  @Query(() => [GoogleTaskList], {
    description: 'Get all task lists for the authenticated user',
  })
  async googleTasksListTaskLists(): Promise<GoogleTaskList[]> {
    const taskLists = await this.googleTasksService.getTaskLists();
    return taskLists.map(taskList => this.mapTaskList(taskList));
  }

  @Query(() => [GoogleTask], {
    description: 'Get tasks from a specific task list',
  })
  async googleTasksListTasks(
    @Args('taskListId') taskListId: string,
    @Args('maxResults', { defaultValue: 100 }) maxResults: number,
    @Args('showCompleted', { defaultValue: true }) showCompleted: boolean,
    @Args('showDeleted', { defaultValue: false }) showDeleted: boolean,
    @Args('showHidden', { defaultValue: false }) showHidden: boolean,
    @Args('dueMin', { nullable: true }) dueMin?: string,
    @Args('dueMax', { nullable: true }) dueMax?: string,
    @Args('completedMin', { nullable: true }) completedMin?: string,
    @Args('completedMax', { nullable: true }) completedMax?: string,
  ): Promise<GoogleTask[]> {
    const tasks = await this.googleTasksService.getTasks(
      taskListId,
      maxResults,
      showCompleted,
      showDeleted,
      showHidden,
      dueMin,
      dueMax,
      completedMin,
      completedMax,
    );
    return tasks.map(task => this.mapTask(task));
  }

  @Query(() => [GoogleTaskListWithTasks], {
    description: 'Get all tasks from all task lists',
  })
  async googleTasksListAllTasks(
    @Args('maxResults', { defaultValue: 100 }) maxResults: number,
    @Args('showCompleted', { defaultValue: true }) showCompleted: boolean,
    @Args('showDeleted', { defaultValue: false }) showDeleted: boolean,
    @Args('showHidden', { defaultValue: false }) showHidden: boolean,
    @Args('dueMin', { nullable: true }) dueMin?: string,
    @Args('dueMax', { nullable: true }) dueMax?: string,
    @Args('completedMin', { nullable: true }) completedMin?: string,
    @Args('completedMax', { nullable: true }) completedMax?: string,
  ): Promise<GoogleTaskListWithTasks[]> {
    const allTasksData = await this.googleTasksService.getAllTasks(
      maxResults,
      showCompleted,
      showDeleted,
      showHidden,
      dueMin,
      dueMax,
      completedMin,
      completedMax,
    );
    return allTasksData.map(item => ({
      taskList: this.mapTaskList(item.taskList),
      tasks: item.tasks.map(task => this.mapTask(task)),
    }));
  }

  @Query(() => GoogleTask, {
    description: 'Get a specific task by ID',
    nullable: true,
  })
  async googleTasksGetTask(
    @Args('taskListId') taskListId: string,
    @Args('taskId') taskId: string,
  ): Promise<GoogleTask | null> {
    const task = await this.googleTasksService.getTask(taskListId, taskId);
    return task ? this.mapTask(task) : null;
  }  @Mutation(() => GoogleTask, {
    description: 'Create a new task',
  })
  async googleTasksCreateTask(
    @Args('input') input: CreateTaskInput,
  ): Promise<GoogleTask> {
    const task = await this.googleTasksService.createTask(input.taskListId, {
      title: input.title,
      notes: input.notes,
      due: input.due,
      parent: input.parent,
      previous: input.previous,
    });
    return this.mapTask(task);
  }

  @Mutation(() => GoogleTask, {
    description: 'Update an existing task',
  })
  async googleTasksUpdateTask(
    @Args('input') input: UpdateTaskInput,
  ): Promise<GoogleTask> {
    const task = await this.googleTasksService.updateTask(input.taskListId, input.taskId, {
      title: input.title,
      notes: input.notes,
      status: input.status,
      due: input.due,
      completed: input.completed,
    });
    return this.mapTask(task);
  }

  @Mutation(() => Boolean, {
    description: 'Delete a task',
  })
  async googleTasksDeleteTask(
    @Args('taskListId') taskListId: string,
    @Args('taskId') taskId: string,
  ): Promise<boolean> {
    try {
      await this.googleTasksService.deleteTask(taskListId, taskId);
      return true;
    } catch (error) {
      return false;
    }
  }

  @Mutation(() => GoogleTask, {
    description: 'Mark a task as completed',
  })
  async googleTasksCompleteTask(
    @Args('taskListId') taskListId: string,
    @Args('taskId') taskId: string,
  ): Promise<GoogleTask> {
    const task = await this.googleTasksService.completeTask(taskListId, taskId);
    return this.mapTask(task);
  }

  @Mutation(() => GoogleTask, {
    description: 'Mark a task as incomplete',
  })
  async googleTasksUncompleteTask(
    @Args('taskListId') taskListId: string,
    @Args('taskId') taskId: string,
  ): Promise<GoogleTask> {
    const task = await this.googleTasksService.uncompleteTask(taskListId, taskId);
    return this.mapTask(task);
  }
}
