import fetch, { Response } from 'node-fetch';
import dotenv from 'dotenv';
import { FlightSearchResponse } from '../entities/flight';

dotenv.config();
const { FLIGHT_API_URL } = process.env;

export interface ApiGateway<T> {
  retriveList(url: string): Promise<T>;
}

export class FlightApiGateway implements ApiGateway<FlightSearchResponse> {
  public async retriveList(
    path: string,
    timeout = 1000
  ): Promise<FlightSearchResponse> {
    return new Promise<FlightSearchResponse>((resolve, reject) => {
      const timer = setTimeout(() => {
        reject(new Error('Timer expired'));
      }, timeout);

      fetch(`${FLIGHT_API_URL}${path}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(async (res: Response) => {
          clearTimeout(timer);
          const response = await res.json();
          resolve(response);
        })
        .catch((err: Error) => {
          clearTimeout(timer);
          reject(err);
        });
    });
  }
}
