import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Flight } from '../entities/flight';
import { Http, URLSearchParams, Headers } from '@angular/http';

@Injectable()
export class FlightService {

  flights: Flight[] = [];

  constructor(private http: Http) {
    console.debug('In Flight Service constructor!');
  }

  all(): void {}

  find(from: string, to: string): void {
    let search = new URLSearchParams();
    search.set('from', from);
    search.set('to', to);

    let headers = new Headers();
    headers.set('Accept', 'application/json');

    let url = 'http://localhost:3000/getFlights/{{from}}/{{to}}';

    this
        .http
        .get(url)
        .map(resp =>
        resp.json()
        )
      .subscribe(
        flights => {
          this.flights = flights;
          console.log( this.flights );
        },
        err => {
          console.error('Fehler beim Laden', err);
        }
      )

  }

}
