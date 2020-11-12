import { trigger, transition, style, query, group, animate, state, keyframes   } from '@angular/animations';

export const slideRightTransparent = [
  query(':enter, :leave', style({ }), { optional: true }),
  group([
    query(':enter', [style({ transform: 'translateX(100%)', opacity: '0' }), animate('.3s ease-in-out', style({ transform: 'translateX(0%)' , opacity: '1' }))], {
      optional: true,
    }),
    query(':leave', [style({ transform: 'translateX(0%)', opacity: '1'}), animate('.3s ease-in-out', style({ transform: 'translateX(-100%)', opacity: '0'}))], {
      optional: true,
    }),
  ]),
];

export const fadeIn = [
  group([
    query(':enter', [style({ opacity: '.5' }), animate('.6s ease-out', style({ opacity: '1' }))], {
      optional: true,
    }),
    query(':leave', [style({ opacity: '1' }), animate('.3s ease-out', style({ opacity: '.5' }))], {
      optional: true,
    }),
  ])
];

export const deleteNote =
  trigger('deleteNote', [
    state('delete', style({ transform: 'scale(0)', opacity: '0' })),
    state('idle', style({ transform: 'scale(1)', opacity: '1' })),
    transition('idle <=> delete', animate(250))
  ]);



export const expandDescription =
  trigger('expandDescription', [
    transition(':enter', [
      animate('100ms ease-in', keyframes([
        style({ height: '0px', opacity: '0' }),
        style({ height: '*' })
      ]))
    ]),
    transition(':leave', [
      animate('100ms ease-in', keyframes([
        style({ height: '*', opacity: '0' }),
        style({ height: '0px', opacity: '0' }),
      ]))
    ]),
  ]);
