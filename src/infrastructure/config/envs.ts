import { z } from 'zod';
import * as dotenv from 'dotenv';

dotenv.config();

const schema = z.object({
  DATABASE_URL: z.string().url({ message: 'DATABASE_URL is required' }),
  PORT: z.string().transform(Number).default('3000'),
  MFA_SECRET: z.string().min(1),
  MFA_EXPIRE_IN: z.string().min(2),
  JWT_SECRET: z.string().min(1),
  JWT_EXPIRE_IN: z.string().min(2),
});

const parsed = schema.safeParse(process.env);

if(!parsed.success) {
  console.error('env error: ', parsed.error.flatten().fieldErrors)
  process.exit(1)
}

export const env = parsed.data;
