import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[tsInputCharRangeCharRange]'
})
export class TsCharRangeDirective {
  private min: number = null;
  private max: number = null;

  constructor() {

  }

  @Input('tsInputCharRangeCharRange')
  public set inputCharRange(range: any) {
    if(![undefined,null].includes(range.min)){
      this.min = range.min;
    }
    if(![undefined,null].includes(range.max)){
      this.max = range.max;
    }
  }

  @HostListener('input', ['$event']) inputListener(event: Event) {
    let newInputEvent = new Event('input');
    let target = event.target as HTMLInputElement;
    let val = target.value;

    let minValue: boolean = val.length < this.min && this.min != null;
    let maxValue: boolean = val.length > this.max && this.max != null;

    if(minValue) {
      console.log('has min value', val, this.min);
      return false;
    }
    
    if(maxValue) {
      console.log('has reach max value', val, this.max);
      return false;
    }
  }
 }

 export interface InputRange {
  min?: number,
  max?: number
}
