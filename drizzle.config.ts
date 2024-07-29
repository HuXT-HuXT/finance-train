// created at 2:05:00, require package pg: npm i pg

import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: '.env.local'});

export default defineConfig({
  schema: './db/schema.ts',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
  verbose: true,
  strict: true,
})