import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class ModalService {
  private propagator: EventEmitter<boolean>;

  constructor() {
    this.propagator = new EventEmitter<boolean>();
  }

  public propagate(): void {
    this.propagator.emit(true);
  }

  subscribe(component, callback) {
    return this.propagator.subscribe(value => callback.call(component, value));
  }
}
