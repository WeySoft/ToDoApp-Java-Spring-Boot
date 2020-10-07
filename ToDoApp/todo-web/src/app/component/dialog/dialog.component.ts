import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToDoItem } from 'src/app/model/models';
import { DialogData } from '../todo-items-list/todo-items-list.component';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  input: string;
  
  
  ngOnInit(): void {
  }
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      
    }

  onNoClick(): void {
    console.log(this.input);
    this.dialogRef.close(this.input);
}

}
