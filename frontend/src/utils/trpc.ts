import { createTRPCContext } from '@trpc/tanstack-react-query';
import type { AppRouter } from '../../../backend/src/tRPC/router';
 
export const { TRPCProvider, useTRPC } = createTRPCContext<AppRouter>();