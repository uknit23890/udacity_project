import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Flight } from '../entities/flight';
import { Http, URLSearchParams, Headers } from '@angular/http';

@Injectable()
export class FlightService {

  flights: Flight[] = [];

  constructor(private http: Http) {
    console.debug('In Flight Service constrry!');
  }

  find(from: string, to: string): void {
    let search = new URLSearchParams();
    search.set('from', from);
    search.set('to', to);

    let headers = new Headers();
    headers.set('Accept', 'application/json');

    let url = 'http://localhost:3000/routes';

    this
        .http
        .get(url, { search, headers })
        .map(resp =>
        resp.json()
        )
      .subscribe(
        flights => {
          this.flights = flights;
        },
        err => {
          console.error('Fehler beim Laden', err);
        }
      )

  }

}
