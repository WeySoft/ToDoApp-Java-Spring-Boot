import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { ToDoItem } from 'src/app/model/models';
import { DialogComponent } from '../dialog/dialog.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  toDoItem : ToDoItem;
}


@Component({
  selector: 'app-todo-items-list',
  templateUrl: './todo-items-list.component.html',
  styleUrls: ['./todo-items-list.component.scss']
})
export class TodoItemsListComponent implements OnInit {
  // Accepts value from parent with propertybinding in parent-template
  @Input() cardTitle: string;
  @Input() toDoItems: ToDoItem[]= [];

  //Events to emit to parent
  @Output() completedToDoItem = new EventEmitter<ToDoItem>();
  @Output() deletedToDoItem = new EventEmitter<ToDoItem>();
  @Output() editedToDoItem = new EventEmitter<ToDoItem>();

  constructor(public dialog: MatDialog) { }
  dialogToDoItem(item : ToDoItem) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      height: '600px',
      data: {toDoItem: item}
      
    });
    dialogRef.afterClosed().subscribe(res => {
      item.name = res;
      this.editedToDoItem.emit(item);
      console.log(res)
    })
    
  }
  ngOnInit(): void {
  }
  // Emit event with item in parameter to parent if ToDoItem is completed or get deleted
  completeToDoItem(item: ToDoItem){
    this.completedToDoItem.emit(item);
  }
  deleteToDoItem(item: ToDoItem){
    this.deletedToDoItem.emit(item);
  }
}
