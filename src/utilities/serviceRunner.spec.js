import sinon from 'sinon';

import handleError from './handleError';
import { callService } from './serviceRunner';

describe('Service runner tests', () => {

  describe('test handleError utility', () => {
    it('should handle being improperly called (without an error)', () => {
      const error = null;

      const result = handleError(error);
      expect(result).toHaveProperty('message', 'An error occurred that was not handled properly.')
    });

    it('should return an error object with a message property', () => {
      const error = 'Whoops';

      const result = handleError(error);
      expect(result).toHaveProperty('message', 'Whoops');
    });

    it('should return response data if passed a response as error', () => {
      const error = { response: { data: 'Whoops'} };

      const result = handleError(error);
      expect(result).toEqual({ message: error.response.data });
    });

    it('should return error intact if not passed a response object', () => {
      const error = 'Whoops';

      const result = handleError(error);
      expect(result).toEqual({ message: error });
    });

    it('Should append a message to the error object if there was not one already', () => {
      const error = { foo: 'Whoops' };

      const result = handleError(error);
      expect(result).toHaveProperty('message', 'There was an error.')
    });
  });

  describe('test callService utility', () => {
    const config = { service: 'test' };
    let sandbox;
    let server;

    beforeEach(() => {
      sandbox = sinon.sandbox.create();
      server = sandbox.useFakeServer();
    });

    afterEach(() => {
      server.restore();
      sandbox.restore();
    });

    it('Should call service', async () => {

      const responseObj = [{"message": "This is a test."}];

      server.respondWith([200, { 'Content-Type': 'application/json' }, '[{"message": "This is a test."}]']);
      setTimeout(() => server.respond(), 0);

      const response = await callService(config);

      expect(response.data).toEqual(responseObj);
    });

    it('should handle errors', async () => {
      // if no server config given, default response is a 404.
      server.respondWith([500, {}, '{"message": "Whoops"}']);
      setTimeout(() => server.respond());

      expect.assertions(1);
      try {
        await callService(config);
      } catch (e) {
        expect(e).toEqual({"message": "Whoops"});
      }

    })

  });
});
