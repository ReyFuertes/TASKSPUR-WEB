import { isLoggedIn } from '../../auth.selectors';
import { Store, select } from '@ngrx/store';
import { AuthState } from '../../auth.reducer';
import { Router } from '@angular/router';

export abstract class AuthGenericPageComponent {
  public isLoggedIn: boolean;
  
  constructor(private _store: Store<AuthState>, private _router: Router) {
    this._store.pipe(select(isLoggedIn)).subscribe(_isLoggedIn => {
      this.isLoggedIn = _isLoggedIn;
      if (_isLoggedIn) {
        //this._router.navigateByUrl('/dashboard');
      } else {
        this._router.navigateByUrl('/login');
      }
    });
  }
}
