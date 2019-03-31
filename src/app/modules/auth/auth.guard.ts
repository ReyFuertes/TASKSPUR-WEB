import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from "@angular/router";
import { Observable } from "rxjs";
import { select, Store } from "@ngrx/store";
import { isLoggedIn } from "./auth.selectors";
import { tap } from "rxjs/operators";
import { AuthState } from "./auth.reducer";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private store: Store<AuthState>, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.store.pipe(
      select(isLoggedIn),
      tap(isLoggedIn => {    
        const url = this.router.url.split('?')[0].split('/')[1];
        if (!isLoggedIn && url !== 'forgot-password-reset' && url !== 'mail-confirmation' && url !== 'forgot-password') {
          this.router.navigateByUrl("/login");
        }
      })
    );
  }
}
