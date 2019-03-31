import { Directive, ElementRef, AfterViewInit } from '@angular/core';
import * as $ from 'jquery';

@Directive({
  selector: '[inputFocus]'
})

export class InputFocusDirective implements AfterViewInit {
  constructor(private _el: ElementRef) {
  }

  ngAfterViewInit() {
    
    if (this._el.nativeElement) {
      $(this._el.nativeElement).focus();
    }

    setTimeout(() => {
      $(this._el.nativeElement).select();
    }, 100)
  }
}