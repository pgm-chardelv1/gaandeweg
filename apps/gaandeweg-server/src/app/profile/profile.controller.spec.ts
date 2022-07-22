import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
import { Test, TestingModule } from '@nestjs/testing';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';

const moduleMocker = new ModuleMocker(global);

/**
 * Tests the ProfileController class.
 * @returns None
 */
describe('ProfileController', () => {
  let controller: ProfileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfileController],
    })
      .useMocker((token) => {
        if (token === ProfileService) {
          return {
            findAll: () =>
              jest.fn().mockResolvedValue([
                {
                  id: '123',
                  dbkTemplate: `{
                    "key":"value"
                  }`,
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

    controller = module.get<ProfileController>(ProfileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
