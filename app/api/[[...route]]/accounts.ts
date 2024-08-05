// created at 2:11:33

import { Hono } from "hono";

// added at 2:16:06
import { db } from "@/db/drizzle";
import { accounts, insertAccountSchema } from "@/db/schema";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
// added at 2:33:25 and removed at 2:40:15
// import { HTTPException } from 'hono/http-exception';
// added at 2:38:30
import { and, eq, inArray } from "drizzle-orm";
import { zValidator } from "@hono/zod-validator";
// added at 2:50:05 npm i @paralleldrive/cuid2
import { createId } from '@paralleldrive/cuid2';
// added at 4:11:05 - creating route /bulk-delete to delete accounts at this part
import { z } from "zod";

const app = new Hono()
  .get(
    '/',
    clerkMiddleware(),
    async (c) => {
      const auth = getAuth(c);

      if (!auth?.userId) {
        return c.json({ error: 'Unauthorized' }, 401);

        //  old version
        // throw new HTTPException(401, {
        //   res: c.json({ error: "Unauthorized" }, 401),
        // });
      }

      const data = await db
        .select({
          id: accounts.id,
          name: accounts.name,
        })
        .from(accounts)
        .where(eq(accounts.userId, auth.userId));

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
          id: accounts.id,
          name: accounts.name,
        })
        .from(accounts)
        .where(
          and(
            eq(accounts.userId, auth.userId),
            eq(accounts.id, id)
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
    zValidator('json', insertAccountSchema.pick({
      name: true,      
    })),
    async (c) => {
      const auth = getAuth(c);
      const values = c.req.valid('json');

      if (!auth?.userId) {
        return c.json({ error: 'Unauthorized'}, 401)
      }

      const [ data ] = await db.insert(accounts).values({
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
        .delete(accounts)
        .where(
          and(
            eq(accounts.userId, auth.userId),
            inArray(accounts.id, values.ids)
          )
        )
        .returning({
          id: accounts.id,
        });
      
      return c.json({ data });
    },  
  )
  // added at 4:46:38, next step: add file features\accounts\api\use-edit-account.ts - copy-n-rename use-create-account as template
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
      insertAccountSchema.pick({
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
        .update(accounts)
        .set(values)
        .where(
          and(
            eq(accounts.userId, auth.userId),
            eq(accounts.id, id)
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
        .delete(accounts)
        .where(
          and(
            eq(accounts.userId, auth.userId),
            eq(accounts.id, id)
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