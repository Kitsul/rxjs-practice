import { Subject } from 'rxjs'
import { scan, startWith, shareReplay } from 'rxjs/operators'

const initialState = {
    counter: 0
}

const pre = document.querySelector('pre');

const handlers = {
    INCREMENT: state => ({...state, counter: state.counter + 1 }),
    DECREMENT: state => ({...state, counter: state.counter - 1 }),
    ADD: (state, action) => ({...state, counter: state.counter + action.payload }),
    DEFAULT: state => state
}
function reduser(state = initialState, action) {
    const handler = handlers[action.type] || handlers.DEFAULT;
    return handler(state, action);
}

// function reduser(state = initialState, action) {
//     switch (action.type) {
//         case 'INCREMENT': return {...state, counter: state.counter + 1 }
//         case 'DECREMENT': return {...state, counter: state.counter - 1 }
//         case 'ADD': return {...state, counter: state.counter + action.payload }
//         default: return state
//     }
// }

function createStore(rootReduser) {
    const subject$ = new Subject();
    const store$ = subject$.pipe(
        startWith({type: '__INIT__'}),
        scan(rootReduser, undefined),
        shareReplay(1)
    );
    store$.dispatch = action => subject$.next(action);
    return store$;
}
const store$ = createStore(reduser);

store$.subscribe(state => {
    pre.innerHTML =JSON.stringify(state, null, 2)
})
document.getElementById('increment').addEventListener('click', () => {
    store$.dispatch({type: 'INCREMENT'})
});

document.getElementById('decrement').addEventListener('click', () => {
    store$.dispatch({type: 'DECREMENT'})
});

document.getElementById('add').addEventListener('click', () => {
    store$.dispatch({type: 'ADD', payload: 10})
});