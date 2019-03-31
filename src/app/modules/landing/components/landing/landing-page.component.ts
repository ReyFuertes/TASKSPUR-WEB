import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  public showSidebar: boolean = false;

  constructor() { }

  ngOnInit(): void { 
  }

  public handleShowSidebar(): void {
    this.showSidebar = !this.showSidebar;
  }
}
