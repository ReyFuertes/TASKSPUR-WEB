
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

export const scaleAnimation = trigger('scaleAnimation', [
  state('small', style({
    // display: 'none',
  })),
  state('large', style({
    display: 'block'
  })),
  transition('small <=> large', animate('150ms ease-in', keyframes([
    style({ opacity: 0, transform: 'scale(0.7)' }),
    style({ opacity: 0.5, transform: 'scale(0.8)' }),
    style({ opacity: 1, transform: 'scale(1)' })
  ]))),
])