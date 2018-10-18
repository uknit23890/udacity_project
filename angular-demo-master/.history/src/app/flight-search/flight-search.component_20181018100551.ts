import { Component } from '@angular/core';
import { Flight } from '../entities/flight';
import { Http, Response, URLSearchParams } from '@angular/http';
import { FlightService } from './flight.service';

@Component({
  selector: 'flight-search',
  templateUrl: './flight-search.component.html',
  //providers: [FlightService]
})
export class FlightSearchComponent {
  flightsss: Flight[] = [];

  from: string;
  to: string;

  isFlightAvailable: boolean;
  selectedFlight: Flight;

  // any: number, booleans, string, objects

  basket: object = {
    "3": true,
    "4": false,
    "5": true
  };

  //private http: Http;

  constructor(private flightService: FlightService, private http: Http) {

    console.debug('Liebesgrüße aus dem Konstruktor!');
  }

  // flights: Array<Flight> = [];

  get flights(): Array<Flight> {
    return this.flightService.flights;
  }

  call() {
    this.http.get('http://localhost:3000/cities').map((res: Response) => { console.log(res.json()); });
  }
  // This method parses the data to JSON
  private parseData(res: Response)  {
    return res.json() || [];
  }

  getAllFlights() {


    let headers = new Headers();
    headers.set('Accept', 'application/json');

    let url = 'http://localhost:3000/cities';

    this
        .http
        .get(url)
        .map(resp =>
        resp.json()
        )
      .subscribe(
        flights => {
          this.flightsss = flights;
          console.log( this.flightsss );
        },
        err => {
          console.error('Fehler beim Laden', err);
        }
      )
  }

  search(): void {
    this.call();
    this.isFlightAvailable = true;
    this.flightService.find(this.from, this.to);

  }

  select(f: Flight) {
    this.selectedFlight = f;
  }
}
