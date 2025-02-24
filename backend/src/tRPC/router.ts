import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import prisma from '../db';

// Initialize tRPC
const t = initTRPC.create();

// Create base router and procedure helpers
export const router = t.router;
export const procedure = t.procedure;

// Define your router with at least one procedure
export const appRouter = router({
  addTodo: procedure
    .input(z.string())
    .mutation(async({ input }) => {
      await prisma.task.create({
        data:{
          name:input
        }
      })
      return {message:"data is saved" , success:true};
    }),

  getTodo : procedure
  .query(async () => {
      const res = await prisma.task.findMany({
      })
      return res;
    })
});

// Export type router type
export type AppRouter = typeof appRouter;