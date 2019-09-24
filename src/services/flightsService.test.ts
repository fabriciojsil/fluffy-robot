import { Flight, FlightSearchResponse } from '../entities/flight';
import { FlightService } from './flightsService';
import { FlightApiGateway } from '../gateways/flightApiGateway';

const sourceResponse1: FlightSearchResponse = {
  flights: [
    {
      slices: [
        {
          origin_name: 'Schonefeld',
          destination_name: 'Stansted',
          departure_date_time_utc: '2019-08-08T16:00:00.000Z',
          arrival_date_time_utc: '2019-08-08T17:55:00.000Z',
          flight_number: '146',
          duration: 115
        },
        {
          origin_name: 'Stansted',
          destination_name: 'Schonefeld',
          departure_date_time_utc: '2019-08-10T18:00:00.000Z',
          arrival_date_time_utc: '2019-08-10T20:00:00.000Z',
          flight_number: '8544',
          duration: 120
        }
      ],
      price: 130.1
    }
  ]
};

const sourceResponse2: FlightSearchResponse = {
  flights: [
    {
      slices: [
        {
          origin_name: 'Schonefeld',
          destination_name: 'Stansted',
          departure_date_time_utc: '2019-08-08T16:00:00.000Z',
          arrival_date_time_utc: '2019-08-08T17:55:00.000Z',
          flight_number: '146',
          duration: 115
        },
        {
          origin_name: 'Stansted',
          destination_name: 'Schonefeld',
          departure_date_time_utc: '2019-08-10T18:00:00.000Z',
          arrival_date_time_utc: '2019-08-10T20:00:00.000Z',
          flight_number: '252',
          duration: 120
        }
      ],
      price: 130.1
    }
  ]
};

describe('Flights Service - getUniqueFlights', () => {
  it('empty response for both sources', async () => {
    const expected: Flight[] = [];

    const fakeFlightApi = new FlightApiGateway();
    fakeFlightApi.retriveList = jest
      .fn()
      .mockImplementation(() => Promise.resolve([]));

    const flights = new FlightService(fakeFlightApi);
    const result = await flights.getUniqueFlights();
    expect(result).toEqual(expected);
  });

  it('get unique flights successfuly', async () => {
    const expected: Flight[] = [
      ...sourceResponse1.flights,
      ...sourceResponse2.flights
    ];

    const fakeFlightApi = new FlightApiGateway();
    fakeFlightApi.retriveList = jest
      .fn()
      .mockImplementationOnce(() => Promise.resolve(sourceResponse1))
      .mockImplementationOnce(() => Promise.resolve(sourceResponse2));

    const flights = new FlightService(fakeFlightApi);
    const result = await flights.getUniqueFlights();

    expect(result).toEqual(expected);
  });
});
