import { Pipe, PipeTransform } from '@angular/core';

/**
 * Capitalize the first letter of each word of a string
 *
 * @export
 * @class CapitalizeEachWordPipe
 * @implements {PipeTransform}
 */
@Pipe({name: 'capitalizeEachWord'})
export class CapitalizeEachWordPipe implements PipeTransform {

  transform(value:any) {

    if (value) {
      value = value.toLowerCase();
      return  value = value.replace(/\b\w/g, first => first.toLocaleUpperCase());
    }
    return value;
  }

}
