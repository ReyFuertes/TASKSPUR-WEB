import {trigger, animate, transition, style, query} from "@angular/animations";

export const fadeAnimation = trigger(
  'enterAnimation', [
    transition(':enter', [
      style({ opacity:0 }),
      animate('1000ms ease-in-out', style({ opacity:1 }))
    ]),
    transition(':leave', [
      style({ opacity: 1}),
      animate('1000ms ease-in-out', style({ opacity: 0 }))
    ])
  ]
)