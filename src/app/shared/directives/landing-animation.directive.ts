import { Directive, Input, OnInit } from '@angular/core';
import { ElementRef } from '@angular/core';
import {
  AnimationPlayer,
  AnimationBuilder,
  AnimationMetadata,
  animate,
  style,
} from '@angular/animations';

@Directive({
  selector: '[slideIn]',
   host: {
    '(window:scroll)': 'onScroll()'
  }
})
export class LandingAnimationDirective implements OnInit {
  player: AnimationPlayer;
  metadata: any =  this.slideInFromRightSide();
  elPosition: number;
  scrollPosition: number;
  elAnimate: boolean = false;

  animationTriggered: number = 0;

  @Input()
  animationOption: string;

  constructor(private builder: AnimationBuilder, private el: ElementRef) {
    
  }

  ngOnInit() {
    
    this.elPosition = this.el.nativeElement.offsetTop
  }

  onScroll(){
    const scrollPosition = window.pageYOffset
    if (scrollPosition >= (this.elPosition + 200)) {
      if(this.animationTriggered == 0) {

        if(this.animationOption == "animationOption") {
          this.metadata =  this.slideInFromRightSide();
        }
        
        const factory = this.builder.build(this.metadata);
        const player = factory.create(this.el.nativeElement);
    
        player.play();
        this.animationTriggered = 1;
      }
    }
  } 

  private slideInFromRightSide(): AnimationMetadata[] {
    return [
        style({transform: 'translateX(30%)', 'opacity': '0'}),
        animate('1000ms ease-in', style({transform: 'translateX(-5%)', 'opacity': '0.7'})),
        animate('200ms ease-in', style({transform: 'translateX(0%)', 'opacity': '1'}))
    ];
  }

  private fadeOut(): AnimationMetadata[] {
    return [
      style({ opacity: '*' }),
      animate('400ms ease-in', style({ opacity: 0 })),
    ];
  }
}