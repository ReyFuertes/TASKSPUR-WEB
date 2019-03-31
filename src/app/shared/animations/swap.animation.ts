
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

export const swapAnimation = trigger('swapAnimation', [
  state('init', style({
    position: 'relative',
    left: '0',
  })),
  state('slideLeft', style({
    position: 'relative',
    left: '-424px',
  })),
  state('slideRight', style({
    position: 'relative',
    left: '425px',
  })),
  transition('slideLeft <=> slideRight', animate('100ms ease-in')),
  transition('init <=> slideRight', animate('100ms ease-in')),
  transition('init <=> slideLeft', animate('100ms ease-in')),
])