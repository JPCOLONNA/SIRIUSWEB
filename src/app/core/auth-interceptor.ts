import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { MixinService } from './providers/mixin.service'
import { AuthService } from './providers/auth.service'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  /**
   * Constructeur
   * @param mixinService
   */
  constructor(
    private mixinService: MixinService,
    private inj: Injector
  ) { }

  /**
   * Intercepte toutes les requêtes HTTP sortantes et entrantes pour stocker les informations de l'utilisateur connecté par SSO
   * @param req
   * @param next
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  
    // On envoie la requête 
    return next
      .handle(req)
      .do(
      event => { // Pour les requêtes entrantes, on stocke les informations de l'utilisateur 
        if (event instanceof HttpResponse) {
          if (event.headers.get('UserCode')) { // Login windows connecté 
            this.mixinService.storeInSession("UserCode",event.headers.get('UserCode'));
          }
          if (event.headers.get('UserFullName')) { // Nom complet de l'utilisateur connecté 
            this.mixinService.storeInSession("UserFullName",event.headers.get('UserFullName'));
          } 
        }
      },
      error => {
        if (error instanceof HttpErrorResponse) {

          // Récupération du AuthService
          const auth = this.inj.get(AuthService);
          const router = this.inj.get(Router);

          if (error.status === 401 || error.status === 403) {
            if (router) {
              router.navigate['/login'];
            }
          } else if (error.status === 0) {
            if (auth) {
              auth.logout();
            }
          } 
        }
      });
  }
}
