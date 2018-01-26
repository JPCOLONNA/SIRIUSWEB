import { Pipe, PipeTransform } from '@angular/core';

/** Converti une date YMD en Y-M-d */
@Pipe({
  name: 'dateYMD'
})
export class DateYMDPipe implements PipeTransform {

  transform(value: string): string {

    let annee = '';
    let mois = ''
    let tmp = '';
    let transformDate = '';
    
    //La date de naissance doit contenir 8 numériques pour être affiché
    if (value.length == 8 && !isNaN(Number(value))) {
      value.split('').forEach((char, i) => {
        //  transformDate += char;
        tmp += char;
        if (i === 3) {
          annee = tmp;
          tmp = '';
        }
        if (i === 5) {
          mois = tmp;
          tmp = '';
        }
      });
      transformDate = tmp + '/' + mois + '/' + annee;
      return transformDate;
    }
    else
    {
      return '';
    }
  }

}
