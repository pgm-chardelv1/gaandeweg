import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
import { Test, TestingModule } from '@nestjs/testing';
import { InfoElementController } from './info-element.controller';
import { InfoElementService } from './info-element.service';

const moduleMocker = new ModuleMocker(global);

describe('InfoElementController', () => {
  let controller: InfoElementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InfoElementController],
    })
      .useMocker((token) => {
        if (token === InfoElementService) {
          return {
            findAll: () =>
              jest.fn().mockResolvedValue([
                {
                  id: 2,
                  version: '1.0.0',
                  name: 'Info 1',
                  definition: 'Info 1 definition',
                  text: 'Info 1 text',
                },
              ]),
          };
        }
        if (typeof token === 'function') {
          const mockMetadata = moduleMocker.getMetadata(
            token
          ) as MockFunctionMetadata<any, any>;
          const Mock = moduleMocker.generateFromMetadata(mockMetadata);
          return new Mock();
        }
      })
      .compile();

    controller = module.get<InfoElementController>(InfoElementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
