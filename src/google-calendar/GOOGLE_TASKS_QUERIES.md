# Google Tasks GraphQL Queries

Este documento contiene ejemplos de consultas y mutaciones GraphQL para interactuar con Google Tasks.

**ESTÁNDAR DE NOMBRES**: Todos los servicios GraphQL siguen el patrón `google{Servicio}{Acción}` para mantener consistencia.

## Queries (Consultas)

### 1. Obtener todas las listas de tareas

```graphql
query GetTaskLists {
  googleTasksListTaskLists {
    id
    title
    updated
    selfLink
    etag
    kind
  }
}
```

### 2. Obtener tareas de una lista específica

```graphql
query GetTasks($taskListId: String!) {
  googleTasksListTasks(
    taskListId: $taskListId
    maxResults: 50
    showCompleted: true
    showDeleted: false
    showHidden: false
  ) {
    id
    title
    notes
    status
    due
    completed
    updated
    parent
    position
    selfLink
    etag
    kind
    deleted
  }
}
```

Variables:
```json
{
  "taskListId": "your-task-list-id"
}
```

### 3. Obtener todas las tareas de todas las listas

```graphql
query GetAllTasks {
  googleTasksListAllTasks(
    maxResults: 100
    showCompleted: true
    showDeleted: false
    showHidden: false
  ) {
    taskList {
      id
      title
      updated
    }
    tasks {
      id
      title
      notes
      status
      due
      completed
      updated
      parent
      position
      deleted
    }
  }
}
```

### 4. Obtener una tarea específica

```graphql
query GetTask($taskListId: String!, $taskId: String!) {
  googleTasksGetTask(taskListId: $taskListId, taskId: $taskId) {
    id
    title
    notes
    status
    due
    completed
    updated
    parent
    position
    selfLink
    etag
    kind
    deleted
  }
}
```

Variables:
```json
{
  "taskListId": "your-task-list-id",
  "taskId": "your-task-id"
}
```

### 5. Filtrar tareas por fecha de vencimiento

```graphql
query GetTasksByDueDate(
  $taskListId: String!
  $dueMin: String
  $dueMax: String
) {
  googleTasksListTasks(
    taskListId: $taskListId
    dueMin: $dueMin
    dueMax: $dueMax
    showCompleted: false
  ) {
    id
    title
    notes
    status
    due
    completed
  }
}
```

Variables:
```json
{
  "taskListId": "your-task-list-id",
  "dueMin": "2024-01-01T00:00:00.000Z",
  "dueMax": "2024-12-31T23:59:59.999Z"
}
```

## Mutations (Mutaciones)

### 1. Crear una nueva tarea

```graphql
mutation CreateTask($input: CreateTaskInput!) {
  googleTasksCreateTask(input: $input) {
    id
    title
    notes
    status
    due
    completed
    updated
    parent
    position
    selfLink
  }
}
```

Variables:
```json
{
  "input": {
    "taskListId": "your-task-list-id",
    "title": "Nueva tarea",
    "notes": "Descripción de la tarea",
    "due": "2024-12-31T23:59:59.999Z"
  }
}
```

### 2. Actualizar una tarea existente

```graphql
mutation UpdateTask($input: UpdateTaskInput!) {
  googleTasksUpdateTask(input: $input) {
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

Variables:
```json
{
  "input": {
    "taskListId": "your-task-list-id",
    "taskId": "your-task-id",
    "title": "Título actualizado",
    "notes": "Notas actualizadas",
    "status": "needsAction"
  }
}
```

### 3. Marcar tarea como completada

```graphql
mutation CompleteTask($taskListId: String!, $taskId: String!) {
  googleTasksCompleteTask(taskListId: $taskListId, taskId: $taskId) {
    id
    title
    status
    completed
    updated
  }
}
```

Variables:
```json
{
  "taskListId": "your-task-list-id",
  "taskId": "your-task-id"
}
```

### 4. Marcar tarea como incompleta

```graphql
mutation UncompleteTask($taskListId: String!, $taskId: String!) {
  googleTasksUncompleteTask(taskListId: $taskListId, taskId: $taskId) {
    id
    title
    status
    completed
    updated
  }
}
```

Variables:
```json
{
  "taskListId": "your-task-list-id",
  "taskId": "your-task-id"
}
```

### 5. Eliminar una tarea

```graphql
mutation DeleteTask($taskListId: String!, $taskId: String!) {
  googleTasksDeleteTask(taskListId: $taskListId, taskId: $taskId)
}
```

Variables:
```json
{
  "taskListId": "your-task-list-id",
  "taskId": "your-task-id"
}
```

## Crear subtareas

Para crear una subtarea, usa el campo `parent` en `CreateTaskInput`:

```graphql
mutation CreateSubtask($input: CreateTaskInput!) {
  createGoogleTask(input: $input) {
    id
    title
    parent
    position
  }
}
```

Variables:
```json
{
  "input": {
    "taskListId": "your-task-list-id",
    "title": "Subtarea",
    "parent": "parent-task-id"
  }
}
```

## Tipos de Status disponibles

- `needsAction`: La tarea necesita acción (no completada)
- `completed`: La tarea está completada

## Notas importantes

1. **Autenticación**: Asegúrate de que el servicio GoogleAuthService esté configurado correctamente con las credenciales de OAuth2.

2. **Task List ID**: Para obtener el ID de la lista de tareas, primero ejecuta la query `googleTaskLists`.

3. **Fechas**: Todas las fechas deben estar en formato ISO 8601 (ejemplo: "2024-12-31T23:59:59.999Z").

4. **Filtros**: Los parámetros `showCompleted`, `showDeleted`, y `showHidden` te permiten controlar qué tareas se muestran.

5. **Límites**: Usa `maxResults` para limitar el número de resultados devueltos.

## URL del GraphQL Playground

Una vez que el servidor esté ejecutándose, puedes acceder al GraphQL Playground en:
```
http://localhost:3000/graphql
```

## Google Calendar Queries

### 1. Obtener eventos de calendario

```graphql
query GetCalendarEvents($calendarId: String!, $maxResults: Int!) {
  googleCalendarListEvents(calendarId: $calendarId, maxResults: $maxResults) {
    id
    summary
    description
    startTime
    endTime
    location
    htmlLink
  }
}
```

Variables:
```json
{
  "calendarId": "primary",
  "maxResults": 10
}
```

### 2. Obtener entradas de calendario con filtros

```graphql
query GetCalendarEntries(
  $calendarId: String!
  $maxResults: Int!
  $eventTypes: [GoogleCalendarEventType!]
  $timeMin: String
) {
  googleCalendarListEntries(
    calendarId: $calendarId
    maxResults: $maxResults
    eventTypes: $eventTypes
    timeMin: $timeMin
  ) {
    id
    summary
    description
    startTime
    endTime
    location
    htmlLink
    eventType
  }
}
```

Variables:
```json
{
  "calendarId": "primary",
  "maxResults": 10,
  "eventTypes": ["DEFAULT", "BIRTHDAY", "FOCUS_TIME"],
  "timeMin": "2024-01-01T00:00:00.000Z"
}
```

## Tipos de Eventos de Calendario disponibles

- `DEFAULT`: Evento predeterminado
- `FOCUS_TIME`: Tiempo de concentración
- `OUT_OF_OFFICE`: Fuera de la oficina
- `WORKING_LOCATION`: Ubicación de trabajo
- `BIRTHDAY`: Cumpleaños
