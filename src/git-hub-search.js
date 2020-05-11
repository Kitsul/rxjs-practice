import {EMPTY, fromEvent} from 'rxjs'
import {catchError, debounceTime, distinctUntilChanged, map, mergeMap, switchMap, tap, filter } from "rxjs/operators";
import {ajax} from "rxjs/ajax";

const url = 'https://api.github.com/search/users?q='

const search = document.getElementById('search')
const result = document.getElementById('result')

const stream$ = fromEvent(search, 'input')
    .pipe(
        map(event => event.target.value), // transform object
        debounceTime(1000), //wait 1000ms
        distinctUntilChanged(),
        tap(() => result.innerHTML = ''), // clear Html after each change
        filter(value => value.trim()), // filter empty name value
        switchMap(value => ajax.getJSON(url + value).pipe(  // Get call to GitHub Api
            catchError(err => EMPTY)                           // catch error from ajax
        )),
        map(response => response.items), // transform object after Get call
        mergeMap(items => items) // flat model
    );

stream$.subscribe({
    next: user => {
        const html = `
           <div class="card">
               <div class="card-image">
                    <img src="${user.avatar_url}">
                    <span class="card-title">${user.login}</span>
                </div>
                <div class="card-action">
                    <a href="${user.html_url}" target="_blank">OPEN GitHub</a>
                </div>
            </div>
        `;
        result.insertAdjacentHTML('beforeend', html);
    }
})