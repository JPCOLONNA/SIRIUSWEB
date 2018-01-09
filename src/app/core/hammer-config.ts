// Gesture support with HammerJS
import { HammerGestureConfig }  from '@angular/platform-browser';
import 'hammerjs';

declare var Hammer: any;

export class HammerConfig extends HammerGestureConfig  {
  buildHammer(element: HTMLElement) {
    const mc = new Hammer(element, {
      touchAction: 'pan-y'
    });
    return mc;
  }
}