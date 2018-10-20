import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Flight } from '../entities/flight';
import { FlightService } from './flight.service';

@Component({
  selector: 'flight-card',
  templateUrl: './flight-card.component.html'
})
export class FlightCardComponent {
  @Input() item: Flight;
  @Input() selected: boolean;
  @Output() selectedChange = new EventEmitter<boolean>();

  constructor(private flightService: FlightService) {  }
  
  /**
   * To select the card
   */
  select() {
    this.selected = true;
  }

  /**
   * To De-Select the Card.
   */
  deselect() {
    this.selected = false;
    this.selectedChange.next(this.selected);
  }

  /**
   * To display the flights, get the list of flights from FlightService.
   */
  get flights(): Array<Flight> {
    return this.flightService.flights;
  }
}
