import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { ResourcesService } from './resources.service';
import { Subject } from 'rxjs/Rx';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable()
export class ExceptionService {

  rsc: any;
  error: Subject<string>;

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
      reject = error.error;
    } else if (typeof error === 'string') {
      reject = error;
    } else if (typeof error._body === 'string') {
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

    console.error('An error occurred : ', reject);
    return Observable.throw(reject);
  }

  /**
   * Handle Error (validation or error messages)
   * @param {*} model
   * @param {(string | Object)} error
   */
  /*handleError(model: any, error: string | Object) {
    if (typeof error === 'object') {
      for (const prop in error) {

        let modelCopy: any = model;
        const array = prop.split('.');

        if (array.length > 1) {

          while (array.length > 1) {
            if (modelCopy.hasOwnProperty(array[0])) {
              modelCopy = modelCopy[array[0]];
            }
            array.splice(0, 1);
          }

          if (modelCopy.hasOwnProperty(array[0])) {
            modelCopy['_' + array[0]] = error[prop][0];
          }

        } else {
          if (model.hasOwnProperty(prop)) {
            model['_' + prop] = error[prop][0];
          }
        }
      }
    } else {
      model.error = error;
    }
  }*/

  sendError(error: string) {
    this.error.next(error);
  }
}
