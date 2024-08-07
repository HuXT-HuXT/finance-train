// created at 5:45:36 from copy of accounts.ts

import { z } from "zod";
import { Hono } from "hono";
// added at 5:48:51 - npm i date-fns
import { parse, subDays } from "date-fns";
import { db } from "@/db/drizzle";
import { transactions, insertTransactionSchema, accounts, categories } from "@/db/schema";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { and, eq, inArray } from "drizzle-orm";
import { zValidator } from "@hono/zod-validator";
import { createId } from '@paralleldrive/cuid2';

const app = new Hono()
  .get(
    '/',
    zValidator('query', z.object({
      from: z.string().optional(),
      to: z.string().optional(),
      accountId: z.string().optional(),
    })),
    clerkMiddleware(),
    async (c) => {
      const auth = getAuth(c);
      const { from, to, accountId } = c.req.valid('query');

      if (!auth?.userId) {
        return c.json({ error: 'Unauthorized' }, 401);
      }

      const defaultTo = new Date();
      const defaultFrom = subDays(defaultTo, 30);

      const startDate = from ? parse(from, 'yyyy-MM-dd', new Date()) : defaultFrom
      const endDate = to ? parse(to, 'yyyy-MM-dd', new Date()) : defaultTo

      const data = await db
        .select({
          id: transactions.id,
          category: categories.name,
          categoryId: transactions.categoryId,
          payee: transactions.payee,
          amount: transactions.amount,
          notes: transactions.notes,
          account:accounts.name,
          accountId: transactions.accountId,
        })
        .from(transactions)
        .innerJoin(accounts, eq(transactions.accountId, accounts.id))
        .leftJoin(categories, eq(transactions.categoryId, categories.id))

      return c.json({ data });
  })
  .get(
    '/:id',
    zValidator('param', z.object({
      id: z.string().optional(),
    })),
    clerkMiddleware(),
    async (c) => {
      const auth = getAuth(c);
      const { id } = c.req.valid('param');

      if (!id) {
        return c.json({ error: 'Missing id' }, 400);
      }

      if (!auth?.userId) {
        return c.json({ error: 'Unauthorized' }, 401);
      }

      const [data] = await db
        .select({
          id: categories.id,
          name: categories.name,
        })
        .from(categories)
        .where(
          and(
            eq(categories.userId, auth.userId),
            eq(categories.id, id)
          )
        );

      if (!data) {
        return c.json({ error: 'Not found' }, 404);
      }

      return c.json({ data });
    }
  )
  .post (
    '/',
    clerkMiddleware(),
    zValidator('json', insertCategorySchema.pick({
      name: true,      
    })),
    async (c) => {
      const auth = getAuth(c);
      const values = c.req.valid('json');

      if (!auth?.userId) {
        return c.json({ error: 'Unauthorized'}, 401)
      }

      const [ data ] = await db.insert(categories).values({
        id: createId(),
        userId: auth.userId,
        ...values,
      }).returning();

      return c.json({ data });
    })
  .post(
    '/bulk-delete',
    clerkMiddleware(),
    zValidator(
      'json',
      z.object( {
        ids: z.array(z.string()),
      }),
    ),
    async (c) => {
      const auth = getAuth(c);
      const values = c.req.valid('json');

      if(!auth?.userId) {
        return c.json({ error: 'Unauthorized' }, 401)
      }

      const data = await db
        .delete(categories)
        .where(
          and(
            eq(categories.userId, auth.userId),
            inArray(categories.id, values.ids)
          )
        )
        .returning({
          id: categories.id,
        });
      
      return c.json({ data });
    },  
  )  
  .patch(
    '/:id',
    clerkMiddleware(),
    zValidator(
      'param',
      z.object({
        id: z.string().optional(),
      })
    ),
    zValidator(
      'json',
      insertCategorySchema.pick({
        name: true,
      })
    ),
    async (c) => {
      const auth = getAuth(c);
      const { id } = c.req.valid('param');
      const values = c.req.valid('json');

      if (!id) {
        return c.json({ error: 'Missing id' }, 400);
      }

      if (!auth?.userId) {
        return c.json({ error: 'Unauthorized' }, 401);
      }

      const [data] = await db
        .update(categories)
        .set(values)
        .where(
          and(
            eq(categories.userId, auth.userId),
            eq(categories.id, id)
          ),
        )
        .returning();

      if (!data) {
        return c.json({ error: 'Not found' }, 404);
      }

      return c.json({ data });
    },
  )
  .delete(
    '/:id',
    clerkMiddleware(),
    zValidator(
      'param',
      z.object({
        id: z.string().optional(),
      })
    ),
    async (c) => {
      const auth = getAuth(c);
      const { id } = c.req.valid('param');

      if (!id) {
        return c.json({ error: 'Missing id' }, 400);
      }

      if (!auth?.userId) {
        return c.json({ error: 'Unauthorized' }, 401);
      }

      const [data] = await db
        .delete(categories)
        .where(
          and(
            eq(categories.userId, auth.userId),
            eq(categories.id, id)
          ),
        )
        .returning();

      if (!data) {
        return c.json({ error: 'Not found' }, 404);
      }

      return c.json({ data });
    },
  );

export default app;