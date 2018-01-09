import { Pipe, PipeTransform } from '@angular/core';

/**
 * Capitalize the first letter of a string
 *
 * @export
 * @class CapitalizePipe
 * @implements {PipeTransform}
 */
@Pipe({name: 'capitalize'})
export class CapitalizePipe implements PipeTransform {

  transform(value:any) {

    if (value) {
      value = value.toLowerCase();
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
    return value;
  }

}
