import { Injectable, Output, EventEmitter } from '@angular/core';
import { Error } from '../models/error.model';
import { FormGroup } from '@angular/forms';

@Injectable()
export class ErrorService {
  private errorMsgs: Error[] = [];

  public errorsEmitter = new EventEmitter<Error[]>();

  public setError(msg: Error) {
    this.errorMsgs.push(msg);
    this.errorsEmitter.emit(this.errorMsgs);
  }

  public removeError(key: string): void {
    const index: number = this.errorMsgs.findIndex(err => err.key === key);
    if (index !== -1) {
        this.errorMsgs.splice(index, 1);
        this.errorsEmitter.emit(this.errorMsgs);
    }   
  }

  public validatePassword = (form: FormGroup, key: string, msgError: string) => {
    if (!form.get(key).valid
      && form.get(key).dirty
      && form.get(key).value != '') {
      const error: Error = {
        key: key,
        msg: msgError
      }
      this.setError(error);
    } else {
      this.removeError(key);
    }
  }
}