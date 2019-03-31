import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { LocalStorageService } from "../../../services/localStorage.service";
import { ProfileInfo } from "../../../models/user.model";
import { NotificationDropdownMenuLink } from "../../../models/dropdown.model";
import { Store } from "@ngrx/store";
import { MainState } from "../../../modules/main/main.reducer";
import { MainService } from "../../../modules/main/main.service";
import { IsPILoadedAction } from "../../../modules/main/main.actions";
import { Router } from "@angular/router";
import { Logout } from "../../../modules/auth/auth.actions";
import { environment } from "../../../../environments/environment";

@Component({
  selector: "app-topnav",
  templateUrl: "./topnav.component.html",
  styleUrls: ["./topnav.component.scss"]
})
export class TopnavComponent implements OnInit {
  @Input()
  public showSidebar: boolean = true;

  @Input()
  public activeMenu: string;

  public isLoading: boolean = false;
  public profileInfo: ProfileInfo = null;
  public isProfileMenu: boolean = true;
  public isShowProfileDropdown: boolean = false;
  public isShowNotificationDropdown: boolean = false;

  public menuLinks = [
    {
      text: "Dashboard",
      route: "/dashboard"
    },
    {
      text: "Cards",
      route: "/cards"
    },
    {
      text: "Boards",
      route: "/boards"
    }
  ];

  public piLinks = [
    {
      text: "My Profile",
      icon: "far fa-user",
      route: "/profile"
    },
    {
      text: "Settings",
      icon: "fas fa-cog",
      route: "/settings"
    }
  ];

  public notificationDropdownMenuLink: NotificationDropdownMenuLink[] = [
    {
      text: "28 Cards to be played today",
      icon: "far fa-credit-card",
      action: "Let's Play",
      bgColor: "card-blue",
      route: "/cards"
    },
    {
      text: "You have 2 Games updates",
      icon: "fas fa-gamepad",
      action: "View Games",
      bgColor: "expenses-yellow",
      route: "/games"
    },
    {
      text: "3 New Accounts added",
      icon: "far fa-user",
      action: "View Accounts",
      bgColor: "tickets-green",
      route: "/support-tickets"
    }
  ];

  @Output()
  public showSidebarEmitter = new EventEmitter<boolean>();

  @Output()
  public activeMenuEmitter = new EventEmitter<string>();

  constructor(private mainService: MainService,
    private store: Store<MainState>,
    private router: Router) {
    this.isLoading = true;

    this.mainService.getProfile().subscribe(response => {
      this.profileInfo = response.user;
      this.isLoading = false;

      if(this.profileInfo.profilePhoto.userPhotoURL == null) {
        this.profileInfo.profilePhoto.userPhotoURL = `${environment.baseUrl}/api/account/profile/avatar.png?email=${this.profileInfo.userName}&size=420`;
      }

      if(this.profileInfo.name.first == null && this.profileInfo.name.last == null) {
        this.profileInfo.name.fullName = this.profileInfo.userName;
      }

      this.store.dispatch(new IsPILoadedAction({ isPILoadedAction: true }));
    });
  }

  ngOnInit(): void {
    this.activeMenuEmitter.emit('Dashboard');
  }

  public toggleSidebar(): void {
    if (window.outerWidth < 1025) {
      this.showSidebar = this.showSidebar;
    } else {
      this.showSidebar = !this.showSidebar;
    }

    this.showSidebarEmitter.emit(this.showSidebar);
  }

  public handleDropdownShow(event: boolean) {
    this.isShowProfileDropdown = event;
  }

  public handleNotificationDropdownShow(event: boolean) {
    this.isShowNotificationDropdown = event;
  }

  public onLogout(): void {
    this.store.dispatch(new Logout());
  }

  public onRoute(link: any): void {
    this.router.navigateByUrl(link.route);
  }

  public gotoRoute(event: any, link: any): void {
    let links = Array.from(document.querySelectorAll(".router-link-item"));

    // links.forEach(link => {
    //   link.classList.remove('active');
    // });

    // event.target.parentElement.classList.add('active');
    this.activeMenuEmitter.emit(link.text);
    this.router.navigateByUrl(link.route);

  }
}
