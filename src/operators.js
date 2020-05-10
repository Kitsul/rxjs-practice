import {interval, fromEvent} from 'rxjs'
import {filter, map, tap, take, takeLast, takeWhile, scan, reduce, switchMap} from "rxjs/operators";

fromEvent(document, 'click')
    .pipe(
        switchMap(event => {
            return interval(1000)
                .pipe(
                    tap(value => console.log('Tap:', value)),
                    take(5),
                    reduce((acc, value) => acc + value)
                )
        })
    )
    .subscribe({
        next: value => console.log('Next:', value),
        complete: () => console.log('complete'),
        error: err => console.log(err)
    });

// const stream$ = interval(1000)
//     .pipe(
//         //tap(value => console.log('Tap:', value)),
//         // map((value) => value * 3),
//         // filter(value => value % 2 === 0),
//         take(5),
//         //takeLast(5)
//         //takeWhile(value => value < 7)
//         //scan((acc, value) => acc + value, 0)
//         reduce((acc, value) => acc + value, 0)
//     );
//
// stream$.subscribe({
//     next: value => console.log('Next:', value),
//     complete: () => console.log('complete'),
//     error: err => console.log(err)
// })








// Example for Angular for Api

// ng generate service apicall

// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import * as Rx from "rxjs/Rx";
// import { from, Observable, throwError } from 'rxjs';
// import { map, catchError } from 'rxjs/operators';
// @Injectable({
//     providedIn: 'root'
// })
// export class ApicallService {
//     constructor(private httpClient: HttpClient) {}
//
// searchCountryByName(name: string): Observable<Country[]>{
//     let headers: HttpHeaders = new HttpHeaders();
//         headers = headers.append('Accept', 'application/json');
//          headers = headers.append(
//                    'X-RapidAPI-Key',
//                    '1108554cc1mshf11c17c4fea2b3dp179054jsn2446fb7a8965'
// );
//      return this.httpClient.get( `https://restcountries-v1.p.rapidapi.com/capital/` + name, {headers: headers})
//      .pipe(
//          map((data: Country[]) => {
//               return data;
//          }), catchError( error => {
//         return throwError( 'Capital not found!' );
//       })
// )
// }
// }



// searchCapital() {
//     this.apiService
//         .searchCountryByName(this.name)
//         .subscribe((data:Country[]) => {
//             console.log(data);
//         });
// }

// ng generate class country

// export class Country {
//     id: number;
//     name: string;
//     capital:string;
// }