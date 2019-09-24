import { FlightApiGateway } from './flightApiGateway';
import fetch from 'node-fetch';
jest.mock('node-fetch');

describe('FlightApiGateway - retriveList', () => {
  it('expires timeout', async () => {
    //@ts-ignore
    fetch.mockImplementation(async () => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve({ json: Promise.resolve({}) });
        }, 2);
      });
    });

    const flightApi = new FlightApiGateway();

    const a = await flightApi.retriveList('/', 1).catch(e => e.message);
    expect(a).toEqual('Timer expired');
  });
});
