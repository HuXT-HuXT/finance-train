// created at 2:11:33

import { Hono } from "hono";

// added at 2:16:06
import { db } from "@/db/drizzle";
import { accounts } from "@/db/schema";

const app = new Hono()
  .get('/', async (c) => {
    const data = await db
      .select({
        id: accounts.id,
        name: accounts.name,
      })
      .from(accounts);

    return c.json({ data });
  });

export default app;