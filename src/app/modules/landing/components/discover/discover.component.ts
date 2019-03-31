import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import { slideInLeftSide, slideInDown, slideInUp } from '../../../../shared/animations/landing.animation';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.scss'],
  animations: [ slideInLeftSide, slideInDown, slideInUp] 
})
export class DiscoverComponent implements OnInit {

  public showTitle: string = 'hidden';

  constructor(private el: ElementRef) { }

  ngOnInit() {
  }

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    const viewPoint = 550;

    if ((this.el.nativeElement.querySelector('.discover-title').getBoundingClientRect().top) <= viewPoint) {
      this.showTitle = 'shown';
    } 

  }

}
