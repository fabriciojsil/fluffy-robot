import { FlightApiGateway } from '../gateways/flightApiGateway';
import { FlightSearchResponse, Flight } from '../entities/flight';
import { Slice } from '../entities/slice';

export class FlightService {
  private apiGateway: FlightApiGateway;
  private source1Path = '/source1';
  private source2Path = '/source2';

  constructor(apiGateway: FlightApiGateway) {
    this.apiGateway = apiGateway;
  }

  private async makeRequest(url: string): Promise<FlightSearchResponse> {
    return this.apiGateway
      .retriveList(url)
      .catch(() => ([] as unknown) as FlightSearchResponse);
  }

  private extractUniqueKey(flight: Flight): string {
    return flight.slices.reduce((key: string, item: Slice) => {
      return `${key}_${item.flight_number}_${item.departure_date_time_utc}`;
    }, '');
  }

  private removeDuplications(...flights: Flight[]): Flight[] {
    const uniques = flights.reduce((acc: Map<string, Flight>, curr: Flight) => {
      acc.set(this.extractUniqueKey(curr), curr);
      return acc;
    }, new Map<string, Flight>());

    return Array.from(uniques.values());
  }

  private extractFlightFromFlightSearchResponse(
    sourceResponse: FlightSearchResponse
  ): Flight[] {
    return (sourceResponse && sourceResponse.flights) || [];
  }

  async getUniqueFlights() {
    const requestSource1 = this.makeRequest(this.source1Path);
    const requestSource2 = this.makeRequest(this.source2Path);

    const [resultSource1, resultSource2] = await Promise.all([
      requestSource1,
      requestSource2
    ]);

    return this.removeDuplications(
      ...this.extractFlightFromFlightSearchResponse(resultSource1),
      ...this.extractFlightFromFlightSearchResponse(resultSource2)
    );
  }
}
