import { Slice } from './slice';

export interface Flight {
  slices: Slice[];
  price: number;
}

export interface FlightSearchResponse {
  flights: Flight[];
}
