# Google Tasks Service Documentation

## Overview

The Google Tasks Service provides comprehensive integration with Google Tasks API, allowing you to manage task lists, tasks, and their statuses through a GraphQL interface. This service handles both task lists and individual tasks with full CRUD operations.

## Features

- **Task List Management**: Create, read, update, and delete task lists
- **Task Operations**: Full CRUD operations for tasks
- **Task Status Management**: Mark tasks as completed/incomplete
- **Advanced Filtering**: Filter tasks by status, due dates, completion dates
- **GraphQL Integration**: Complete GraphQL schema and resolvers
- **Type Safety**: Full TypeScript support with strongly typed schemas

## GraphQL Schema

### Types

#### GoogleTask
```graphql
type GoogleTask {
  id: String
  title: String!
  notes: String
  status: GoogleTaskStatus!
  due: String
  completed: String
  parent: String
  position: String
  updated: String
  selfLink: String
  etag: String
}
```

#### GoogleTaskList
```graphql
type GoogleTaskList {
  id: String!
  title: String!
  updated: String
  selfLink: String
  etag: String
}
```

#### GoogleTaskListWithTasks
```graphql
type GoogleTaskListWithTasks {
  taskList: GoogleTaskList!
  tasks: [GoogleTask!]!
}
```

#### GoogleTaskStatus
```graphql
enum GoogleTaskStatus {
  NEEDS_ACTION
  COMPLETED
}
```

### Input Types

#### CreateTaskInput
```graphql
input CreateTaskInput {
  title: String!
  notes: String
  due: String
  parent: String
  previous: String
}
```

#### UpdateTaskInput
```graphql
input UpdateTaskInput {
  title: String
  notes: String
  status: String
  due: String
  completed: String
}
```

## GraphQL Queries and Mutations

Following the standardized naming convention: `google{Service}{Action}`

### Queries

#### List Task Lists
```graphql
query GoogleTasksListTaskLists {
  googleTasksListTaskLists {
    id
    title
    updated
  }
}
```

#### List Tasks from Specific List
```graphql
query GoogleTasksListTasks(
  $taskListId: String!
  $maxResults: Int = 100
  $showCompleted: Boolean = true
  $showDeleted: Boolean = false
  $showHidden: Boolean = false
  $dueMin: String
  $dueMax: String
  $completedMin: String
  $completedMax: String
) {
  googleTasksListTasks(
    taskListId: $taskListId
    maxResults: $maxResults
    showCompleted: $showCompleted
    showDeleted: $showDeleted
    showHidden: $showHidden
    dueMin: $dueMin
    dueMax: $dueMax
    completedMin: $completedMin
    completedMax: $completedMax
  ) {
    id
    title
    notes
    status
    due
    completed
    updated
  }
}
```

#### Get All Tasks from All Lists
```graphql
query GoogleTasksGetAllTasks(
  $maxResults: Int = 100
  $showCompleted: Boolean = true
) {
  googleTasksGetAllTasks(
    maxResults: $maxResults
    showCompleted: $showCompleted
  ) {
    taskList {
      id
      title
    }
    tasks {
      id
      title
      status
      due
      completed
    }
  }
}
```

#### Get Specific Task
```graphql
query GoogleTasksGetTask($taskListId: String!, $taskId: String!) {
  googleTasksGetTask(taskListId: $taskListId, taskId: $taskId) {
    id
    title
    notes
    status
    due
    completed
    parent
  }
}
```

### Mutations

#### Create Task
```graphql
mutation GoogleTasksCreateTask(
  $taskListId: String!
  $taskData: CreateTaskInput!
) {
  googleTasksCreateTask(taskListId: $taskListId, taskData: $taskData) {
    id
    title
    notes
    status
    due
    updated
  }
}
```

#### Update Task
```graphql
mutation GoogleTasksUpdateTask(
  $taskListId: String!
  $taskId: String!
  $updateData: UpdateTaskInput!
) {
  googleTasksUpdateTask(
    taskListId: $taskListId
    taskId: $taskId
    updateData: $updateData
  ) {
    id
    title
    notes
    status
    due
    completed
    updated
  }
}
```

#### Delete Task
```graphql
mutation GoogleTasksDeleteTask($taskListId: String!, $taskId: String!) {
  googleTasksDeleteTask(taskListId: $taskListId, taskId: $taskId)
}
```

#### Complete Task
```graphql
mutation GoogleTasksCompleteTask($taskListId: String!, $taskId: String!) {
  googleTasksCompleteTask(taskListId: $taskListId, taskId: $taskId) {
    id
    title
    status
    completed
  }
}
```

#### Uncomplete Task
```graphql
mutation GoogleTasksUncompleteTask($taskListId: String!, $taskId: String!) {
  googleTasksUncompleteTask(taskListId: $taskListId, taskId: $taskId) {
    id
    title
    status
    completed
  }
}
```

## Service API Reference

### GoogleTasksService

#### Task List Methods

##### `getTaskLists(): Promise<tasks_v1.Schema$TaskList[]>`
Retrieves all task lists for the authenticated user.

#### Task Methods

##### `getTasks(taskListId, options): Promise<tasks_v1.Schema$Task[]>`
Retrieves tasks from a specific task list with filtering options.

**Parameters:**
- `taskListId` (string): The task list ID
- `maxResults` (number, optional): Maximum results (default: 100)
- `showCompleted` (boolean, optional): Include completed tasks (default: true)
- `showDeleted` (boolean, optional): Include deleted tasks (default: false)
- `showHidden` (boolean, optional): Include hidden tasks (default: false)
- `dueMin` (string, optional): Minimum due date (ISO format)
- `dueMax` (string, optional): Maximum due date (ISO format)
- `completedMin` (string, optional): Minimum completion date (ISO format)
- `completedMax` (string, optional): Maximum completion date (ISO format)

##### `getAllTasks(options): Promise<{taskList, tasks}[]>`
Retrieves all tasks from all task lists with the same filtering options as `getTasks`.

##### `getTask(taskListId, taskId): Promise<tasks_v1.Schema$Task | null>`
Retrieves a specific task by ID.

##### `createTask(taskListId, taskData): Promise<tasks_v1.Schema$Task>`
Creates a new task in the specified task list.

##### `updateTask(taskListId, taskId, updateData): Promise<tasks_v1.Schema$Task>`
Updates an existing task.

##### `deleteTask(taskListId, taskId): Promise<void>`
Deletes a task.

##### `completeTask(taskListId, taskId): Promise<tasks_v1.Schema$Task>`
Marks a task as completed.

##### `uncompleteTask(taskListId, taskId): Promise<tasks_v1.Schema$Task>`
Marks a task as incomplete.

## Usage Examples

### Service Usage
```typescript
import { GoogleTasksService } from './google-tasks.service';

@Injectable()
export class MyService {
  constructor(private tasksService: GoogleTasksService) {}

  async getMyTasks() {
    const taskLists = await this.tasksService.getTaskLists();
    const firstList = taskLists[0];
    
    if (firstList?.id) {
      const tasks = await this.tasksService.getTasks(firstList.id);
      return tasks;
    }
  }

  async createNewTask() {
    const taskLists = await this.tasksService.getTaskLists();
    const task = await this.tasksService.createTask(taskLists[0].id!, {
      title: 'New Task',
      notes: 'Task description',
      due: new Date().toISOString()
    });
    return task;
  }
}
```

### GraphQL Client Usage
```javascript
// Get all task lists
const GET_TASK_LISTS = gql`
  query {
    googleTasksListTaskLists {
      id
      title
    }
  }
`;

// Create a new task
const CREATE_TASK = gql`
  mutation CreateTask($taskListId: String!, $taskData: CreateTaskInput!) {
    googleTasksCreateTask(taskListId: $taskListId, taskData: $taskData) {
      id
      title
      status
    }
  }
`;

// Usage
const { data } = await apolloClient.mutate({
  mutation: CREATE_TASK,
  variables: {
    taskListId: "your-task-list-id",
    taskData: {
      title: "Complete documentation",
      notes: "Write comprehensive docs for the API",
      due: "2025-06-01T10:00:00.000Z"
    }
  }
});
```

## Date Handling

All date fields use ISO 8601 format (RFC3339):
- `due`: Task due date and time
- `completed`: Task completion timestamp
- `updated`: Last modification timestamp

Example: `"2025-05-30T15:30:00.000Z"`

## Task Status Management

Tasks have two primary statuses:
- `NEEDS_ACTION`: Task is pending/incomplete
- `COMPLETED`: Task has been completed

Use the convenience methods `completeTask()` and `uncompleteTask()` for status changes, or use `updateTask()` with status field.

## Error Handling

The service provides comprehensive error handling for:
- Invalid task list IDs
- Non-existent tasks
- Authentication errors
- API rate limiting
- Network connectivity issues

All errors are logged and re-thrown for proper handling at the resolver level.

## Related Documentation

- [Google Calendar Service](./README.md)
- [Naming Standards](./NAMING_STANDARD.md)
- [Google Auth Service](../google-auth/README.md)
