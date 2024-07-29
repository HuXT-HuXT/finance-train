import { pgTable, text } from "drizzle-orm/pg-core";

// after and new/ change fields, consts and etc run: npm run db:generate and npm run db:migrate
export const accounts = pgTable('accounts', {
  id: text('id').primaryKey(),
  plaidId: text('plaid_id'),
  name: text('name').notNull(),
  userId: text('user_id').notNull(),
});
