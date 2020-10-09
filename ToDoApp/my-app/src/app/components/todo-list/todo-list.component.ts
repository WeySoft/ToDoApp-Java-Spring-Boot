import { Component, Input, OnInit } from '@angular/core';
import { ToDoItem } from 'src/app/model/models';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  // Accepts value from parent with propertybinding in parent-template
  @Input() cardTitle: string;
  @Input() toDoItems: ToDoItem[]= [];
  constructor() { }

  ngOnInit(): void {
  }

}
