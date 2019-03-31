import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { MainEffects } from './main.effects';

describe('MainEffects', () => {
  let actions$: Observable<any>;
  let effects: MainEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MainEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(MainEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
