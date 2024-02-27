import { z } from 'zod';

export const createFlightSchema = z
  .object({
    drone: z.string(),
    pilot: z.string(),
  })
  .required();

export type CreateDroneDto = z.infer<typeof createFlightSchema>;
