import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class NotificationsService {

  constructor(private snackBar: MatSnackBar) { }

  /**
   * Affiche en bas de page le message d'erreur passé en paramètre
   * @param message  Message d'erreur
   */
  displayError(message: string) {
    let action = "";

    this.snackBar.open("ERREUR : " + message, action, {
      horizontalPosition:"right",
      duration: 4000,
      panelClass: "notificationError"
    });
  }

}
