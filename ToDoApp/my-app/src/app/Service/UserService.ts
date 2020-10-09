import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/models';
import { Observable } from 'rxjs';
 
@Injectable()
export class UserService {
    protected basePath = 'http://localhost:8080/api/user';
 
    constructor(private http: HttpClient) {}
 
    public postUser(user: User) {
        return this.http.post<User> (this.basePath, user);
    }
    public getUser(): Observable<User[]> {
        return this.http.get<User[]>(this.basePath);
    }
    public putUser(user: User){
        return this.http.put<User>(this.basePath, user);
    }
    public deleteUser(id: number): Observable<User> {
        return this.http.delete<User> (this.basePath + '/' + id);
    } 
}