import { Directive, Attribute  } from '@angular/core';
import { Validator,  NG_VALIDATORS,  } from '@angular/forms';

@Directive({
  selector: '[valCompare]',
  providers: [{provide: NG_VALIDATORS, useExisting: CompareDirective, multi: true}]
})
export class CompareDirective implements Validator {

  constructor(@Attribute('valCompare') public comparer: string){}

  validate(c: any): {[key: string]: any} {
    let e = c.root.get(this.comparer);
    if(e && c.value !== e.value){
      return {"compare": true};
    }
    return null;
  }
}


