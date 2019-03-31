import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from "@angular/router";
import { Observable } from "rxjs";
import { select, Store } from "@ngrx/store";
import { tap } from "rxjs/operators";
import { AuthState } from "../auth/auth.reducer";
import { isLoggedIn } from "../auth/auth.selectors";

@Injectable()
export class MainGuard implements CanActivate {
  constructor(private store: Store<AuthState>, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.store.pipe(
      select(isLoggedIn),
      tap(isLoggedIn => {    
        if (!isLoggedIn ) {
          this.router.navigateByUrl("/intro");
        }
      })
    );
  }
}
