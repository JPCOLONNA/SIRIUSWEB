import { Pipe, PipeTransform } from '@angular/core';

/** Converti une date YMD en Y-M-d */
@Pipe({
  name: 'heure'
})
export class HeurePipe implements PipeTransform {

  transform(value: any): string {

    let transformDate = '';
    value.split('').forEach((char, i) => {
        if(char == '.' && i==2)
            transformDate += 'h';
        else if(i < 5)
            transformDate += char;
      
    });
    return transformDate;
  }

}
