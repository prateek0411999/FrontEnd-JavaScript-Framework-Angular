import {trigger, state,style, animate, transition} from '@angular/animations';
export function visibility() {
  return   trigger('visibility', [
        state('shown', style({
            transform: 'scale(1.0)',
            opacity: 1
        })),
        state('hidden', style({
            transform: 'scale(0.5)',
            opacity: 0
        })),
        transition('* => *', animate('0.5s ease-in-out'))
    ]);
}
//trigger ka first argument uska name rehta hh
//flyInOut and Visibility

export function flyInOut() {
    return trigger('flyInOut',[
        state('*', style({
            opacity: 1,
            transform: 'translateX(0)'
        })),
        transition(':enter', [
            style({transform: 'translateX(-100%)',opacity: 0}),
            animate('500ms ease-in')
            
        ]),
        transition(':leave',[
            animate('500ms ease-out', style({transform: 'translateX(100%)', opacity: 0}))

        ])                              
        //So enter, meaning that now when I route into a particular view in my single page application, that view will be entering into the view. So, that's why I can apply the colon enter transition in that case. Now similarly, there is another transition called colonleave which I can apply when you transition out of this view and then you're taking the view out from the router outlet of your application. So, we're going to do both enter and the other one which is leave. 
    ])
}

export function expand(){
    return trigger( 'expand',[
        state('*', style({
            opacity: 1,
            transform: 'translateX(0)'
        })),
        transition(':enter',[
            style({
                transform: 'translateY(-50%)',
                opacity: 0
            }),
            animate('200ms ease-in', style({
                opacity: 1,
                transform: 'translateX(0)'
            }))
        ])

     ]);
}