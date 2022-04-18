import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

const moduleMocker = new ModuleMocker(global);

/**
 * Tests the CategoryController class.
 * @returns None
 */
describe('CategoryController', () => {
  let controller: CategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
    })
      .useMocker((token) => {
        if (token === CategoryService) {
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
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ) as MockFunctionMetadata<any, any>;
          const Mock = moduleMocker.generateFromMetadata(mockMetadata);
          return new Mock();
        }
      })
      .compile();

    controller = module.get<CategoryController>(CategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
