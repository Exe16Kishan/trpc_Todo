import { initTRPC } from '@trpc/server';
import { z } from 'zod';

// Initialize tRPC
const t = initTRPC.create();

// Create base router and procedure helpers
export const router = t.router;
export const publicProcedure = t.procedure;

// Define your router with at least one procedure
export const appRouter = router({
  hello: publicProcedure
    .input(z.string().optional())
    .query(({ input }) => {
      return `Hello ${input ?? 'world'}!`;
    }),
});

// Export type router type
export type AppRouter = typeof appRouter;