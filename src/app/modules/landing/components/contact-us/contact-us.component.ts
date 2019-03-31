import { Component, OnInit, HostListener, ElementRef } from '@angular/core';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {

  constructor(private el: ElementRef) { }

  ngOnInit() {
  }

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    const viewPoint = 550;

    if ((this.el.nativeElement.querySelector('.a-cu-content').getBoundingClientRect().top) <= viewPoint) {

      let routeType = '.router-link-item';
      if(window.outerWidth <= 767) {
         routeType = '.router-link-item-sb';
      }
      let links = Array.from(document.querySelectorAll(routeType));
      let routeCounter = 0;
      links.forEach(link => {
        link.classList.remove('active');
        if(links[routeCounter].className.indexOf('r-contact-us') != -1) {
          links[routeCounter].className = links[routeCounter].className + ' active';
        }
        routeCounter = routeCounter + 1;
      });
    } 

  }

}
