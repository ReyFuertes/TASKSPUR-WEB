import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { select, Store } from "@ngrx/store";
import { AuthState } from "../../modules/auth/auth.reducer";
import { isLoggedIn } from "../../modules/auth/auth.selectors";

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss']
})
export class AuthLayoutComponent implements OnInit {
  public showSidebar: boolean = true;

  constructor() {}

  ngOnInit() {}

  public handleShowSidebar(event: boolean): void {
    this.showSidebar = event;
  }
}


