# Estándar de Nombres GraphQL

Este documento define el estándar de nombres utilizado en el workspace para mantener consistencia en las APIs GraphQL.

## Patrón de Nomenclatura

**Estructura General**: `google{Servicio}{Acción}`

- **google**: Prefijo que identifica que es un servicio de Google
- **{Servicio}**: Nombre del servicio de Google (Tasks, Calendar, Drive, etc.)
- **{Acción}**: Verbo que describe la acción específica

## Servicios Implementados

### Google Tasks

#### Queries
- `googleTasksListTaskLists` - Obtener todas las listas de tareas
- `googleTasksListTasks` - Obtener tareas de una lista específica
- `googleTasksListAllTasks` - Obtener todas las tareas de todas las listas
- `googleTasksGetTask` - Obtener una tarea específica por ID

#### Mutations
- `googleTasksCreateTask` - Crear una nueva tarea
- `googleTasksUpdateTask` - Actualizar una tarea existente
- `googleTasksDeleteTask` - Eliminar una tarea
- `googleTasksCompleteTask` - Marcar tarea como completada
- `googleTasksUncompleteTask` - Marcar tarea como incompleta

### Google Calendar

#### Queries
- `googleCalendarListEvents` - Obtener eventos de calendario básicos
- `googleCalendarListEntries` - Obtener entradas de calendario con filtros avanzados

#### Mutations (Futuras)
- `googleCalendarCreateEvent` - Crear un nuevo evento
- `googleCalendarUpdateEvent` - Actualizar un evento existente
- `googleCalendarDeleteEvent` - Eliminar un evento

## Ejemplos de Futuros Servicios

### Google Drive
- `googleDriveListFiles` - Listar archivos
- `googleDriveUploadFile` - Subir archivo
- `googleDriveDownloadFile` - Descargar archivo
- `googleDriveDeleteFile` - Eliminar archivo

### Google Gmail
- `googleGmailListMessages` - Listar mensajes
- `googleGmailSendMessage` - Enviar mensaje
- `googleGmailDeleteMessage` - Eliminar mensaje

### Google Sheets
- `googleSheetsGetSpreadsheet` - Obtener hoja de cálculo
- `googleSheetsUpdateValues` - Actualizar valores
- `googleSheetsCreateSpreadsheet` - Crear nueva hoja

## Reglas de Nomenclatura

1. **Siempre usar camelCase**
2. **Comenzar con 'google'**
3. **Seguir con el nombre del servicio en Pascal Case** (Tasks, Calendar, Drive, etc.)
4. **Terminar con un verbo que describa la acción**
5. **Para operaciones CRUD usar verbos estándar**:
   - `List` - Para obtener múltiples elementos
   - `Get` - Para obtener un elemento específico
   - `Create` - Para crear un nuevo elemento
   - `Update` - Para actualizar un elemento existente
   - `Delete` - Para eliminar un elemento

## Beneficios de este Estándar

1. **Consistencia**: Todos los servicios siguen el mismo patrón
2. **Autodocumentación**: El nombre indica claramente qué servicio y acción
3. **Escalabilidad**: Fácil añadir nuevos servicios manteniendo el patrón
4. **Organización**: Agrupación lógica por servicio de Google
5. **Facilidad de uso**: Los desarrolladores pueden predecir nombres de métodos

## Implementación

Al agregar nuevos servicios de Google APIs:

1. Identificar el servicio (ej: Docs, Slides, Photos)
2. Definir las acciones necesarias
3. Aplicar el patrón: `google{Servicio}{Acción}`
4. Actualizar esta documentación

## Mantenimiento

- Revisar periódicamente la consistencia de nombres
- Actualizar documentación cuando se agreguen nuevos servicios
- Mantener coherencia en descripciones de queries y mutations
