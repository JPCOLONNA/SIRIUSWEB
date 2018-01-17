import { Pipe, PipeTransform } from '@angular/core';

/** Converti une date YMD en Y-M-d */
@Pipe({
  name: 'dateYMD'
})
export class DateYMDPipe implements PipeTransform {

  transform(value: any): string {


    let annee = '';
    let mois = ''
    let tmp = '';
    let transformDate = '';
    value.split('').forEach((char, i) => {
      //  transformDate += char;
      tmp += char;
      //Ajoute un tiret
      //if (i === 3 || i === 5 )
        //transformDate += '-';
        if (i===3) {
          annee=tmp;
          tmp='';
        }
        if (i===5) {
          mois=tmp;
          tmp='';
        }
      
    });
    transformDate=tmp+'/'+mois+'/'+annee;  
    return transformDate;
  }

}
