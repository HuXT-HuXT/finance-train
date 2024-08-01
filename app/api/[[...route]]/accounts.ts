// created at 2:11:33

import { Hono } from "hono";

// added at 2:16:06
import { db } from "@/db/drizzle";
import { accounts, insertAccountSchema } from "@/db/schema";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
// added at 2:33:25 and removed at 2:40:15
// import { HTTPException } from 'hono/http-exception';
// added at 2:38:30
import { eq } from "drizzle-orm";
import { zValidator } from "@hono/zod-validator";
// added at 2:50:05 npm i @paralleldrive/cuid2
import { createId } from '@paralleldrive/cuid2';

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
    });

export default app;