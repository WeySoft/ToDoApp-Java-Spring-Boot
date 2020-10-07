import { Component, OnInit } from "@angular/core";
import { ToDoItemsService, AuthenticationService } from "src/app/service/api";
import { ToDoItem, User } from "src/app/model/models";
import { concatMap } from "rxjs/operators";
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: "app-todo",
  templateUrl: "./todo.component.html",
  styleUrls: ["./todo.component.scss"]
})
export class TodoComponent implements OnInit {
  completedToDoItems: ToDoItem[] = [];
  activeToDoItems: ToDoItem[] = [];
  allTodoItems: ToDoItem[];
  newToDoItem = new ToDoItem();
  currentUser: User;

  constructor(
    private _notificationService : NotificationService,
    private _TodoItemsService: ToDoItemsService,
    private _AuthenticationService: AuthenticationService
  ) {
    this._AuthenticationService.currentUser
      .pipe(
        concatMap(usr => {
          this.currentUser = usr;
          return this._TodoItemsService.todoItemsByUserID(usr.id);
        })
      )
      .subscribe(toDoItems => {
        this.sortToDoItems(toDoItems);
      });
  }

  ngOnInit(): void {}

  createNewToDoItem() {
    this.newToDoItem.user = this.currentUser;
    console.log(this.newToDoItem);
    this._TodoItemsService.apiToDoItemsPost(this.newToDoItem).subscribe(
      result => {
        this.activeToDoItems.push(result);
      },
      error => {
        //TODO: Notification
        this._notificationService.showNotification('Fehler beim Erstellen', 'Error');
      }
    );
    this.newToDoItem = new ToDoItem();
  }

  deleteToDoItem(item: ToDoItem) {
    //nested subscriptions - race conditions3

    // this._TodoItemsService.apiToDoItemsIdDelete(item.id).subscribe(() => {
    //   this._TodoItemsService.apiToDoItemsGet().subscribe(res => this.allTodoItems = res);
    // });

    this._TodoItemsService
      .apiToDoItemsIdDelete(item.id)
      .pipe(
        concatMap(() => {
          //TODO NOTIFICATION
          this._notificationService.showNotification('Erfolgreich gelöscht', 'Success');
          return this._TodoItemsService.todoItemsByUserID(this.currentUser.id);
        })
      )
      .subscribe(toDoItems => {
        this.sortToDoItems(toDoItems);
      });
  }

  completeToDoItem(item: ToDoItem) {
    item.isCompleted = true;
    this._TodoItemsService
      .apiToDoItemsIdPut(item.id, item)
      .pipe(
        concatMap(() => {
          return this._TodoItemsService.todoItemsByUserID(this.currentUser.id);
        })
      )
      .subscribe(toDoItems => {
        this.sortToDoItems(toDoItems);
      });
  }

  sortToDoItems(items: ToDoItem[]) {
    this.activeToDoItems = [];
    this.completedToDoItems = [];
    items.forEach(toDoItem => {
      if (toDoItem.isCompleted) {
        this.completedToDoItems.push(toDoItem);
      } else {
        this.activeToDoItems.push(toDoItem);
      }
    });
  }
  editedToDoItem(item: ToDoItem) {
    item.user = this.currentUser
    this._TodoItemsService.apiToDoItemsIdPut(item.id, item).pipe(
      concatMap(() => {
        return this._TodoItemsService.todoItemsByUserID(this.currentUser.id);
      })
    )
    .subscribe(toDoItems => {
      this.sortToDoItems(toDoItems);
    });
    console.log(item);
  }
}
