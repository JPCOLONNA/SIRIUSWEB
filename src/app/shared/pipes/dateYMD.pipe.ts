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
    
    //FORMAT AAAAMMDD - La date de naissance doit contenir 8 numériques pour être affiché
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
      
    }
    else
    {
      //FORMAT AAAA-MM-DD - La date de naissance doit contenir 10 caractères
      let regex = new RegExp('[0-9]{4}\-[0-9]{2}\-[0-9]{2}');
      if(value.length == 10 && regex.test(value))
      {
        value.split('').forEach((char, i) => {
          if(char != '-')
            tmp += char;
          
            if (i === 3) {
            annee = tmp;
            tmp = '';
          }
          if (i === 6) {
            mois = tmp;
            tmp = '';
          }
        });
        transformDate = tmp + '/' + mois + '/' + annee;
      }
    }

    return transformDate;
  }

}
