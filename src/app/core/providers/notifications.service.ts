import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class NotificationsService {

  constructor(private snackBar: MatSnackBar) { }

  /**
   * Affiche en bas de page le message d'erreur lié au résultat de l'appel d'une API (success=false)
   * @param dataInfo  Tableau de données lié au message, retour des appels de services (code, libelle, gravité)
   */
  displayErrorAPI(dataInfo: any) {
    this.snackBar.open("ERREUR : " + dataInfo.code + ' - ' + dataInfo.libelle, "", {
      horizontalPosition:"right",
      duration: 4000,
      panelClass: "notificationError"
    });
  }

  /**
   * Affiche en bas de page le message d'erreur passé en paramètre
   * @param message  Message à afficher
   */
  displayError(message: any) {
    this.snackBar.open("ERREUR : " + message, "", {
      horizontalPosition:"right",
      duration: 4000,
      panelClass: "notificationError"
    });
  }

  /**
   * Affiche en bas de page un message de confirmation  lié au résultat de l'appel d'une API (success=true)
   * @param dataInfo  Tableau de données lié au message, retour des appels de services (code, libelle, gravité)
   */
  displaySuccessAPI(dataInfo: any) {
    console.log(dataInfo);
    let action = "";

    this.snackBar.open(dataInfo.libelle, "", {
      horizontalPosition:"right",
      duration: 4000,
      panelClass: "notificationSuccess"
    });
  }

  /**
   * Affiche en bas de page un message d'information
   * @param message  Message à afficher
   */
  displayInfo(message: any) {
    this.snackBar.open(message, "", {
      horizontalPosition:"right",
      duration: 4000,
      panelClass: "notificationInfo"
    });
  }


  
  
}
