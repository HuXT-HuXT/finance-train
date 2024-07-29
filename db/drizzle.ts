// installed & created at ~1:52:00, npm i drizzle-orm --legacy-peer-deps ; npm i drizzle-zod --legacy-peer-deps ; npm i -D drizzle-kit@0.20.17 ; npm i @neondatabase/serverless

import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

export const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql, { schema });

// const accs = db.select().from(schema.accounts).where(eq())