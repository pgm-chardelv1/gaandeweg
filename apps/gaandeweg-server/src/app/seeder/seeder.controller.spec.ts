import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
import { Test, TestingModule } from '@nestjs/testing';
import { SeederController } from './seeder.controller';
import { SeederService } from './seeder.service';

const moduleMocker = new ModuleMocker(global);

/**
 * Tests the SeederController class.
 * @returns None
 */
describe('SeederController', () => {
  let controller: SeederController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SeederController],
    })
      .useMocker((token) => {
        if (token === SeederService) {
          return {
            startSeed: () =>
              jest.fn().mockResolvedValue({
                message: 'Success!',
              }),
          };
        }
        if (typeof token === 'function') {
          const mockMetadata = moduleMocker.getMetadata(
            token
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ) as MockFunctionMetadata<any, any>;
          const Mock = moduleMocker.generateFromMetadata(mockMetadata);
          return new Mock();
        }
      })
      .compile();

    controller = module.get<SeederController>(SeederController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
