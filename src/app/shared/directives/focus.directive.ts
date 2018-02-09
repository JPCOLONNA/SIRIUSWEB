import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[focus]'
})
export class FocusDirective {

  constructor(private element: ElementRef) { }

  //Applique un focus après le chargement de la vue
  ngAfterViewInit() {
    //setTimeout utilisé pour contourné une erreur 
    setTimeout (() => this.element.nativeElement.focus(),0);
  }

}
