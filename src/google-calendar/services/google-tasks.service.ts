import { Injectable } from '@nestjs/common';
import { tasks_v1 } from 'googleapis';
import { GoogleAuthService } from 'src/google-auth/services/google-auth.service';

@Injectable()
export class GoogleTasksService {
  private tasks: tasks_v1.Tasks;

  constructor(private googleAuthService: GoogleAuthService) {
    this.tasks = this.googleAuthService.getTasksClient();
  }

  // Get all task lists for the authenticated user
  async getTaskLists(): Promise<tasks_v1.Schema$TaskList[]> {
    try {
      const res = await this.tasks.tasklists.list();
      return res.data.items || [];
    } catch (error) {
      console.error('Error fetching task lists:', error);
      throw error;
    }
  }

  // Get tasks from a specific task list
  async getTasks(
    taskListId: string,
    maxResults: number = 100,
    showCompleted: boolean = true,
    showDeleted: boolean = false,
    showHidden: boolean = false,
    dueMin?: string, // ISO date string
    dueMax?: string, // ISO date string
    completedMin?: string, // ISO date string
    completedMax?: string, // ISO date string
  ): Promise<tasks_v1.Schema$Task[]> {
    try {
      const requestOptions: tasks_v1.Params$Resource$Tasks$List = {
        tasklist: taskListId,
        maxResults,
        showCompleted,
        showDeleted,
        showHidden,
      };

      if (dueMin) requestOptions.dueMin = dueMin;
      if (dueMax) requestOptions.dueMax = dueMax;
      if (completedMin) requestOptions.completedMin = completedMin;
      if (completedMax) requestOptions.completedMax = completedMax;

      const res = await this.tasks.tasks.list(requestOptions);
      return res.data.items || [];
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  }
  // Get all tasks from all task lists
  async getAllTasks(
    maxResults: number = 100,
    showCompleted: boolean = true,
    showDeleted: boolean = false,
    showHidden: boolean = false,
    dueMin?: string,
    dueMax?: string,
    completedMin?: string,
    completedMax?: string,
  ): Promise<{ taskList: tasks_v1.Schema$TaskList; tasks: tasks_v1.Schema$Task[] }[]> {
    try {
      const taskLists = await this.getTaskLists();
      const allTasksData: { taskList: tasks_v1.Schema$TaskList; tasks: tasks_v1.Schema$Task[] }[] = [];

      for (const taskList of taskLists) {
        if (taskList.id) {
          const tasks = await this.getTasks(
            taskList.id,
            maxResults,
            showCompleted,
            showDeleted,
            showHidden,
            dueMin,
            dueMax,
            completedMin,
            completedMax,
          );
          allTasksData.push({
            taskList,
            tasks,
          });
        }
      }

      return allTasksData;
    } catch (error) {
      console.error('Error fetching all tasks:', error);
      throw error;
    }
  }

  // Get a specific task by ID
  async getTask(taskListId: string, taskId: string): Promise<tasks_v1.Schema$Task | null> {
    try {
      const res = await this.tasks.tasks.get({
        tasklist: taskListId,
        task: taskId,
      });
      return res.data;
    } catch (error) {
      console.error('Error fetching task:', error);
      throw error;
    }
  }

  // Create a new task
  async createTask(
    taskListId: string,
    taskData: {
      title: string;
      notes?: string;
      due?: string;
      parent?: string;
      previous?: string;
    },
  ): Promise<tasks_v1.Schema$Task> {
    try {
      const res = await this.tasks.tasks.insert({
        tasklist: taskListId,
        requestBody: {
          title: taskData.title,
          notes: taskData.notes,
          due: taskData.due,
          parent: taskData.parent,
        },
        parent: taskData.parent,
        previous: taskData.previous,
      });
      return res.data;
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  }

  // Update a task
  async updateTask(
    taskListId: string,
    taskId: string,
    updateData: {
      title?: string;
      notes?: string;
      status?: string;
      due?: string;
      completed?: string;
    },
  ): Promise<tasks_v1.Schema$Task> {
    try {
      const res = await this.tasks.tasks.update({
        tasklist: taskListId,
        task: taskId,
        requestBody: updateData,
      });
      return res.data;
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  }

  // Delete a task
  async deleteTask(taskListId: string, taskId: string): Promise<void> {
    try {
      await this.tasks.tasks.delete({
        tasklist: taskListId,
        task: taskId,
      });
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  }

  // Mark task as completed
  async completeTask(taskListId: string, taskId: string): Promise<tasks_v1.Schema$Task> {
    return this.updateTask(taskListId, taskId, {
      status: 'completed',
      completed: new Date().toISOString(),
    });
  }

  // Mark task as incomplete
  async uncompleteTask(taskListId: string, taskId: string): Promise<tasks_v1.Schema$Task> {
    return this.updateTask(taskListId, taskId, {
      status: 'needsAction',
      completed: undefined,
    });
  }
}
