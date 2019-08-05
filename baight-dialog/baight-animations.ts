import { trigger, state, style, transition, animate, keyframes, query, group, animateChild } from '@angular/animations';


// Routable animations
export const slideInAnimation =
  trigger('routeAnimation', [
    transition('root => detail', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({ left: '30%', opacity: 0})
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('300ms ease-out', style({ left: '-30%', opacity: 0}))
        ]),
        query(':enter', [
          animate('300ms ease-out', style({ left: '0%', opacity: 1}))
        ])
      ]),
      query(':enter', animateChild()),
    ]),
    transition('detail => root', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({ left: '-30%', opacity: 0})
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('300ms ease-out', style({ left: '30%', opacity: 0}))
        ]),
        query(':enter', [
          animate('300ms ease-out', style({ left: '0%', opacity: 1}))
        ])
      ]),
      query(':enter', animateChild()),
    ])
  ]);

// 淡入淡出 Host
export const FadeInOutAnimationHost = {
    '[@FadeInOutAnimation]': 'state',
    '(@FadeInOutAnimation.done)': 'onAnimationDone($event)'
};

// 淡入淡出动画
export const FadeInOutAnimation  = trigger('FadeInOutAnimation', [
    state('void, out', style({ opacity: '0'})),
    state('*, in', style({ opacity: '1'})),
    // 进场动画
    transition(':enter, out => in', animate('160ms ease-in-out')),
    // 出场动画
    transition(':leave, in => out', animate('160ms ease-in-out')),
]);

// 淡出 Host
export const FadeOutAnimationHost = {
    '[@FadeOutAnimation]': 'state',
    '(@FadeOutAnimation.done)': 'onAnimationDone($event)',
};

// 淡出动画
export const FadeOutAnimation = trigger('FadeOutAnimation', [
    state('void, out', style({ opacity: '0'})),
    state('*, in', style({ opacity: '1'})),
    // 出场动画
    transition(':leave, in => out', animate('160ms ease-in-out')),
]);

// 警告框入场动画
export const AlertInAnimation  = trigger('AlertInAnimation', [
    state('void, out', style({ opacity: '0'})),
    state('in', style({ opacity: '1'})),
    // 进场动画
    transition(':enter, out => in', [ // 进场动画
        animate(160, keyframes([
          style({opacity: 0, transform: 'scale(1.2)', offset: 0}),
          style({opacity: 0.5, transform: 'scale(1.1)',  offset: 0.36}),
          style({opacity: 1, transform: 'scale(1.0)',     offset: 1.0})
        ]))
      ]),
    // 出场动画
    transition(':leave, in => out', animate('160ms ease-in-out')),
]);

// 警告框入场出场动画
export const AlertInOutAnimation  = trigger('AlertInOutAnimation', [
    state('void, out', style({ opacity: '0', transform: 'scale(1.2)'})),
    state('in', style({ opacity: '1', transform: 'scale(1.0)'})),
    // 进场动画
    transition(':enter, out => in', [ // 进场动画
        animate(160, keyframes([
          style({opacity: 0, transform: 'scale(1.2)', offset: 0}),
          style({opacity: 0.5, transform: 'scale(1.1)',  offset: 0.36}),
          style({opacity: 1, transform: 'scale(1.0)',     offset: 1.0})
        ]))
      ]),
    // 出场动画
    transition(':leave, in => out', animate(160, keyframes([
        style({opacity: 1, transform: 'scale(1)', offset: 0}),
        style({opacity: 0, transform: 'scale(0.8)', offset: 1.0})
      ]))),
]);

