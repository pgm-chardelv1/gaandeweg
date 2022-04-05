import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
import { Test, TestingModule } from '@nestjs/testing';
import { ExerciseController } from './exercise.controller';
import { ExerciseService } from './exercise.service';

const moduleMocker = new ModuleMocker(global);

describe('ExercisesController', () => {
  let controller: ExerciseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExerciseController],
    })
      .useMocker((token) => {
        if (token === ExerciseService) {
          return {
            findAll: () =>
              jest.fn().mockResolvedValue([
                {
                  id: 1,
                  version: '1.0.0',
                  name: 'Exercise 1',
                  description: 'Exercise 1 description',
                  summary: 'Exercise 1 summary',
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

    controller = module.get<ExerciseController>(ExerciseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
