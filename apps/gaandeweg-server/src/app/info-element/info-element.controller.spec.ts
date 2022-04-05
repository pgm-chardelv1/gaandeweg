import { Test, TestingModule } from '@nestjs/testing';
import { InfoElementController } from './info-element.controller';
import { InfoElementService } from './info-element.service';

describe('InfoElementController', () => {
  let controller: InfoElementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InfoElementController],
      providers: [InfoElementService],
    }).compile();

    controller = module.get<InfoElementController>(InfoElementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
