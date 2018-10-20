import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Flight } from '../entities/flight';
import { Http,HttpModule, URLSearchParams, Headers } from '@angular/http';

@Injectable()
export class FlightService {

  flights: Flight[] = [];
  serviceUrl = 'http://localhost:3000';

  constructor(private http: Http) {
    console.debug('In Flight Service constructor!');
  }

  all(): void {
    let url = 'http://localhost:3000/flights';
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
          console.error('Error while fetching all flights', err);
        }
      )

  }

  findByFlightNumber(flightNumber: string): void {
    let search = new URLSearchParams();
    search.set('flightNumber', flightNumber);
    let url = this.serviceUrl+'/getFlightsByFlightNumber/'+ flightNumber;
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
          console.error('Error in service calling', err);
        }
      )
  }

  /**
   * This method fetches data from server on the basis of departure, arrival and date of flight.
   * @param: from[departure station] , to[destination station] , date[date of journey]
   */
  find(from: string, to: string, date: string): void {
    let search = new URLSearchParams();
    search.set('from', from);
    search.set('to', to);
    search.set('date', date);

    let url = this.serviceUrl+'/getFlightSearch/'+ from +'/'+ to + '/' + date;
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
          console.error('Error in service calling', err);
        }
      )

  }

}
