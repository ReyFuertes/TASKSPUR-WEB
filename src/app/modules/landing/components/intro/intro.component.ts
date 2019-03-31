import { Component, OnInit, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent implements OnInit {

  constructor(private el: ElementRef) { }

  ngOnInit() {
  }

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    const viewPoint = -50;

    if ((this.el.nativeElement.querySelector('.intro-container').getBoundingClientRect().top) <= viewPoint) {
      let links = Array.from(document.querySelectorAll(".router-link-item"));
      let routeCounter = 0;
      links.forEach(link => {
        link.classList.remove('active');
        if(links[routeCounter].className.indexOf('r-intro') != -1) {
          links[routeCounter].className = links[routeCounter].className + ' active';
        }
        routeCounter = routeCounter + 1;
      });
    } 
  }

}
