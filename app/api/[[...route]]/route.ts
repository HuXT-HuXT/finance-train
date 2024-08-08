// added 55:30
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
// created at 49:00
import { Hono } from 'hono';
// hono/vercel - used for next.js
import { handle } from 'hono/vercel';
// added at 1:02:00
import { clerkMiddleware, getAuth } from '@hono/clerk-auth'
// added at 2:12:31
import accounts from './accounts';
// import { HTTPException } from 'hono/http-exception';
// added at 5:05:05
import categories from './categories';


export const runtime = 'edge';

const app = new Hono().basePath('/api');

// removed at 2:41:00
// app.onError((err, c) => {
  
//   if (err instanceof HTTPException) {
//     return err.getResponse();
//   }

//   return c.json({ error: 'Internal error' }, 500);
// });

const routes = app
  .route('/accounts', accounts)
  .route('/categories', categories);

export const GET = handle(app);
export const POST = handle(app);
// added at 4:46:22
export const PATCH = handle(app);
// added at 4:53:57
export const DELETE = handle(app);

// https://hono.dev/docs/guides/rpc
export type AppType = typeof routes;


// ======= examples
// check authorization
// app
//   .get('/hello', clerkMiddleware(), (c) => {
//     const auth = getAuth(c);

//     if (!auth?.userId) {
//       return c.json({ error: 'Unauthorized'});
//     }
    
//     return c.json({
//       message: 'Hello Next.js!',
//     });
//   });

// validation example
// app  
//   .get(
//     '/hello/:test',
//     zValidator('param', z.object({
//       test: z.string(),
//     })),
//     (c) => {
//     const { test } = c.req.valid('param');

//     return c.json({
//       message: 'pew-pew',
//       test: test,
//     })
//   })