import { Directive, forwardRef } from "@angular/core";
import { NG_VALIDATORS, ValidatorFn } from "@angular/forms";
import { Validator, AbstractControl } from "@angular/forms";

@Directive({
  selector:"[validateEmail][formControlName], [validateEmail][formControl],[validateEmail][ngModel]",
  providers: [{
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => EmailValidatorDirective),
      multi: true
    }
  ]
})
export class EmailValidatorDirective implements Validator {
  constructor() {}

  validate(c: AbstractControl) {
    let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    return EMAIL_REGEXP.test(c.value) ? null : {
          validateEmail: {
            valid: false
          }
        };
  }
}

