import { Pipe, PipeTransform } from '@angular/core';

/** Converti une date YMD en Y-M-d */
@Pipe({
  name: 'numSS'
})
export class NumSSPipe implements PipeTransform {

  transform(value: any): string {
    let tmp = '';
    value.split('').forEach((char, i) => {
      tmp += char;
      //Ajoute un espace
      if (i === 0 || i === 2 || i === 4 || i === 6 || i === 9)
        tmp += ' ';
    });
    
    return tmp;
  }

}
