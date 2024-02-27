import { z } from 'zod';

export const createPilotSchema = z
  .object({
    name: z.string(),
    age: z.number(),
  })
  .required();

export type CreatePilotDto = z.infer<typeof createPilotSchema>;
