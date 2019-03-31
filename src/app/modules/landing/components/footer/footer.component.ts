import { Component, OnInit, ElementRef, Renderer } from '@angular/core';

@Component({
  selector: 'app-landing-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(public el: ElementRef, private renderer: Renderer) { }

  ngOnInit() {
  }

  public gotoRoute(event: any, linkRoute: any): void {
    let links = Array.from(document.querySelectorAll(".router-link-item"));
    let routeCounter = 0;
    links.forEach(link => {
      link.classList.remove('active');
      if(links[routeCounter].className.indexOf('r-'+linkRoute) != -1) {
        links[routeCounter].className = links[routeCounter].className + ' active';
      }
      routeCounter = routeCounter + 1;
    });

    const element = document.getElementById(linkRoute);
    element.scrollIntoView({block: 'start', inline: 'start'});
  }

}
