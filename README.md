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
  4. add new file or update existing file, in this case (delete) edit feature/accounts/components/edit-account-sheet.tsx:
    - import import { useDeleteAccount } from '@/features/accounts/api/use-delete-account';
    - add const deleteMutation = useDeleteAccount(id);
    - ...

~5:05:00 - new routes
1. add to db/schema.ts
  export const categories = pgTable('categories', {
    id: text('id').primaryKey(),
    plaidId: text('plaid_id'),
    name: text('name').notNull(),
    userId: text('user_id').notNull(),
  });

  export const insertCategorySchema = createInsertSchema(categories);

2. create copy of app/api/[[...route]]/accounts.ts and rename to categories.ts
  - export categories and insertCategorySchema
  - change all accounts with categories

3. add: to app/api/[[...route]]/route.ts:
  - 'import categories from "./categories"'
  - update const routes = app with .route('/categories', categories)

5:10:34 - new page for categories
1. create copy of app/(dashboard)/accounts folder and rename to categories, then all corresponding values
2. create copy of features/accounts and rename to categories, then all corresponding values in all files
  ** use find to check all values and replace it with required ones. **
3. edit providers/sheet-providers.tsx, add:
  import { NewCategorySheet } from "@/features/categories/components/new-category-sheet";
  import { EditCategorySheet } from "@/features/categories/components/edit-category-sheet";
  
