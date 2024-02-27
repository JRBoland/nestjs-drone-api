import { z } from 'zod';

export const createDroneSchema = z
  .object({
    name: z.string(),
    weight: z.number(),
  })
  .required();

export type CreateDroneDto = z.infer<typeof createDroneSchema>;
