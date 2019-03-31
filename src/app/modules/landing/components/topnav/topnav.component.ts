import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-landing-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.scss']
})
export class TopnavComponent implements OnInit {

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
  public showSidebar: boolean = true;

  @Output()
  public activeMenuEmitter = new EventEmitter<string>();

  @Output()
  public showSidebarEmitter = new EventEmitter<boolean>();



  constructor(private router: Router) { }

  ngOnInit() {
  }

  public gotoRoute(event: any, link: any): void {
    let links = Array.from(document.querySelectorAll(".router-link-item"));

    links.forEach(link => {
      link.classList.remove('active');
    });

    event.target.parentElement.classList.add('active');
    var element = document.getElementById(link.route);
    element.scrollIntoView({ block: 'start', inline: 'start' });
  }

  public gotoLogin(): void {
    this.router.navigateByUrl('/login');
  }

  public toggleSidebar(): void {
    this.showSidebar = !this.showSidebar;
    this.showSidebarEmitter.emit(this.showSidebar);
  }

}
