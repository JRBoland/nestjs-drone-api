import { Test, TestingModule } from '@nestjs/testing';
import { DronesService } from './drones.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Drone } from './drone.entity';

describe('DronesService', () => {
  let service: DronesService;

  const mockDronesRepository = {
    create: jest.fn().mockImplementation((dto) => {
      return { ...dto };
    }),
    save: jest.fn().mockImplementation(async (drone) => {
      drone.id = 1;
      return drone;
    }),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DronesService,
        {
          provide: getRepositoryToken(Drone),
          useValue: mockDronesRepository,
        },
      ],
    }).compile();

    service = module.get<DronesService>(DronesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new drone record and return that', async () => {
    const createDto = { name: 'Drone Test', weight: 34 };
    const result = await service.create(createDto);

    expect(result).toEqual({
      id: expect.any(Number),
      name: 'Drone Test',
      weight: 34,
    });
  });
});
