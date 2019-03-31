import { Component, OnInit, HostListener , ElementRef} from '@angular/core';
import { slideInLeftSide, slideInDown, slideInUp } from '../../../../shared/animations/landing.animation';

@Component({
  selector: 'app-meet-ari',
  templateUrl: './meet-ari.component.html',
  styleUrls: ['./meet-ari.component.scss'],
  animations: [ slideInLeftSide, slideInDown, slideInUp] 
})
export class MeetAriComponent implements OnInit {

  public maDescription = `Who said having virtual assistants can’t be fun and exciting? 
  Meet <strong>ARI</strong> – your friendly, intelligent assistant and advisor. Ask <strong>ARI</strong>. Call <strong>ARI</strong>. 
  Laugh with <strong>ARI</strong>. This fun and user-friendly assistant can do a lot of wondrous things for you. 
  Of course, all your activities are private, because <strong>ARI</strong> deeply cares about your welfare and reputation. 
  <strong>ARI</strong> does not only reply to your questions but will also help you take actions such as updating your tasks automatically, 
  keeping track of your to-do lists and even booking your holidays if you want to.`;

  public showTitle: string = 'hidden';
  public showDescription: string = 'hidden';
 

  constructor(private el: ElementRef) { }

  ngOnInit() {
    
  }

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    const viewPoint = 550;

    if ((this.el.nativeElement.querySelector('.ma-text-header').getBoundingClientRect().top) <= viewPoint) {
      this.showTitle = 'shown';
      let routeType = '.router-link-item';
      if(window.outerWidth <= 767) {
         routeType = '.router-link-item-sb';
      }

      let links = Array.from(document.querySelectorAll(routeType));
      let routeCounter = 0;
      links.forEach(link => {
        link.classList.remove('active');
        if(links[routeCounter].className.indexOf('r-meet-ari') != -1) {
          links[routeCounter].className = links[routeCounter].className + ' active';
        }
        routeCounter = routeCounter + 1;
      });
    } 

    if ((this.el.nativeElement.querySelector('.ma-description').getBoundingClientRect().top) <= viewPoint) {
      this.showDescription = 'shown';
    } 
  }

}
