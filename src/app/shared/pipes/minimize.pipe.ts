import { Pipe, PipeTransform } from '@angular/core';

/**
 * Minimizes string
 *
 * @export
 * @class MinimizePipe
 * @implements {PipeTransform}
 */
@Pipe({name: 'minimize'})
export class MinimizePipe implements PipeTransform {

  transform(value:any) {

    if (value) {
      return  value.toLowerCase();
    }
    return value;
  }

}
