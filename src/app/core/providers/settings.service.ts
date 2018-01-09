import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import 'rxjs/add/operator/map';

/**
 * Service to handle global application settings
 * @export
 * @class SettingsService
 */
@Injectable()
export class SettingsService {

  config: any;
  environment: any;

  /**
   * Crée une instance de SettingsService
   * @param {HttpClient} http
   */
  constructor(
    private http: HttpClient
  ) { }

  /**
   * Load Application Settings
   * @param {() => any} [callback]
   * @return {Promise<any>}
   */
  load(callback?: () => any) {
    this.loadEnvironmentParams();
    const headers = new HttpHeaders();
    headers.append('Cache-Control', 'no-cache');
    headers.append('Pragma', 'no-cache');

    return new Promise(resolve => {
      this.http
        .get('resources/_settings.json', { headers: headers })
        .subscribe(
          (config) => {
            this.config = config;
            resolve(true);
          },
          (error) => console.log(error),
          () => console.log('Settings loaded')
        );
    });
  }

  /**
   * Load Application Environment Settings
   * @param {() => any} [callback]
   * @return {Promise<any>}
   */
  loadEnvironmentParams(callback?: () => any) {
    const headers = new HttpHeaders();
    headers.append('Cache-Control', 'no-cache');
    headers.append('Pragma', 'no-cache');

    let url_environment = 'resources/_environment.json';
    if (environment.production) {
      url_environment = 'resources/_environment-prod.json';
    }

    return new Promise(resolve => {
      console.log('env', environment.production);
      this.http
        .get(url_environment, { headers: headers })
        .subscribe(
          (env) => {
            this.environment = env;
            resolve(true);
          },
          (error) => console.log(error),
          () => console.log('Environment settings loaded')
        );
    });
  }

  /**
   * Lecture des ressources
   * @return {any}
   */
  get() {
    return this.config;
  }

  /**
   * Lecture des ressources
   * @return {any}
   */
  getEnvironnement() {
    return this.environment;
  }

  /**
   * Stockage des ressources
   * @param {*} settings
   */
  store(settings: any) {
    sessionStorage.setItem('app_settings', null);
    if (settings) {
      sessionStorage.setItem('app_settings', settings);
    }
  }
}
