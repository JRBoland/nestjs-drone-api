import { z } from 'zod';

export const createFlightSchema = z
  .object({
    drone: z.string(),
    pilot: z.string(),
  })
  .required();

export type CreateFlightDto = z.infer<typeof createFlightSchema>;
