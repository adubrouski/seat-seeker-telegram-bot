export interface PointOfDeparture {
  city: string;
  station: string;
  date: string;
  time: string;
}

export interface PointOfDestination {
  city: string;
  station: string;
  time: string;
}

export interface SeatsModel {
  cost: string;
  paymentByCard: boolean;
  freeSeats: string;
}

export type Seats = SeatsModel | null;

export interface Route {
  pointOfDeparture: PointOfDeparture;
  pointOfDestination: PointOfDestination;
  seats: Seats;
}
