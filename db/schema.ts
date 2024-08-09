// added at 5:43:10
import { z } from "zod";
import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
// added at 2:44:17 npm i drizzle-zod
import { createInsertSchema } from "drizzle-zod";
// added at 5:40:38
import { relations } from "drizzle-orm";

// after and new/ change fields, consts and etc run: npm run db:generate and npm run db:migrate
export const accounts = pgTable('accounts', {
  id: text('id').primaryKey(),
  plaidId: text('plaid_id'),
  name: text('name').notNull(),
  userId: text('user_id').notNull(),
});

export const insertAccountSchema = createInsertSchema(accounts);

// added at 5:40:50
export const accountRelations = relations(accounts, ({many}) => ({
  transactions: many(transactions),
}))

// added at 5:04:35
export const categories = pgTable('categories', {
  id: text('id').primaryKey(),
  plaidId: text('plaid_id'),
  name: text('name').notNull(),
  userId: text('user_id').notNull(),
});

export const insertCategorySchema = createInsertSchema(categories);

// added at 5:41:18
export const categoriesRelations = relations(categories, ({many}) => ({
  transactions: many(transactions),
}))

// added at 5:32:34
export const transactions = pgTable('transactions', {
  id: text('id').primaryKey(),
  amount: integer('amount').notNull(),
  payee: text('payee').notNull(),
  notes: text('notes'),
  date: timestamp('date', {mode: 'date'}).notNull(),
  accountId: text('account_id').references(() => accounts.id, {
    onDelete: 'cascade',
  }).notNull(),
  categoryId: text('category_id').references(() => categories.id, {
    onDelete: 'set null',
  }),
});

// added at 5:42:12
export const transactionsRelations = relations(transactions, ({ one }) => ({
  account: one(accounts, {
    fields: [transactions.accountId],
    references: [accounts.id],
  }),
  categories: one(categories, {
    fields: [transactions.categoryId],
    references: [categories.id],
  })
}));

export const insertTransactionSchema = createInsertSchema(transactions, {

});