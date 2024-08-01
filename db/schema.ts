import { pgTable, text } from "drizzle-orm/pg-core";
// added at 2:44:17 npm i drizzle-zod
import { createInsertSchema } from "drizzle-zod";

// after and new/ change fields, consts and etc run: npm run db:generate and npm run db:migrate
export const accounts = pgTable('accounts', {
  id: text('id').primaryKey(),
  plaidId: text('plaid_id'),
  name: text('name').notNull(),
  userId: text('user_id').notNull(),
});

export const insertAccountSchema = createInsertSchema(accounts);