import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Login, AuthActionTypes, Logout } from "./auth.actions";
import { tap } from "rxjs/operators";
import { Router } from "@angular/router";
import { defer, of } from "rxjs";

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private router: Router) {}
  
  @Effect()
  init$ = defer(() => {
    const userData = localStorage.getItem('user');
    if(userData && userData !== 'undefined') {
      return of(new Login(JSON.parse(userData)));
    } else {
      return of();
    }
  })
  
  @Effect({ dispatch: false })
  public login$ = this.actions$.pipe(
    ofType<Login>(AuthActionTypes.LoginAction),
    tap(action =>
      localStorage.setItem("user", JSON.stringify(action.payload.user))
    )
  );

  @Effect({dispatch: false})
  logout$ = this.actions$.pipe(
    ofType<Logout>(AuthActionTypes.LogoutAction),
    tap(() => {
      localStorage.clear();
      this.router.navigateByUrl('/');
    })
  );

  
}
