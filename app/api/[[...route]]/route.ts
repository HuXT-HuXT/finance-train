// added 55:30
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
// created at 49:00
import { Hono } from 'hono';
// hono/vercel - used for next.js
import { handle } from 'hono/vercel';
// added at 1:02:00
import { clerkMiddleware, getAuth } from '@hono/clerk-auth'

export const runtime = 'edge';

const app = new Hono().basePath('/api');

app
  .get('/hello', 
    (c) => {
    return c.json({
      message: 'Hello Next.js!',
    });
  })

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

export const GET = handle(app);
export const POST = handle(app);