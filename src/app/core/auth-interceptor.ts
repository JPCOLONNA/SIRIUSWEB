import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { MixinService } from './providers/mixin.service'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  /**
   * Constructeur
   * @param mixinService
   */
  constructor(private mixinService: MixinService) { }

  /**
   * Intercepte toutes les requêtes HTTP sortantes et entrantes pour ajouter/stocker le token d'authentification
   * @param req
   * @param next
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // Récupération du token d'authentification
    let authHeader: string = this.mixinService.getAuthorizationHeader();

    // Clonage de la requête sortante car elle est imutable : on est obligé de la cloner pour la modifier
    let authReq = req.clone();
    if (authHeader) { // Si il existe un token en session, on l'ajoute à la requête sortante dans un header spécifique
      if (authHeader.length > 0) {
        authReq = req.clone({ headers: req.headers.set('Authorization', "Bearer " + authHeader) });
      }
    }

    // On envoie ensuite la requête modifier à la place de la requête originale
    return next
      .handle(authReq)
      .do(
      (event: HttpEvent<any>) => { // Pour les requêtes entrantes, on stocke le nouveau token
        if (event instanceof HttpResponse) {
          if (event.headers.get('Authorization')) { // Si le token est présent dans les headers de la réponse
            this.mixinService.setAuthorizationHeader(event.headers.get('Authorization'));
          } else {
            if (event.body.token) { // Sinon il doit être dans le corps de la réponse
              this.mixinService.setAuthorizationHeader(event.body.token);
            }
          }
        }
      },
      error => {
        if (error instanceof HttpErrorResponse) {
          console.log(error);

          // FIX ME: A voir avec Jérémy
          // if (error.status === 401 || error.status === 403) {
            // this.mixinService.clearSession();
          // }
          // return this.exceptionService.handleException(error);
        }
      });
  }
}
