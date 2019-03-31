import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-landing-sidebar',
  templateUrl: './landing-sidebar.component.html',
  styleUrls: ['./landing-sidebar.component.scss']
})
export class LandingSidebarComponent implements OnInit {

  public menuLinks = [
    {
      text: "INTRODUCTION",
      route: "intro",
      classRoute: "r-intro"
    },
    {
      text: "WHY TASKSPUR?",
      route: "why-taskspur",
      classRoute: "r-why-taskspur"
    },
    {
      text: "MEET ARI",
      route: "meet-ari",
      classRoute: "r-meet-ari"
    },
    {
      text: "SUBSCRIPTIONS",
      route: "subscription",
      classRoute: "r-subscription"
    },
    {
      text: "CONTACT US",
      route: "contact-us",
      classRoute: "r-contact-us"
    }
  ];

  @Input()
  public showSidebar: boolean = false;

  @Output()
  public showSidebarEmitter = new EventEmitter<boolean>();

  @Output()
  public activeMenuEmitter = new EventEmitter<string>();

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.activeMenuEmitter.emit('Dashboard');
  }

  public gotoRoute(event: any, link: any): void {
    let links = Array.from(document.querySelectorAll(".router-link-item-sb"));

    links.forEach(link => {
      link.classList.remove('active');
    });

    event.target.parentElement.classList.add('active');
    var element = document.getElementById(link.route);
    element.scrollIntoView({block: 'start', inline: 'start'});

    this.toggleSidebar();
  }

  ngAfterViewInit(): void {
    let link = document.querySelectorAll(".router-link-item-sb");
    link[0].classList.add('active');
  }

  public toggleSidebar(): void {
    this.showSidebar = !this.showSidebar;
    this.showSidebarEmitter.emit(this.showSidebar);
  }

  public gotoLogin(): void {
    this.router.navigateByUrl('/login');
  }

}
