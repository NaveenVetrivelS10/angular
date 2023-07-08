
import { Component } from '@angular/core';

@Component({
  selector: 'app-seat-booking',
  templateUrl: './seat-booking.component.html',
  styleUrls: ['./seat-booking.component.css']
})
export class SeatBookingComponent {
  totalSeats: number = 80;
  seatsPerRow: number = 7;
  lastRowSeats: number = 3;
  seats: number[] = Array(this.totalSeats).fill(0);

  bookSeats(numSeats: number) {
    if (numSeats <= 0) {
      console.log("Invalid number of seats!");
      return;
    }

    let startSeat = -1;
    const rowLimit = Math.floor(this.totalSeats / this.seatsPerRow);

    // Check for available seats in one row
    for (let row = 0; row < rowLimit; row++) {
      let availableInRow = 0;
      for (let seat = row * this.seatsPerRow; seat < (row + 1) * this.seatsPerRow; seat++) {
        if (this.seats[seat] === 0) {
          availableInRow++;
          if (availableInRow === numSeats) {
            startSeat = seat - numSeats + 1;
            break;
          }
        } else {
          availableInRow = 0;
        }
      }

      if (startSeat !== -1) {
        break;
      }
    }

    // If no seats found in one row, book nearby seats
    if (startSeat === -1) {
      for (let seat = 0; seat < this.totalSeats; seat++) {
        if (this.seats[seat] === 0) {
          startSeat = seat;
          break;
        }
      }
    }

    // Book the seats
    if (startSeat !== -1) {
      for (let i = startSeat; i < startSeat + numSeats; i++) {
        this.seats[i] = 1;
      }
      console.log(`${numSeats} seat(s) booked successfully!`);
    } else {
      console.log("No seats available!");
    }
  }

  isSeatAvailable(seatIndex: number): boolean {
    return this.seats[seatIndex] === 0;
  }
}
