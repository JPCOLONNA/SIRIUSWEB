import { Pipe, PipeTransform } from '@angular/core';

/** Converti une date YMD en Y-M-d */
@Pipe({
  name: 'dateDMY'
})
export class DateYMDPipe implements PipeTransform {

  transform(value: any): string {


    let jour = '';
    let mois = ''
    let tmp = '';
    let transformDate = '';
    value.split('').forEach((char, i) => {
      //  transformDate += char;
      tmp += char;
      //Ajoute un tiret
      //if (i === 3 || i === 5 )
        //transformDate += '-';
        if (i===2) {
          jour=tmp;
          tmp='';
        }
        if (i===4) {
          mois=tmp;
          tmp='';
        }
      
    });
    transformDate=jour+'/'+mois+'/'+tmp;  
    return transformDate;
  }

}
