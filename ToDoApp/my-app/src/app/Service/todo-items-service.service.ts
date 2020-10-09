import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { ToDoItem, User } from '../model/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoItemsServiceService {
  
   
  @Injectable()
      protected basePath = 'http://localhost:8080/api/todoitem';
   
      constructor(private http: HttpClient) {}
   
      public postToDoItem(todoItem: ToDoItem) {
          return this.http.post<User> (this.basePath, todoItem);
      }
      public getToDoITems(): Observable<ToDoItem[]> {
          return this.http.get<ToDoItem[]>(this.basePath);
      }
      public getToDoItemById(id:number): Observable<ToDoItem> {
          return this.http.get<ToDoItem>(this.basePath + '/'+ id)
      }
      public putToDoItem(todoItem: ToDoItem){
          return this.http.put<ToDoItem>(this.basePath, todoItem);
      }
      public deleteToDoItem(id: number){
          return this.http.delete<ToDoItem> (this.basePath + '/' + id);
    } 
}
