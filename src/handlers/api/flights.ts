import express from 'express';
import { FlightApiGateway } from '../../gateways/flightApiGateway';
import { FlightService } from '../../services/flightsService';

const flightApi = new FlightApiGateway();
const flightsService = new FlightService(flightApi);

//
// const cancelFunc = () => {
//   console.log('cancelled');
// };

export const getFlights = async (_: express.Request, res: express.Response) => {
  // req.connection.on('close', cancelFunc);
  const flights = await flightsService.getUniqueFlights();
  res.send(flights);
  // req.connection.removeListener('close', cancelFunc);
};
