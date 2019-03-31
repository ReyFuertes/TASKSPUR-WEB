import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-dropdown-notification',
  templateUrl: './dropdown-notification.component.html',
  styleUrls: ['./dropdown-notification.component.scss']
})
export class DropdownNotificationComponent implements OnInit {
  @Input()
  public menuItem: DropdownNotificationComponent[] = [];

  @Input()
  public isProfileMenu: boolean = false;

  @Output()
  public showDropdownMenu = new EventEmitter<boolean>();
  public isShowNotificationDropdown = false;

  constructor(private router: Router) { }

  public gotoRoute(link: any): void {
    this.router.navigateByUrl(link.route);
    this.showDropdownMenu.emit(this.isShowNotificationDropdown);
  }

  ngOnInit() {
  }

}
