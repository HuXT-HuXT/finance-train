routing with Hono

create route:
  1. update app/api/[[...route]]/route.ts with new route, for example: export const DELETE = handle(app);
  2. update app/api/[[...route]]/accounts.ts with method, for example:
    const app = new Hono()
      .get(
        '/',
        clerkMiddleware(),
        async (c) => {
          const auth = getAuth(c);

          if (!auth?.userId) {
            return c.json({ error: 'Unauthorized' }, 401);
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
      .delete(
        '/:id',
        ...
      )

  3. add new file feature/accounts/api/use-delete-account.ts
  4. add new file or update existing file
