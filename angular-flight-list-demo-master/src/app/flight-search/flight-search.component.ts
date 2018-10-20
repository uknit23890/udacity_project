import { Component } from '@angular/core';
import { Flight } from '../entities/flight';
import { Http, Response, URLSearchParams } from '@angular/http';
import { FlightService } from './flight.service';

@Component({
  selector: 'flight-search',
  templateUrl: './flight-search.component.html',
})
export class FlightSearchComponent {

  from: string;
  to: string;
  date: string;
  flightNum: string;
  isFlightAvailable: boolean;
  selectedFlight: Flight;
  cities =['Ahmedabad','Pune','Delhi', 'Mumbai'];
  flightList: Array<Flight> = [];
  selected: string = '';

  constructor(private flightService: FlightService, private http: Http) {

    console.debug('In Flight Service Component');
  }


  get flights(): Array<Flight> {
    this.flightList = this.flightService.flights;
    return this.flightService.flights;
  }

  // This method parses the data to JSON
  private parseData(res: Response)  {
    return res.json() || [];
  }

  /**
   * To get all the flights available.
   */
  getAllFlights() {
    this.flightService.all();
  }

  /**
   * To fetch the list of flights based on the flight number.
   */
  findByFlightNumber() {
    this.flightService.findByFlightNumber(this.flightNum);

  }

  /**
   * To search the flights based on the flight origin and destination with date of journey.
   */
  search(): void {
    this.isFlightAvailable = true;
    this.flightService.find(this.from, this.to, this.date);
  }

  select(f: Flight) {
    this.selectedFlight = f;
  }

  mychange(val){
    var self = this;
    var chIbn = this.date.split("/").join("-");
   console.log(chIbn);
   this.date = chIbn;
  }
}
