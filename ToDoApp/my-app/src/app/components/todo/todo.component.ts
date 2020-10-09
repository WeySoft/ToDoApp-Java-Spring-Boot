import { Component, OnInit } from "@angular/core";
import { ToDoItem, User } from 'src/app/model/models';

@Component({
  selector: "app-todo",
  templateUrl: "./todo.component.html",
  styleUrls: ["./todo.component.scss"]
})
export class TodoComponent implements OnInit {
  user = new User();
  newToDoItem = new ToDoItem();
  completedToDoItems: ToDoItem[] = [];
  activeToDoItems: ToDoItem[] = [];
  allTodoItems: ToDoItem[] = [];


  constructor() {
    this.sortToDoItems;
  }

  createNewToDoItem(){
    if(this.newToDoItem.name){
    this.newToDoItem.id = 1;
    this.newToDoItem.isCompleted = false;
    this.newToDoItem.user = this.user;
    console.log(this.newToDoItem, this.allTodoItems)
    this.allTodoItems.push(this.newToDoItem);
    this.activeToDoItems.push(this.newToDoItem);
    console.log(this.newToDoItem, this.activeToDoItems)
  }
  else{
    alert("Bitte geben sie den Namen des ToDos ein!")
  }
    this.newToDoItem = new ToDoItem();
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

  ngOnInit(): void {}
}
