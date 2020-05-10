import { Subject, BehaviorSubject, ReplaySubject } from "rxjs";


//Subject

// document.addEventListener('click', ()=> {
//     const stream$ = new Subject();
//     stream$.subscribe(value => console.log('stream$', value));
//     stream$.next('Hello');
//     stream$.next('Rx');
//     stream$.next('Js');
//
// });

//BehaviorSubject

// document.addEventListener('click', ()=> {
//     const stream$ = new BehaviorSubject('First');
//     stream$.subscribe(value => console.log('stream$', value));
//     stream$.next('Hello');
//     stream$.next('Rx');
//     stream$.next('Js');
//
// });

// ReplaySubject
// document.addEventListener('click', ()=> {
//     const stream$ = new ReplaySubject(2);
//     stream$.next('Hello');
//     stream$.next('Rx');
//     stream$.next('Js');
//
//     stream$.subscribe(value => console.log('stream$', value));
//
// });