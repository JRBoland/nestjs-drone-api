import { Test, TestingModule } from '@nestjs/testing';
import { DronesController } from './drones.controller';
import { DronesService } from './drones.service';

describe('DronesController', () => {
  let controller: DronesController;

  const mockDronesService = {
    create: jest.fn((dto) => {
      return {
        id: expect.any(Number),
        ...dto,
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DronesController],
      providers: [DronesService],
    })
      .overrideProvider(DronesService)
      .useValue(mockDronesService)
      .compile();

    controller = module.get<DronesController>(DronesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a drone', async () => {
    const dto = { name: 'Jest Tester Drone', weight: 99 };
    expect(await controller.create(dto)).toEqual({
      message: 'Drone created',
      drone: {
        id: expect.any(Number),
        name: 'Jest Tester Drone', // can also use dto.name
        weight: 99, // or dt.weight
      },
    });

    expect(mockDronesService.create).toHaveBeenCalledWith(dto);
  });
});
