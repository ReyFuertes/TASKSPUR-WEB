import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from "@angular/router";
import { Logout } from "../../../modules/auth/auth.actions";
import { Store, select } from "@ngrx/store";
import { AuthState } from "../../../modules/auth/auth.reducer";
import { profileInfoSelector } from '../../../modules/main/main.selector';

@Component({
  selector: 'app-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.scss']
})
export class DropdownMenuComponent implements OnInit {
  @Input()
  public menuItem = [];
  @Input()
  public isProfileMenu: boolean = false;
  @Output()
  public showDropdownMenu = new EventEmitter<boolean>();
  public isShowDropdownMenu = false;
  @Output()
  public selectedItemMenu = new EventEmitter<string>();

  constructor(private router: Router, private store: Store<AuthState>) {
    
   }

  ngOnInit() {
    
  }

  public gotoRoute(link: any): void {
    this.router.navigateByUrl(link.route);
    this.selectedItemMenu.emit(link.text);
    this.showDropdownMenu.emit(this.isShowDropdownMenu);
  }

  public logout(): void {
    this.store.dispatch(new Logout());
  }

}
