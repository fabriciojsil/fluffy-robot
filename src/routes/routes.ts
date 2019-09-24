import express from 'express';
import { getFlights } from '../handlers/api/flights';

export class Routes {
  constructor(private app: express.Application) {}

  initRoutes() {
    this.app.get('/', getFlights);
  }
}
