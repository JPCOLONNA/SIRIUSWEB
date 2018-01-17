import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { ResourcesService } from './resources.service';
import { Subject } from 'rxjs/Rx';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class ExceptionService {

  rsc: any;
  error: Subject<any>;

  private router: Router;

  /**
   * Creates an instance of ExceptionService.
   * @param {Injector} injector
   * @param resourcesService
   */
  constructor(
    private injector: Injector,
    public resourcesService: ResourcesService
  ) {
    this.router = this.injector.get(Router);
    this.rsc = this.resourcesService.get().errors;
    this.error = new Subject<string>();
  }

  /**
   * Handle Exception (à compléter selon les retours de l'API !)
   * @param {*} error
   * @returns {Observable<any>}
   */
  handleException(error: any): Observable<any> {
    let respBody, reject: string;
    if (error instanceof HttpErrorResponse) {
      if ( error.error && error.error.hasOwnProperty('error')) {
        reject = error.error.error;
      } else {
        reject = error.error;
      }
    } else if (typeof error === 'string') {
      reject = error;
    } else if (error._body && typeof error._body === 'string') {
      respBody = JSON.parse(error._body);

      if (respBody.errorValidation) {
        reject = respBody.errorValidation;
      } else {
        reject = respBody.message;
      }
    } else if (error.hasOwnProperty('success')) {
      if (error.hasOwnProperty('ano')) {
        reject = error.ano[0].libelle;
      } else if (error.hasOwnProperty('info')) {
        reject = error.info[0].libelle;
      } else if (error.hasOwnProperty('message')) {
        reject = error.message;
      } else {
        reject = error.libelle;
      }
    } else if (error.hasOwnProperty('error')) {
      reject = error.error;
    } else if (error.status === 0) {
      reject = this.rsc.no_server;
    } else {
      reject = this.rsc.unknown;
    }

    console.log("error = ", error);
    console.error('An error occurred : ', reject);
    return Observable.throw(reject);
  }

  sendError(error: string) {
    this.error.next(error);
  }

  handleError(response: any) {
    const errorArray: Array<any> = response.info;
    if (errorArray) {
      errorArray.forEach(element => {
        this.handleException(element).subscribe(
          (response) => { },
          (error) => {
            this.error.next({ msg: error, type: '0' });
          }
        );
      });
    } else {
      this.handleException(response).subscribe(
        (response) => { },
        (error) => {
          this.error.next({ msg: error, type: '0' });
        }
      );
    }
  }
}
