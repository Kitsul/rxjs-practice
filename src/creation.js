import {of, from, Observable, fromEvent, range, timer, interval} from 'rxjs'
import {scan, map} from "rxjs/operators";

const stream$ = of(1, 2, 3, 4, 5, 6, 7);
stream$.subscribe(value => {
    console.log('Value stream$', value);
})

const array$ = from([1, 2, 3, 4]).pipe(
    scan((acc, value) => acc.concat(value), [])
);
array$.subscribe(value => {
    console.log('Value array$', value);
});


const streamObservable$ = new Observable(observer => {
    observer.next('First value')
    setTimeout(() => observer.next('After 1000 ms'), 1000)
    setTimeout(() => observer.complete(), 1500)
    // setTimeout(() => observer.error('Something went wrong'), 2000)

    setTimeout(() => observer.next('After 3000 ms'), 3000)
});

// streamObservable$.subscribe(
//     value => console.log('streamObservable$:', value),
//     error => console.log(error),
//     () => console.log('complete')
// );

streamObservable$.subscribe({
    next(value) {
        console.log(value);
    },
    error(error) {
        console.log(error);
    },
    complete() {
        console.log('complete')
    }
});

fromEvent(document.querySelector('canvas'), 'mousemove')
.pipe(
    map(e => ({
        x: e.offsetX,
        y: e.offsetY,
        context: e.target.getContext('2d')
    }))
)
.subscribe(position => {
    position.context.fillRect(position.x, position.y, 2, 2)
})

const clear$ = fromEvent(document.getElementById('clear'), 'click');

clear$.subscribe(() => {
    const canvas = document.querySelector('canvas');
    canvas.getContext('2d').clearRect(0,0,canvas.width, canvas.height);
})

const  subscription =  interval(500).subscribe(value => console.log('interval:', value));
setTimeout( () => subscription.unsubscribe(), 4000)

timer(2500).subscribe(value => console.log('timer:', value));

range(42, 10).subscribe(value => console.log('range:', value));