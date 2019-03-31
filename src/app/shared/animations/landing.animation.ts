import { trigger, state, style, transition, animate } from '@angular/animations';

export const slideInRightSide = [
  trigger('slideInRightSide', [
    state('shown', style({
       'opacity': '1'
    })),
    state('hidden', style({
      transform: 'translateX(30%)', 'opacity': '0'
    })),
    transition('hidden => shown', [
      animate('1000ms ease-in', style({transform: 'translateX(-5%)', 'opacity': '0.7'})),
      animate('100ms ease-in', style({transform: 'translateX(0%)', 'opacity': '1'}))
    ])
  ])
]

export const slideInRightSideFast = [
  trigger('slideInRightSideFast', [
    state('shown', style({
      'opacity': '1'
    })),
    state('hidden', style({
      transform: 'translateX(30%)', 'opacity': '0'
    })),
    transition('hidden => shown', [
      animate('500ms ease-in', style({transform: 'translateX(0%)', 'opacity': '1'}))
    ])
  ])
]


export const slideInLeftSide = [
  trigger('slideInLeftSide', [
    state('shown', style({
      'opacity': '1'
    })),
    state('hidden', style({
      transform: 'translateX(-30%)', 'opacity': '0'
    })),
    transition('hidden => shown', [
      animate('1000ms ease-in', style({transform: 'translateX(-5%)', 'opacity': '0.7'})),
      animate('100ms ease-in', style({transform: 'translateX(0%)', 'opacity': '1'}))
    ])
  ]),
]

export const slideInLeftSideFast = [
  trigger('slideInLeftSideFast', [
    state('shown', style({
      'opacity': '1'
    })),
    state('hidden', style({
      transform: 'translateX(-30%)', 'opacity': '0'
    })),
    transition('hidden => shown', [
      animate('500ms ease-in', style({transform: 'translateX(0%)', 'opacity': '1'}))
    ])
  ]),
]

export const slideInDown = [
  trigger('slideInDown', [
    state('shown', style({
      'opacity': '1'
    })),
    state('hidden', style({
      transform: 'translateY(-75%)', 'opacity': '0'
    })),
    transition('hidden => shown', [
      animate('1000ms ease-in', style({transform: 'translateY(0%)', 'opacity': '1'}))
    ])
  ]),
]

export const slideInDownFast = [
  trigger('slideInDownFast', [
    state('shown', style({
      'opacity': '1'
    })),
    state('hidden', style({
      transform: 'translateY(-75%)', 'opacity': '0'
    })),
    transition('hidden => shown', [
      animate('500ms ease-in', style({transform: 'translateY(0%)', 'opacity': '1'}))
    ])
  ]),
]

export const slideInUp = [
  trigger('slideInUp', [
    state('shown', style({
      'opacity': '1'
    })),
    state('hidden', style({
      transform: 'translateY(30%)', 'opacity': '0'
    })),
    transition('hidden => shown', [
      animate('1000ms ease-in', style({transform: 'translateY(0%)', 'opacity': '1'}))
    ])
  ])
]

export const slideInUpFast = [
  trigger('slideInUpFast', [
    state('shown', style({
      'opacity': '1'
    })),
    state('hidden', style({
      transform: 'translateY(30%)', 'opacity': '0'
    })),
    transition('hidden => shown', [
      animate('500ms ease-in', style({transform: 'translateY(0%)', 'opacity': '1'}))
    ])
  ])
]