import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
import { Test, TestingModule } from '@nestjs/testing';
import { ModulesController } from './modules.controller';
import { ModulesService } from './modules.service';

const moduleMocker = new ModuleMocker(global);

describe('ModulesController', () => {
  let controller: ModulesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ModulesController],
    })
      .useMocker((token) => {
        if (token === ModulesService) {
          return {
            findAll: () =>
              jest.fn().mockResolvedValue([
                {
                  id: 1,
                  version: '1.0.0',
                  name: 'Module 1',
                  description: 'Module 1 description',
                  summary: 'Module 1 summary',
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

    controller = module.get<ModulesController>(ModulesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
