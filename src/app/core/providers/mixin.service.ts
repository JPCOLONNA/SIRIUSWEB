import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Validators } from '@angular/forms';

//import { Assure } from '../../shared/models/assure';
//import { Portal } from '../../shared/models/portal';

import createNumberMask from 'text-mask-addons/dist/createNumberMask';

@Injectable()
export class MixinService {
    private authorizationToken: string;

    //private currentUser: Assure;

    //private portal: Portal;

    /**
     * Creates an instance of MixinService.
     */
    constructor() {
        
    }

    storeInSession(key: string, data: any) {
        if (data) {
            sessionStorage.setItem(key, JSON.stringify(data));
        }
    }

    removeFromSession(key: string) {
        sessionStorage.removeItem(key);
    }

    getFromSession(key: string): string {
        return sessionStorage.getItem(key);
    }

    storeInLocalStorage(key: string, data: any) {
        if (data) {
            localStorage.setItem(key, JSON.stringify(data));
        }
    }

    removeFromLocalStorage(key: string) {
        localStorage.removeItem(key);
    }

    getFromLocalStorage(key: string): string {
        return localStorage.getItem(key);
    }

    getDefaultHeaders() {
        return new HttpHeaders()
            .append('Accept', 'application/json')
            .append('Content-Type', 'application/json')
            .append("Cache-Control", "no-cache, no-store, must-revalidate")
            .append("Pragma", "no-cache");
    }
    getAuthorizationHeader(): string {
        if (this.authorizationToken && this.authorizationToken.length > 0) {
            return this.authorizationToken;
        } else {
            return this.getFromSession('access_token');
        }
    }

    setAuthorizationHeader(token: string) {
        this.authorizationToken = token;
        sessionStorage.setItem('access_token', token);
    }

    clearSession() {
        this.removeFromSession('actions');
        //this.removeFromSession('app_actions');
        //this.removeFromSession('app_portal');
        //this.currentUser = null;
    }

    /*setCurrentUser(user: Assure) {
        this.currentUser = user;
        this.storeInSession('app_user', user);
    }

    getCurrentUser(): Assure {
        if (this.currentUser && this.currentUser.idAssure.length > 0) {
            return this.currentUser;
        } else {
            return JSON.parse(this.getFromSession('app_user'));
        }
    }*/

    setUserDepartement(dep: string) {
        this.storeInSession('app_user_departement', dep);
    }

    getUserDepartement(): string {
        return JSON.parse(this.getFromSession('app_user_departement'));
    }

    /*getPortalInfos(): Portal {
        if (this.portal && this.portal.name.length > 0) {
            return this.portal;
        } else {
            return JSON.parse(this.getFromSession('app_portal'));
        }
    }

    setPortalInfos(portal: Portal) {
        this.portal = portal;
        this.storeInSession('app_portal', portal);
    }*/

    getMasks() {
        return {
            nb_children: createNumberMask({
                prefix: '',
                integerLimit: 2,
            }),
            tel: ['0', /[67]/, ' ', /\d/, /\d/, ' ', /\d/, /\d/, ' ', /\d/, /\d/, ' ', /\d/, /\d/],
            tel_fixe: ['0', /[1234589]/, ' ', /\d/, /\d/, ' ', /\d/, /\d/, ' ', /\d/, /\d/, ' ', /\d/, /\d/],
            codePostal: createNumberMask({
                prefix: '',
                includeThousandsSeparator: false,
                integerLimit: 5,
                allowLeadingZeroes: true
            }),
            six: createNumberMask({
                prefix: '',
                includeThousandsSeparator: false,
                integerLimit: 6,
                allowLeadingZeroes: true
            }),
            one: createNumberMask({
                prefix: '',
                integerLimit: 1,
                allowLeadingZeroes: true
            }),
            two: createNumberMask({
                prefix: '',
                integerLimit: 2,
                allowLeadingZeroes: true
            }),
            three: createNumberMask({
                prefix: '',
                integerLimit: 3,
                allowLeadingZeroes: true
            }),
            ident: createNumberMask({
                prefix: '',
                integerLimit: 10,
                includeThousandsSeparator: false,
                allowLeadingZeroes: true
            }),
            date: [/[0-3]/, /[0-9]/, '/', /[0-1]/, /[0-9]/, '/', /\d/, /\d/, /\d/, /\d/],
            numSS: [/[1-2]/, ' ', /\d/, /\d/, ' ', /[0-1]/, /\d/, ' ', /\d/, /\d/, ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/],
            iban: [/[A-Za-z]/, /[A-Za-z]/, /[A-Za-z0-9]/, /[A-Za-z0-9]/, ' ', /[A-Za-z0-9]/, /[A-Za-z0-9]/, /[A-Za-z0-9]/, /[A-Za-z0-9]/, ' ', /[A-Za-z0-9]/, /[A-Za-z0-9]/, /[A-Za-z0-9]/, /[A-Za-z0-9]/, ' ', /[A-Za-z0-9]/, /[A-Za-z0-9]/, /[A-Za-z0-9]/, /[A-Za-z0-9]/, ' ', /[A-Za-z0-9]/, /[A-Za-z0-9]/, /[A-Za-z0-9]/, /[A-Za-z0-9]/, ' ', /[A-Za-z0-9]/, /[A-Za-z0-9]/, /[A-Za-z0-9]/, /[A-Za-z0-9]/, ' ', /[A-Za-z0-9]/, /[A-Za-z0-9]/, /[A-Za-z0-9]/, /[A-Za-z0-9]/, ' ', /[A-Za-z0-9]/, /[A-Za-z0-9]/, /[A-Za-z0-9]/, /[A-Za-z0-9]/, ' ', /[A-Za-z0-9]/, /[A-Za-z0-9]/],
            bic: [/[A-Za-z]/, /[A-Za-z]/, /[A-Za-z]/, /[A-Za-z]/, ' ', /[A-Za-z]/, /[A-Za-z]/, ' ', /[A-Za-z0-9]/, /[A-Za-z0-9]/, ' ', /[A-Za-z0-9]/, /[A-Za-z0-9]/, /[A-Za-z0-9]/],
            tel_code: [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/],
            kids: [/\d/, /\d/],
            alpha15:[/[A-Za-z\s]/,/[A-Za-z-\s]/,/[A-Za-z-\s]/,/[A-Za-z-\s]/,/[A-Za-z-\s]/,/[A-Za-z-\s]/,/[A-Za-z-\s]/,/[A-Za-z-\s]/,/[A-Za-z-\s]/,/[A-Za-z-\s]/,/[A-Za-z-\s]/,/[A-Za-z-\s]/,/[A-Za-z-\s]/,/[A-Za-z-\s]/,/[A-Za-z]/],
            alpha25:[/[A-Za-z\s]/,/[A-Za-z-\s]/,/[A-Za-z-\s]/,/[A-Za-z-\s]/,/[A-Za-z-\s]/,/[A-Za-z-\s]/,/[A-Za-z-\s]/,/[A-Za-z-\s]/,/[A-Za-z-\s]/,/[A-Za-z-\s]/,/[A-Za-z-\s]/,/[A-Za-z-\s]/,/[A-Za-z-\s]/,/[A-Za-z-\s]/,/[A-Za-z-\s]/,/[A-Za-z-\s]/,/[A-Za-z-\s]/,/[A-Za-z-\s]/,/[A-Za-z-\s]/,/[A-Za-z-\s]/,/[A-Za-z-\s]/,/[A-Za-z-\s]/,/[A-Za-z-\s]/,/[A-Za-z-\s]/,/[A-Za-z]/]
        };
    }
    getValidators() {
        return {
            name: Validators.pattern('^[^0-9_@!/()#~&²]+$'),
            tel: Validators.pattern('^0[0-9]( [0-9]{2}){4}$'),
            tel_code: Validators.pattern('^[0-9]{6}$'),
            numSS: Validators.pattern('^[0-9 ]{18}$'),
            number: Validators.pattern('^[0-9]*$'),
            one: Validators.pattern('^[0-9]$'),
            two: Validators.pattern('^[0-9]{2}$'),
            three: Validators.pattern('^[0-9]{3}$'),
            password: Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)([\\-_\\.@!?\\*]?)(?![<>])[A-Za-z\\d\\-_\\.@!?\\*]{8,}$'),
            codePostal:  Validators.pattern('[0-9]{5}'),
            date: Validators.pattern('(^(((0[1-9]|1[0-9]|2[0-8])[\\/](0[1-9]|1[012]))|((29|30|31)[\\/](0[13578]|1[02]))|((29|30)[\\/](0[4,6,9]|11)))[\\/](19|[2-9][0-9])\\d\\d$)|(^29[\\/]02[\\/](19|[2-9][0-9])(00|04|08|12|16|20|24|28|32|36|40|44|48|52|56|60|64|68|72|76|80|84|88|92|96)$)'),
            iban: Validators.maxLength(42),
            bic: Validators.maxLength(14)
          };
    }

    /**
     * Ajoute un espace tous les 'space' caractères de la chaine trouvée grâce à 'prop'
     * @param prop
     * @param space
     * @returns {string}
     */
    parseNumero(prop: string, space: number = 2): string {
        const tmp = prop.replace(' ', '');
        let num = '';
        tmp.split('').forEach((char, i) => {
            if ((i + 1) % space === 0) {
                num += char + ' ';
            } else {
                num += char;
            }
        });
        return num;
    }

    /**
     * Parse le numéro de sécu sociale afin de l'afficher avec des points et de concaténer sa clé
     * @param num
     * @param cle
     * @return {string}
     */
    parseNumeroSS(num: string, cle: string): string {
        let ss_num = '';
        num.split('').forEach((char, i) => {
            if (i === 0 || i === 2 || i === 4 || i === 6 || i === 9 || i === 12) {
                ss_num += char + ' ';
            } else {
                ss_num += char;
            }
        });
        return ss_num + cle;
    }
    
}
