import { t } from './trpc';
import { z } from 'zod';

export const appRouter = t.router({
  // Example query
  hello: t.procedure
    .input(z.object({ name: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.name}`,
      };
    }),

  // Example mutation
  createUser: t.procedure
    .input(z.object({ email: z.string().email() }))
    .mutation(({ input }) => {
      return {
        success: true,
        email: input.email,
      };
    }),
});

// Export type definition of the API
export type AppRouter = typeof appRouter;