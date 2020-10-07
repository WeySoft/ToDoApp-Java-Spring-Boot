import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { AuthenticationService } from '../service/api';
import { Observable } from 'rxjs';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private _authenticationService: AuthenticationService) {

    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        //add authorization header with jwt token if avaiable 
        const currentUser = this._authenticationService.currentUserValue;
        if (currentUser && currentUser.token){
            request = request.clone({
                setHeaders: {
                    Authorization:`Bearer ${currentUser.token}`
                }
            });
        }
        return next.handle(request);
    }
}