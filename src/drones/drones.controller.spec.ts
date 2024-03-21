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
    update: jest.fn((id, dto) => ({
      id,
      ...dto,
    })),
    findOne: jest.fn((id) => ({
      id,
      name: 'Test findOne Drone',
      weight: 123,
    })),
    remove: jest.fn((id) => ({
      message: `Drone #${id} and all associated flights deleted`,
    })),
    findAll: jest.fn(() => [
      { id: 1, name: 'Test Drone One', weight: 111 },
      { id: 2, name: 'Test Drone Two', weight: 222 },
    ]),
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

  it('should update a drone', async () => {
    const dto = { name: 'Jest Tester Drone Update', weight: 88 };
    const droneId = 1;

    // more readable?
    expect(await controller.update(droneId, dto)).toEqual({
      message: 'Drone #1 updated: ',
      drone: {
        id: 1,
        name: 'Jest Tester Drone Update',
        weight: 88,
      },
    });

    // CAN ALTERNATIVELY HAVE (cleaner):
    //expect(await controller.update(droneId, dto)).toEqual({
    //  message: `Drone #${droneId} updated: `,
    //  drone: {
    //    id: droneId,
    //    ...dto,
    //  },
    //});

    expect(mockDronesService.update).toHaveBeenCalledWith(droneId, dto);
  });

  it('should return a drone by id', async () => {
    const droneId = 1;
    const dto = {
      message: {
        id: droneId,
        name: 'Test findOne Drone',
        weight: 123,
      },
    };
    const result = await controller.findOne(droneId);
    expect(result).toEqual(dto);

    expect(mockDronesService.findOne).toHaveBeenCalledWith(droneId);
  });

  it('should delete a drone by id', async () => {
    const droneId = 1;

    const result = await controller.remove(droneId);
    expect(result).toEqual({
      message: 'Drone #1 and all associated flights deleted',
    });
  });

  it('should return all drones', async () => {
    const drones = [
      { id: 1, name: 'Test Drone One', weight: 111 },
      { id: 2, name: 'Test Drone Two', weight: 222 },
    ];

    const result = await controller.findAll();
    expect(result).toEqual(drones);

    expect(mockDronesService.findAll).toHaveBeenCalled();
  });
});
