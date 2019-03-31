import { Component, OnInit } from "@angular/core";
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, RouterEvent } from "@angular/router";
import { Observable } from "rxjs";
import { select, Store } from "@ngrx/store";
import { AuthState } from "./modules/auth/auth.reducer";
import { isLoggedIn, isLoggedOut } from "./modules/auth/auth.selectors";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  public isLoggedIn$: Observable<boolean>;
  public isLoggedOut$: Observable<boolean>;

  public showSidebar: boolean = true;
  public showLoader: boolean = false;

  constructor(private store: Store<AuthState>, private route:Router) {
    route.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event)
    })
  }

  ngOnInit() {
    this.isLoggedIn$ = this.store.pipe(select(isLoggedIn));

    this.isLoggedOut$ = this.store.pipe(select(isLoggedOut));
  }

  public handleShowSidebar(event: boolean): void {
    this.showSidebar = event;
  }

  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.showLoader = true
    }
    if (event instanceof NavigationEnd) {
      this.showLoader = false
    }

    if (event instanceof NavigationCancel) {
      this.showLoader = false
    }
    if (event instanceof NavigationError) {
      this.showLoader = false
    }
  }
}
