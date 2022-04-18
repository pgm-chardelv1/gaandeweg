import { Test } from '@nestjs/testing';

import { AppService } from './app.service';

/**
 * A test function that tests the getData function.
 * @returns None
 */
describe('AppService', () => {
  let service: AppService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    service = app.get<AppService>(AppService);
  });

  describe('getData', () => {
    it('should return "Welcome to gaandeweg-server!"', () => {
      expect(service.getData()).toEqual({
        message: 'Welcome to gaandeweg-server!',
      });
    });
  });
});
