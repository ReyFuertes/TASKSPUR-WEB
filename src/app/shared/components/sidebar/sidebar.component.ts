import { Component, OnInit, AfterViewInit, HostListener, Input, EventEmitter, Output, ElementRef } from "@angular/core";
import { Store } from "@ngrx/store";
import { Router } from "@angular/router";
import { AuthState } from "../../../modules/auth/auth.reducer";
import { Logout } from "../../../modules/auth/auth.actions";


@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"]
})

export class SidebarComponent implements OnInit, AfterViewInit {
  public sidebarLinks = [
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

  @Input()
  public showSidebar: boolean = false;

  @Output()
  public showSidebarEmitter = new EventEmitter<boolean>();

  @Output()
  public activeMenuEmitter = new EventEmitter<string>();

  constructor(private el: ElementRef, private store: Store<AuthState>, private router: Router) { }

  ngOnInit(): void {
    this.activeMenuEmitter.emit('Dashboard');
  }

  public logout(): void {
    this.store.dispatch(new Logout());
  }

  public gotoRoute(event: any, link: any): void {
    let links = Array.from(document.querySelectorAll(".router-link-item"));

    links.forEach(link => {
      link.classList.remove('active');
    });

    event.target.parentElement.classList.add('active');
    this.activeMenuEmitter.emit(link.text);
    this.router.navigateByUrl(link.route);

    if (window.outerWidth < 1025) {
      this.toggleSidebar();
    }
  }

  ngAfterViewInit(): void {
    let link = document.querySelectorAll(".router-link-item");
    link[0].classList.add('active');
  }

  public toggleSidebar(): void {
    if (window.outerWidth < 1025) {
      this.showSidebar = this.showSidebar;
    } else {
      this.showSidebar = !this.showSidebar;
    }
    this.showSidebarEmitter.emit(this.showSidebar);
  }

}
