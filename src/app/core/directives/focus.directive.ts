import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[focusPerso]'
})
export class FocusDirective {

  constructor(element: ElementRef) {
    console.log("constructeur focusPerso");
    element.nativeElement.focus();
   }

}
