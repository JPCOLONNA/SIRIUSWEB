import { Pipe, PipeTransform } from '@angular/core';

/** Converti une date YMD en Y-M-d */
@Pipe({
  name: 'dateYMD'
})
export class DateYMDPipe implements PipeTransform {

  transform(value: any): string {

    let transformDate = '';
    value.split('').forEach((char, i) => {
        transformDate += char;
      //Ajoute un tiret
      if (i === 3 || i === 5 )
        transformDate += '-';
      
    });
    return transformDate;
  }

}
