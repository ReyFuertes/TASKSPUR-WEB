import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import {slideInRightSideFast, slideInLeftSideFast, slideInDownFast, slideInUp } from '../../../../shared/animations/landing.animation';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss'],
  animations: [slideInRightSideFast, slideInLeftSideFast, slideInDownFast, slideInUp] 
})
export class SubscriptionComponent implements OnInit {

  public showSubPrices: string = 'hidden';

  constructor(private el: ElementRef) { }

  ngOnInit() {
  }

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    const viewPoint = 550;

    if ((this.el.nativeElement.querySelector('.subs-price').getBoundingClientRect().top) <= viewPoint) {
      this.showSubPrices = 'shown';
      
      let routeType = '.router-link-item';
      if(window.outerWidth <= 767) {
         routeType = '.router-link-item-sb';
      }
      let links = Array.from(document.querySelectorAll(routeType));
      let routeCounter = 0;
      links.forEach(link => {
        link.classList.remove('active');
        if(links[routeCounter].className.indexOf('r-subscription') != -1) {
          links[routeCounter].className = links[routeCounter].className + ' active';
        }
        routeCounter = routeCounter + 1;
      });
    } 

  }

}
