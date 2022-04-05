import { Test, TestingModule } from '@nestjs/testing';
import { InfoElementService } from './info-element.service';

describe('InfoElementService', () => {
  let service: InfoElementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InfoElementService],
    }).compile();

    service = module.get<InfoElementService>(InfoElementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
