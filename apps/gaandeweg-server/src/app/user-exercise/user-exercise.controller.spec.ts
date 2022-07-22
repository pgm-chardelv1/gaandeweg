import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
import { Test, TestingModule } from '@nestjs/testing';
import { UserExerciseController } from './user-exercise.controller';
import { UserExerciseService } from './user-exercise.service';

const moduleMocker = new ModuleMocker(global);

describe('UserExercisesController', () => {
  let controller: UserExerciseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserExerciseController],
    })
      .useMocker((token) => {
        if (token === UserExerciseService) {
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
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ) as MockFunctionMetadata<any, any>;
          const Mock = moduleMocker.generateFromMetadata(mockMetadata);
          return new Mock();
        }
      })
      .compile();

    controller = module.get<UserExerciseController>(UserExerciseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
