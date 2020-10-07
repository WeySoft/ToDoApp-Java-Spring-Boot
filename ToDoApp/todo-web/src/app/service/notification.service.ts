import { Injectable } from "@angular/core";
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class NotificationService {
    notificationType: string;
    
    constructor(private _snackBar: MatSnackBar) {}

    showNotification(message: string, type: string) {
        if (type == 'Success') {
            this.notificationType = 'success-notification'            
        }   else if (type == 'Error') {
            this.notificationType = 'error-notification'
        }

        this._snackBar.open(message, null, {
            duration: 3000,
            panelClass: [this.notificationType]
        })
    }
}