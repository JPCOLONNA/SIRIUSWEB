import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'siren'
})
export class SirenPipe implements PipeTransform {

  transform(value: any): string {

    let transformSiren = '';
    value.split('').forEach((char, i) => {
      transformSiren += char;
      //Ajoute 
      if (i === 2 || i === 5 )
        transformSiren += '.';
      if(i === 8)
        transformSiren += ' ';
    });
    return transformSiren;
  }

}
