export * from './authentication.service';
import { AuthenticationService } from './authentication.service';
export * from './toDoItems.service';
import { ToDoItemsService } from './toDoItems.service';
export * from './user.service';
import { UserService } from './user.service';
export const APIS = [AuthenticationService, ToDoItemsService, UserService];
